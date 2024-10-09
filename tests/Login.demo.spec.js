import { test, expect } from "@playwright/test";

test.only("Demo Login test 1", async ({ page }) => {
  await page.goto("https://demo.applitools.com/");
  // await page.pause();

  await page.locator('[placeholder="Enter your username"]').fill("Sapna");
  await page.locator('[placeholder="Enter your password"]').fill("Sapna123");

  await page.waitForSelector("text=Sign in", { timeout: 5000 });
  await page.locator("text=Sign in").click();
});

test("Demo Login test 2", async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // await page.pause();

    await page.getByPlaceholder('Username').click();
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('banner').getByText('jcUJstdxya singh').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

});
