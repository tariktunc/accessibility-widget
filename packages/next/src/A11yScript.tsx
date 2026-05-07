// @blakfy/accessibility-widget-next — A11yScript.tsx
//
// Loads the Blakfy accessibility widget IIFE bundle from jsDelivr via
// `next/script`. During alpha (`2.0.0-alpha.x`) the default URL pins to
// the exact alpha version; once `2.0.0` ships, the floating `@v2` tag
// will become the recommended default per ADR-001/ADR-006. Pinned semver
// strings (e.g. `'2.0.0'`) remain immutable. The script forwards every
// locked `data-*` config attr listed in STABLE-API.md §6.

import Script from 'next/script';
import type { Locale, Theme, Position } from '@blakfy/a11y-core';

type Props = {
  /** Aktif dil. Default `'en'` (widget tarafı uygular). */
  locale?: Locale;
  /** Tema. Default `'auto'` (widget tarafı uygular). */
  theme?: Theme;
  /** FAB konumu. Default `'bottom-left'` (widget tarafı uygular). */
  position?: Position;
  /** font-family override (örn. `"'Inter', sans-serif"`). */
  font?: string;
  /** Verbose log mode. */
  debug?: boolean;
  /** Next.js dev terminal log endpoint (yalnızca dev'de aktif). */
  devPipe?: string;
  /** CDN sürümü. Alpha boyunca varsayılan tam pin (`'2.0.0-alpha.0'`). Stabil sürümle birlikte `'v2'` floating tag default olur. */
  version?: string;
  /** `next/script` strategy. Default `'lazyOnload'` (R3 araştırması). */
  strategy?: 'lazyOnload' | 'afterInteractive';
};

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@blakfy/accessibility-widget';

/**
 * Loads the Blakfy accessibility widget via `next/script`. During alpha,
 * defaults to the exact alpha version (`2.0.0-alpha.0`). Pass a semver
 * string (e.g. `'2.0.0'`) to pin a stable release once available, or
 * `'v2'` to opt into auto-update on the floating tag. Forwards every
 * locked `data-*` config attribute listed in STABLE-API.md §6.
 *
 * @example
 * ```tsx
 * import { A11yScript } from '@blakfy/accessibility-widget-next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <A11yScript locale="tr" theme="auto" position="bottom-left" />
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function A11yScript({
  locale,
  theme,
  position,
  font,
  debug,
  devPipe,
  version = '2.0.0-alpha.0',
  strategy = 'lazyOnload',
}: Props): JSX.Element {
  const src = `${CDN_BASE}@${version}/dist/widget.js`;
  return (
    <Script
      id="blakfy-a11y-widget"
      src={src}
      strategy={strategy}
      data-locale={locale}
      data-theme={theme}
      data-position={position}
      data-font={font}
      data-debug={debug ? 'true' : undefined}
      data-dev-pipe={devPipe}
    />
  );
}
