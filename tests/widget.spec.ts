import { test, expect } from '@playwright/test';
import { WidgetPage } from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    await page.locator('._UCHI_COOKIE__button').click({ timeout: 5000 }).catch(() => {});
  });

  test('opens', async ({ page }) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();
    await widgetPage.getPopularArticles().first().click();
    await widgetPage.clickWriteToUs();
    await expect(widgetPage.getTitleLocator()).toHaveText('Связь с поддержкой');
  });

  // +1
  test('has correct main title', async ({ page }) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getTitleLocator()).toHaveText('База знаний Учи.ру');
  });
});