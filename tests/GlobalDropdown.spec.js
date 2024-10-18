import { test, expect } from '@playwright/test';

let page; 
let context; 

test.describe('GlobalDropdown Component', () => {
  test.setTimeout(60000);
  
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://ross-ofr.techcarrel.in/");
    await page.getByPlaceholder("Username").fill("rahulphalke123@gmail.com");
    await page.getByPlaceholder("Password").fill("Mighty@1234");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/dashboard");
    await page.getByRole("button", { name: "Go to Account Listings" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/accounts-listing");
    await page.getByRole("button", { name: "svgNew" }).click();
    await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/admin-account");
  });

  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload(); 
  });

  test('should render without crashing', async() => {
   const dropdown =  await page.locator("select[name=customer_type_id]");
   await expect(dropdown).toBeVisible();
  });

  test('should show loading while fetching data', async() => {
    await page.click("select[name=customer_type_id]");
    await expect(page.getByText('option', { name: "Loading..." })).toBeVisible();

  });

  test('should display options when data is loaded', async() => {
    await page.click("select[name=customer_type_id]");
  
    // Wait for the option to appear and be visible
    const option = await page.getByText('option', { name: "Customer" });
    await expect(option).toBeVisible();

    const secondOption = await page.getByText('option', { name: "Government" });
    await expect(secondOption).toBeVisible();
  });


  test('should show select value in input box when an option is selected', async() => {
    await page.click("select[name=customer_type_id]");
    await page.selectOption("select[name=customer_type_id]", { label: "Customer" });

    // Verify that the value is displayed in the input box after selection
    const selectedValue = await page.locator("select[name=customer_type_id]").inputValue();
    await expect(selectedValue).toBe("1");
  });

});
