import { test, expect } from '@playwright/test';
import type {} from '../../src/public-api';
import { FIXTURE, waitForMount } from './_helpers';

const groups = {
  headings: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  'links, labels and cells': ['a', 'label', 'td', 'th'],
  'existing text elements': ['p', 'li', 'dd', 'dt', 'span', 'div'],
};

for (const level of ['medium', 'large'] as const) {
  for (const [group, tags] of Object.entries(groups)) {
    test(`${level} line height applies to ${group} and can be reset`, async ({ page }) => {
      await page.goto(FIXTURE);
      await waitForMount(page);
      await page.evaluate(() => {
        const section = document.createElement('section');
        section.id = 'line-height-fixture';
        section.innerHTML =
          '<h1>Heading</h1><h2>Heading</h2><h3>Heading</h3><h4>Heading</h4><h5>Heading</h5><h6>Heading</h6><a href="#">Link</a><label>Label</label><table><tr><th>Heading cell</th><td>Cell</td></tr></table><p>Paragraph</p><ul><li>Item</li></ul><dl><dt>Term</dt><dd>Definition</dd></dl><span>Text</span><div>Text block</div><button>Control</button>';
        section.querySelectorAll<HTMLElement>('*').forEach((el) => {
          el.style.fontSize = '20px';
          el.style.lineHeight = '28px';
        });
        document.body.appendChild(section);
      });

      await page.evaluate((lineHeight) => window.BlakfyA11y?.setPreferences({ lineHeight }), level);
      for (const tag of tags) {
        await expect(page.locator(`#line-height-fixture ${tag}`)).toHaveCSS(
          'line-height',
          level === 'medium' ? '36px' : '48px',
        );
      }
      await expect(page.locator('#line-height-fixture button')).toHaveCSS('line-height', '28px');

      await page.evaluate(() => window.BlakfyA11y?.setPreferences({ lineHeight: 'normal' }));
      for (const tag of tags) {
        await expect(page.locator(`#line-height-fixture ${tag}`)).toHaveCSS('line-height', '28px');
      }
    });
  }
}
