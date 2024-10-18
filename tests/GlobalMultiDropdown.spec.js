import { test, expect } from '@playwright/test';

let page; 
let context; 

test.describe('GlobalMultiDropdown component', () => {
  test.setTimeout(60000); // Set to 60 seconds

  test.beforeAll(async({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://ross-ofr.techcarrel.in/");
    await page.getByPlaceholder("Username").fill("rahulphalke123@gmail.com");
    await page.getByPlaceholder("Password").fill("Mighty@1234");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/dashboard");
    await page.getByRole("button", { name: "Go to Account Listings" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/accounts-listing");
    await page.getByRole("button", { name: "Advanced Filters" }).click();
  });
  
  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload(); 
  });

  test('should render the dropdown with default options', async() => {
    const dropdown = page.locator('.css-1n1n5qs-control').first();
    await expect(dropdown).toBeVisible();
  });

  test('should show loading state when fetching data', async() => {
    await page.locator('.css-1n1n5qs-control').first().click();
 
    await expect(page.locator('text=Loading...')).toBeVisible();
  });

  test("should fetch data", async() => {
    await page.locator('.css-1n1n5qs-control').first().click();

    // verifying data(options) to be visible
    const firstOption = page.getByRole('option', { name: "Active" });
    await expect(firstOption).toBeVisible();

    const secondOption = page.getByRole('option', { name: "Do not Contact" });
    await expect(secondOption).toBeVisible();

  });

/*
//   test('should show error message when data fetching fails', async ({ page }) => {
//     // Simulate an API error
//     await page.evaluate(() => {
//       document.querySelector('.text-danger').textContent = 'HTTP error! status: 500';
//     });

//     const errorMessage = page.locator('.text-danger');
//     await expect(errorMessage).toBeVisible();
//     await expect(errorMessage).toContainText('HTTP error! status: 500');
//   });
*/

test("selected options should show in the input box", async() => {
    await page.locator('.css-1n1n5qs-control').first().click();

    //selecting options
    await page.getByRole('option', { name: "Active" }).click(); 
    await page.getByRole('option', { name: "Do not Contact" }).click(); 
  
    // Verify that the selected options appear in the input box
    const activeOption = page.locator('div').filter({ hasText: /^Active$/ }).first();
    const doNotContactOption = page.locator('div').filter({ hasText: /^Do not Contact$/ }).first();

    // Use expect with .toBeVisible or .toHaveText
    await expect(activeOption).toBeVisible(); 
    await expect(doNotContactOption).toBeVisible(); 
});

 test("should remove individual selection", async() => {
    await page.locator('.css-1n1n5qs-control').first().click();

    // selecting options
    await page.getByRole('option', { name: "Active" }).click();  
    await page.getByLabel('Remove Active', { name: "Active" }).click(); 
 });

 test("should remove all selected options", async() => {
   await page.locator('.css-1n1n5qs-control').first().click();

  // selecting options
   await page.getByRole('option', { name: "Active" }).click();  
   await page.getByRole('option', { name: "Do not Contact" }).click(); 

   // removing options
   await page.locator('.css-15lsz6c-indicatorContainer').first().click();

});


});
