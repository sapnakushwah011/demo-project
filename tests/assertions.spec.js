import { test, expect } from "@playwright/test";

test("Assertions", async ({ page }) => {
  await page.goto("https://kitchen.applitools.com/");
  await page.pause();

  // Assertions
  // CHECK ELEMENT PRESENT OR NOT
  await expect(page.locator("text=The Kitchen")).toHaveCount(1);

  if (await page.$("text=The Kitchen")) {
    await page.locator("text=The Kitchen").click();
  }

  // CHECK ELEMENT VISIBLE OR NOT
  await expect(page.locator("text=The Kitchen")).toBeVisible();
//   await expect.soft(page.locator("text=The Kitchen")).toBeHidden();

  // CHECK ELEMENT DISABLE OR DISABLE
  await expect(page.locator("text=The Kitchen")).toBeEnabled();
//   await expect.soft(page.locator("text=The Kitchen")).toBeDisabled();

  // Text Matches value or not
 await expect(page.locator("text=The Kitchen")).toHaveText('The Kitchen');
 await expect(page.locator("text=The Kitchen")).not.toHaveText('ABCD');

 // CHECK Element attribute:
 await expect(page.locator("text=The Kitchen")).toHaveAttribute('class', /.*css-dpmy2a/);
 await expect(page.locator("text=The Kitchen")).toHaveClass(/.*css-dpmy2a/)

 // CHECK URL and Title:
 await expect(page).toHaveURL('https://kitchen.applitools.com/');
 await expect(page).toHaveTitle(/.*The Kitchen/);

 // visual validation with screenshot:
 await expect(page).toHaveScreenshot();

});

