import { test, expect } from '@playwright/test';
let page; 
let context; 

test.describe('AccessoryListingFilter Component', () => {
  test.setTimeout(60000);

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://ross-ofr.techcarrel.in/");
    await page.getByPlaceholder("Username").fill("rahulphalke123@gmail.com");
    await page.getByPlaceholder("Password").fill("Mighty@1234");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/dashboard"); 
    await page.locator("path").first().click();
    await page.getByRole('link', { name: "Accessory Listing" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/Admin/accessory-listing");
  });

  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload(); 
  });

  test('should render without crashing', async() => {
    await page.getByRole("button", { name: "Accessory Filters" }).click();

    await expect(page.getByText("Account Name")).toBeVisible();
    await expect(page.getByText("Accessory Brand/Model")).toBeVisible();
  });

  test('should close the drawer when the close button is clicked', async() => {
    await page.getByRole("button", { name: "Accessory Filters" }).click();

    await page.locator('.left-btns > .MuiButtonBase-root').click(); 
    const component = await page.locator('.MuiPaper-root');
    await expect(component).toBeHidden();
  });

  test('should close the drawer when click outsite', async() => {
    await page.getByRole("button", { name: "Accessory Filters" }).click();

    await page.locator('body').click(); 
    const component = await page.locator('.MuiPaper-root');
    await expect(component).toBeHidden();
  });

  test('should allow selection in the Account Name field', async() => {
    await page.getByRole("button", { name: "Accessory Filters" }).click();

    // opens the account name dropdown
    await page.locator('.MuiInputBase-root').first().click();
    const selectedValue = await page.getByRole('option', { name: "accountName1" }).innerText();
    await expect(selectedValue).toContain('accountName1');

    await page.getByRole('option', { name: "accountName1" }).click();
  });

  test('should clear all fields when clear button is clicked', async() => {
    await page.getByRole("button", { name: "Accessory Filters" }).click();
    // fill the input fields
    await page.locator('.MuiInputBase-root').first().click();
    await page.getByRole('option', { name: "accountName1" }).click();
    
    // clear the fields
    await page.getByLabel('Clear').click();

    // input fields should be empty
    const inputValue = await page.locator('input[id="Demo-account_name"]').inputValue();
    await expect(inputValue).toBe('');
  });


   test("should submit with all selected fields", async() => {
    await page.getByRole("button", { name: "Accessory Filters" }).click();
    // fill the input fields
    // Filling Account Name Field
    await page.locator('.MuiInputBase-root').first().click();
    await page.getByRole('option', { name: "accountName1" }).click();
    await page.locator('text=Account Name').click();

    // Filling Accessory Brand/Model Fields
    await page.locator('span').filter({hasText: "Select..."}).click();
    await page.getByText('Powerheart G3').click();
    await page.locator('text=Accessory Brand/Model').click();

    // Filling Site Field
    await page.locator('input[id="Demo-sites"]').click();
    await page.getByRole('option', { name: "Inventory Site" }).click();
    await page.locator('text=Sites').click();

    // submit the form.
    await page.getByRole('button', { name: "Submit"}).click();

   });

});
