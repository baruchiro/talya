// @ts-check
const { test, expect } = require('@playwright/test');

test('home screen shows three navigation tiles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.tile--letters')).toBeVisible();
  await expect(page.locator('.tile--colors')).toBeVisible();
  await expect(page.locator('.tile--stories')).toBeVisible();
  await page.screenshot({ path: 'test-results/screenshots/home.png', fullPage: true });
});

test('letters section opens and displays letter grid', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tile--letters').click();
  await expect(page.locator('#aleph-bet-grid .letter-btn').first()).toBeVisible();
  await expect(page.locator('#aleph-bet-grid .letter-btn')).toHaveCount(22);
  await page.screenshot({ path: 'test-results/screenshots/letters.png', fullPage: true });
});

test('colors section opens and displays color swatches', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tile--colors').click();
  await expect(page.locator('#colors-grid .color-btn').first()).toBeVisible();
  await page.screenshot({ path: 'test-results/screenshots/colors.png', fullPage: true });
});

test('stories section opens and displays story list', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tile--stories').click();
  await expect(page.locator('#stories-list .story-btn').first()).toBeVisible();
  await page.screenshot({ path: 'test-results/screenshots/stories.png', fullPage: true });
});

test('back button returns to home', async ({ page }) => {
  await page.goto('/');
  await page.locator('.tile--letters').click();
  await expect(page.locator('#section-aleph-bet')).toHaveClass(/section--active/);
  await page.locator('#section-aleph-bet .back-btn').click();
  await expect(page.locator('#section-home')).toHaveClass(/section--active/);
  await page.screenshot({ path: 'test-results/screenshots/back-to-home.png', fullPage: true });
});
