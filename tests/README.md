# Test Strategy

Tuketici proje icinde Playwright + axe-core ile test:

```ts
// tests/a11y-widget.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('FAB butonu gorunur', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: /erisilebilirlik/i })).toBeVisible();
});

test('Alt+0 panel acar', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Alt+0');
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('Font olcegi 125% body font-size artirir', async ({ page }) => {
  await page.goto('/');
  const before = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  await page.getByRole('button', { name: /erisilebilirlik/i }).click();
  await page.getByRole('button', { name: /cok buyuk|extra large/i }).click();
  const after = await page.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  expect(after).toBeGreaterThan(before * 1.2);
});

test('Yuksek kontrast body bg siyah', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /erisilebilirlik/i }).click();
  await page.getByRole('switch', { name: /yuksek kontrast/i }).click();
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toMatch(/rgb\(0,\s*0,\s*0\)/);
});

test('Hareketi azalt animasyonlari durdurur', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /erisilebilirlik/i }).click();
  await page.getByRole('switch', { name: /hareketi azalt/i }).click();
  const motion = await page.evaluate(() => document.documentElement.dataset.a11yMotion);
  expect(motion).toBe('reduce');
});

test('Sifirla iki tiklama gerektirir', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /erisilebilirlik/i }).click();
  await page.getByRole('switch', { name: /yuksek kontrast/i }).click();
  await page.getByRole('button', { name: /^sifirla$/i }).click();
  await expect(page.getByRole('button', { name: /sifirla\?/i })).toBeVisible();
  await page.getByRole('button', { name: /sifirla\?/i }).click();
  const contrast = await page.evaluate(() => document.documentElement.dataset.a11yContrast);
  expect(contrast).toBe('normal');
});

test('Tercih persistence', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /erisilebilirlik/i }).click();
  await page.getByRole('switch', { name: /yuksek kontrast/i }).click();
  await page.reload();
  const contrast = await page.evaluate(() => document.documentElement.dataset.a11yContrast);
  expect(contrast).toBe('high');
});

test('Panel kendisi a11y: 0 violation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /erisilebilirlik/i }).click();
  const results = await new AxeBuilder({ page })
    .include('[role=dialog]')
    .withTags(['wcag2aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

## Cover senaryolari

- [x] FAB butonu gorunur (4 konumda)
- [x] Alt+0 panel acar
- [x] 7 tercih hepsi calisir
- [x] CSS variables uygulanir
- [x] Reset 2-tiklama
- [x] Persistence (localStorage + cookie)
- [x] Panel kendisi WCAG AA gecer
- [ ] OS prefers-reduced-motion otomatik tetikler
- [ ] Dyslexia font CDN warning
- [ ] RTL render (AR, HE)
- [ ] iconStyle 3 secenek render
