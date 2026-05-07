import { useEffect } from 'react';
import { mount } from '@blakfy/accessibility-widget';
import type { WidgetOptions } from '@blakfy/a11y-core';

export type A11yWidgetProps = Partial<WidgetOptions>;

/**
 * Mounts the Blakfy accessibility widget into the DOM.
 * Renders nothing — the widget manages its own DOM elements.
 *
 * @example
 * ```tsx
 * // app/App.tsx or main entry
 * import { A11yWidget } from '@blakfy/accessibility-widget-react';
 *
 * export default function App() {
 *   return (
 *     <>
 *       <A11yWidget locale="tr" theme="auto" position="bottom-right" />
 *       <RouterOutlet />
 *     </>
 *   );
 * }
 * ```
 */
export function A11yWidget(props: A11yWidgetProps) {
  useEffect(() => {
    const { unmount } = mount(props);
    return unmount;
  }, []);

  return null;
}
