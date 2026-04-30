// @blakfy/accessibility-widget-next — A11yServerHelper.tsx
//
// Async Next.js App Router server helper. Reads the persisted accessibility
// preferences cookie server-side and returns the locked `data-a11y-*`
// attributes (STABLE-API.md §3) so the host can spread them onto `<html>`
// during SSR — preventing a flash of unstyled content (FOUC) on first paint.

import { cookies } from 'next/headers';
import { COOKIE_KEY } from '@blakfy/a11y-core';
import { parseServerCookie, type ServerSideAttrs } from './cookie-parser';

/**
 * Async server helper that reads the accessibility preferences cookie and
 * returns the locked `data-a11y-*` attribute set to spread on `<html>`.
 * Prevents flash-of-unstyled-content on first paint.
 *
 * Safe outside of a request context (e.g. during `next build`) — falls back
 * to defaults if `cookies()` throws.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { A11yServerHelper } from '@blakfy/accessibility-widget-next';
 *
 * export default async function RootLayout({ children }) {
 *   return (
 *     <html lang="tr" {...await A11yServerHelper()}>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export async function A11yServerHelper(): Promise<ServerSideAttrs> {
  try {
    const c = await cookies();
    const cv = c.get(COOKIE_KEY)?.value;
    return parseServerCookie(cv);
  } catch {
    // SSR/RSC outside of request context (e.g. during build) — return defaults.
    return parseServerCookie(undefined);
  }
}
