// @blakfy/a11y-core — diagnostics.ts
import { detectOSPreferences } from './apply-styles';
import type {
  DiagnosticsSnapshot,
  Issue,
  IssueCode,
  IssueLevel,
  WidgetOptions,
} from './types';

// __VERSION__ is replaced at build time by Vite's `define` (see vite.config.ts).
// Outside the build (vitest, raw tsc) the symbol is absent, hence the
// `typeof` guard which is safe even when the identifier is not declared.
declare const __VERSION__: string;
// TODO: drop the literal fallback once the build pipeline is hooked to package.json.
const VERSION: string =
  typeof __VERSION__ !== 'undefined' ? __VERSION__ : '2.0.0-alpha.0';

const MAX_ISSUES = 50;
const PIPE_RATE_LIMIT = 10; // max messages per second

interface DiagnosticsState {
  issues: Issue[];
  startTime: number;
  devPipeUrl: string | null;
  devPipeLastSent: number[];
}

const _state: DiagnosticsState = {
  issues: [],
  startTime: typeof performance !== 'undefined' ? performance.now() : Date.now(),
  devPipeUrl: null,
  devPipeLastSent: [],
};

interface BlakfyDebugWindow {
  __BLAKFY_A11Y__?: { debug?: boolean } & Record<string, unknown>;
}

/**
 * Detect verbose vs silent logging mode. Verbose when:
 *  - `process.env.NODE_ENV !== 'production'` (where defined)
 *  - URL has `?a11y-debug=1`
 *  - script tag has `data-debug="true"`
 *  - `window.__BLAKFY_A11Y__.debug === true`
 */
export function getMode(): 'silent' | 'verbose' {
  // process.env.NODE_ENV (Node + many bundlers replace this at build time)
  try {
    if (
      typeof process !== 'undefined' &&
      typeof process.env !== 'undefined' &&
      process.env.NODE_ENV &&
      process.env.NODE_ENV !== 'production'
    ) {
      return 'verbose';
    }
  } catch {
    /* process not available — ignore */
  }

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'silent';
  }

  // ?a11y-debug=1
  try {
    const usp = new URLSearchParams(window.location.search);
    if (usp.get('a11y-debug') === '1') return 'verbose';
  } catch {
    /* ignore */
  }

  // currentScript / data-debug
  try {
    const cs = document.currentScript as (HTMLScriptElement & { dataset: DOMStringMap }) | null;
    if (cs && cs.dataset && cs.dataset.debug === 'true') return 'verbose';
    const tagged = document.querySelector('script[data-debug="true"]');
    if (tagged) return 'verbose';
  } catch {
    /* ignore */
  }

  // window.__BLAKFY_A11Y__.debug
  try {
    const w = window as unknown as BlakfyDebugWindow;
    if (w.__BLAKFY_A11Y__ && w.__BLAKFY_A11Y__.debug === true) return 'verbose';
  } catch {
    /* ignore */
  }

  return 'silent';
}

function _symbolFor(level: IssueLevel): string {
  if (level === 'info') return '✓'; // ✓
  if (level === 'warn') return '⚠'; // ⚠
  return '✗'; // ✗
}

function _print(level: IssueLevel, msg: string): void {
  if (typeof console === 'undefined') return;
  const line = `[blakfy-a11y v${VERSION}] ${_symbolFor(level)} ${msg}`;
  if (level === 'error' && typeof console.error === 'function') console.error(line);
  else if (level === 'warn' && typeof console.warn === 'function') console.warn(line);
  else if (typeof console.info === 'function') console.info(line);
  else if (typeof console.log === 'function') console.log(line);
}

function _pipeToDevEndpoint(level: IssueLevel, code: IssueCode, msg: string): void {
  const url = _state.devPipeUrl;
  if (!url) return;
  if (getMode() !== 'verbose') return;
  if (typeof fetch !== 'function') return;

  const now = Date.now();
  // Drop timestamps older than 1s
  _state.devPipeLastSent = _state.devPipeLastSent.filter((t) => now - t < 1000);
  if (_state.devPipeLastSent.length >= PIPE_RATE_LIMIT) return;
  _state.devPipeLastSent.push(now);

  try {
    const body = JSON.stringify({ level, code, msg, timestamp: new Date(now).toISOString() });
    void fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      /* silent fail */
    });
  } catch {
    /* silent fail */
  }
}

/**
 * Emit a diagnostics issue. `info` only prints in verbose mode and is not
 * persisted; `warn` and `error` always print and are added to the FIFO
 * issues buffer (capped at 50).
 */
export function addIssue(
  level: IssueLevel,
  code: IssueCode,
  msg: string,
  extra?: Record<string, unknown>,
): void {
  const mode = getMode();

  if (level === 'info') {
    if (mode === 'verbose') {
      _print('info', msg);
      _pipeToDevEndpoint('info', code, msg);
    }
    // info is not persisted (too noisy)
    return;
  }

  _print(level, msg);

  const issue: Issue = {
    level,
    code,
    timestamp: new Date().toISOString(),
    msg,
    ...(extra ? { extra } : {}),
  };
  _state.issues.push(issue);
  if (_state.issues.length > MAX_ISSUES) {
    _state.issues.splice(0, _state.issues.length - MAX_ISSUES);
  }

  _pipeToDevEndpoint(level, code, msg);
}

/** Read-only view of the current issues buffer. */
export function getIssues(): readonly Issue[] {
  return _state.issues.slice();
}

/** Configure (or clear) the dev terminal pipe endpoint. */
export function setDevPipe(url: string | null): void {
  _state.devPipeUrl = url;
}

/** For tests: reset the singleton state. */
export function _resetDiagnostics(): void {
  _state.issues = [];
  _state.startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  _state.devPipeUrl = null;
  _state.devPipeLastSent = [];
}

/** Build the full diagnostics snapshot. */
export function getDiagnostics(opts: {
  config: WidgetOptions;
  performance: { mountTimeMs: number; bundleSizeGz: number; timeToFirstClick: number | null };
  storage: {
    version: string;
    migratedFrom: string | null;
    keysFound: Array<'localStorage' | 'cookie'>;
  };
}): DiagnosticsSnapshot {
  const os = detectOSPreferences();
  return {
    version: VERSION,
    locale: opts.config.locale,
    theme: opts.config.theme,
    storage: {
      version: opts.storage.version,
      migratedFrom: opts.storage.migratedFrom,
      keysFound: [...opts.storage.keysFound],
    },
    osPreferences: {
      reducedMotion: os.reducedMotion,
      contrast: os.contrast,
      colorScheme: os.colorScheme,
    },
    performance: {
      mountTimeMs: opts.performance.mountTimeMs,
      bundleSizeGz: opts.performance.bundleSizeGz,
      timeToFirstClick: opts.performance.timeToFirstClick,
    },
    issues: _state.issues.map((i) => ({
      level: i.level,
      code: i.code,
      timestamp: i.timestamp,
      msg: i.msg,
    })),
    config: { ...opts.config },
    timestamp: new Date().toISOString(),
  };
}

/** Active widget version string used in console prefixes. */
export function getVersion(): string {
  return VERSION;
}
