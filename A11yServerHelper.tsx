/* SSR helper — server component, FOUC korumasi icin <html>'e data-attribute koyar.
 * Kullanim:
 *   import { A11yServerHelper } from '@/components/a11y/A11yServerHelper';
 *   <html {...await A11yServerHelper()}>
 */

import { cookies } from 'next/headers';

export async function A11yServerHelper() {
  let prefs: Record<string, unknown> | null = null;
  try {
    const c = await cookies();
    const cv = c.get('wf_a11y_prefs')?.value;
    if (cv) prefs = JSON.parse(cv).prefs;
  } catch {
    prefs = null;
  }
  return {
    'data-a11y-fontscale': String(prefs?.fontScale ?? '100'),
    'data-a11y-contrast': (prefs?.contrast ?? 'normal') as string,
    'data-a11y-focus': prefs?.focusRing ? 'enhanced' : 'default',
    'data-a11y-links': prefs?.linkUnderline ? 'underline' : 'default',
    'data-a11y-motion': (prefs?.motion ?? 'auto') as string,
    'data-a11y-dyslexia': String(prefs?.dyslexiaFont ?? false),
    'data-a11y-reading': String(prefs?.readingMode ?? false),
  } as const;
}
