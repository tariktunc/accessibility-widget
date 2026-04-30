// @blakfy/accessibility-widget-next — A11yPreconnect.tsx
//
// `<link rel="preconnect">` hint for the jsDelivr CDN that hosts the widget
// IIFE bundle. Warming the DNS+TLS connection before `<A11yScript>` loads
// shaves ~100–300ms off LCP on cold loads.

/**
 * Preconnect hint for the jsDelivr CDN that hosts the widget bundle. Place
 * inside `<head>` to warm DNS+TLS before `<A11yScript>` fires, improving LCP
 * on cold loads.
 *
 * @example
 * ```tsx
 * import { A11yPreconnect } from '@blakfy/accessibility-widget-next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <A11yPreconnect />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export function A11yPreconnect(): JSX.Element {
  return (
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
  );
}
