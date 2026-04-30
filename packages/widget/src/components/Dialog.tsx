/**
 * ARIA APG Dialog (modal).
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * Behavior:
 *  - Renders backdrop + role=dialog + aria-modal=true
 *  - aria-labelledby + aria-describedby
 *  - On open: save the deepest active element (Shadow-DOM aware), move
 *    focus to the first focusable inside the dialog
 *  - On close: restore focus to the saved element (the FAB inside our
 *    own shadow root, typically)
 *  - Tab / Shift+Tab cycle within dialog
 *  - ESC closes
 *  - Click on backdrop closes
 *  - Body scroll lock while open (toggles `overflow:hidden` on <html>)
 *
 * Lives inside Shadow DOM — focus queries must run against the shadow tree.
 */
import { useEffect, useRef } from 'preact/hooks';
import type { ComponentChildren, JSX } from 'preact';

type Props = {
  open: boolean;
  onClose: () => void;
  titleId: string;
  descriptionId: string;
  children: ComponentChildren;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="switch"]:not([aria-disabled="true"])';

/**
 * Walk through nested shadow roots to find the deepest active element.
 * `document.activeElement` returns the shadow host (e.g. `blakfy-a11y-root`)
 * for elements inside an open shadow tree, which would cause focus to
 * restore to the host instead of the FAB after the dialog closes.
 */
function _getActiveElementDeep(root: Document | ShadowRoot = document): Element | null {
  let active: Element | null = root.activeElement;
  while (active) {
    const sr = (active as Element & { shadowRoot?: ShadowRoot | null }).shadowRoot;
    if (!sr || !sr.activeElement) break;
    active = sr.activeElement;
  }
  return active;
}

function _getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const list = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  return Array.from(list).filter((el) => {
    if (el.hasAttribute('disabled')) return false;
    const tabIndex = el.getAttribute('tabindex');
    if (tabIndex && Number(tabIndex) < 0) return false;
    // Quick visibility check
    return el.offsetParent !== null || el.getClientRects().length > 0;
  });
}

export function Dialog({ open, onClose, titleId, descriptionId, children }: Props): JSX.Element | null {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveRef = useRef<Element | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  // Focus management + ESC + Tab trap
  useEffect(() => {
    if (!open) return;
    if (typeof document === 'undefined') return;

    previousActiveRef.current = _getActiveElementDeep(document);

    // Defer focus to next microtask so the dialog content is mounted.
    const focusTimer = window.setTimeout(() => {
      const focusables = _getFocusable(dialogRef.current);
      const target = focusables[0] ?? dialogRef.current;
      target?.focus();
    }, 0);

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusables = _getFocusable(dialogRef.current);
      if (focusables.length === 0) {
        e.preventDefault();
        dialogRef.current?.focus();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      // The active element inside Shadow DOM is found via the root
      const root = dialogRef.current?.getRootNode() as Document | ShadowRoot | undefined;
      const active = (root && 'activeElement' in root ? root.activeElement : document.activeElement) as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !dialogRef.current?.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      const prev = previousActiveRef.current;
      if (prev && prev instanceof HTMLElement) {
        // Restore focus to the trigger
        prev.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: JSX.TargetedMouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div class="backdrop" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
