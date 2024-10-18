import { test, expect } from '@playwright/test';

let page; 
let context; 

test.describe('AccessoryListingFilter Component', () => {
  test.setTimeout(60000);

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    // Perform login
    await page.goto("https://ross-ofr.techcarrel.in/");
    await page.getByPlaceholder("Username").fill("rahulphalke123@gmail.com");
    await page.getByPlaceholder("Password").fill("Mighty@1234");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/dashboard"); 
    await page.getByRole('button', { name: "Go to Account Listings" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/accounts-listing");
  });

  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload(); 
  });

  test('should render without crashing', async () => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    await expect(page.locator("label").filter({ hasText: "Account Name"})).toBeVisible();
    await expect(page.getByText("Account status")).toBeVisible();
  });

  test('should close the drawer when the close button is clicked', async () => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    // close button
    await page.locator('.left-btns > .MuiButtonBase-root').click(); 
    const component = await page.locator('.MuiPaper-root');
    await expect(component).toBeHidden();
  });

  test('should close the drawer when clicking outside', async () => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    await page.locator('body').click(); 
    const component = await page.locator('.MuiPaper-root');
    await expect(component).toBeHidden();
  });

  test('should allow selection in the Account Name field', async () => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    // opens the account name dropdown
    await page.locator('input[id="Demo-account_name"]').click();
    const selectedValue = await page.getByRole('option', { name: "Account ting" }).innerText();
    await expect(selectedValue).toContain('Account ting');

    await page.getByRole('option', { name: "Account ting" }).click();
  });

  test('should clear all fields when clear button is clicked', async () => {
    await page.getByRole("button", { name: "Advanced Filters" }).click();
    
    await page.locator('input[id="Demo-account_name"]').click();
    // Select an option from the dropdown
    await page.getByRole('option', { name: "Account ting" }).click();
    
    // Clear the fields
    await page.getByLabel('Clear').click();
    
    // Ensure input fields are empty
    // const selectedValue = await page.locator("select[name=customer_type_id]").inputValue();
    // await expect(selectedValue).toBe("1");
  });
});
