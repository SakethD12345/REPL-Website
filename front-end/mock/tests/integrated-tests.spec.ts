import { test, expect } from "@playwright/test";

/**
 * This sets up the url for each test
 */
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:8000/");
});