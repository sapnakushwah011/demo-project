import { test, expect } from "@playwright/test";

let page;
let context;

test.describe("Create Account Component", () => {
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
    await expect(page).toHaveURL(
      "https://ross-ofr.techcarrel.in/accounts-listing"
    );
    await page.getByRole("button", { name: "svgNew" }).click();
  });

  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload();
  });

  //   test("should render without crashing", async () => {
  //     const Title = page.getByText("New Account");
  //     await expect(Title).toBeVisible();
  //   });

  //   // Test: Ensure the form renders with all necessary fields
  //   test("should display the form fields correctly", async () => {
  //     await expect(page.locator("form#create-new-account-form")).toBeVisible();
  //     await expect(page.locator('input[name="account_name"]')).toBeVisible();
  //     await expect(page.locator('select[name="customer_type_id"]')).toBeVisible();
  //     await expect(page.locator('select[name="industry_id"]')).toBeVisible();
  //     await expect(page.locator('input[name="account_main_contact_firstname"]')).toBeVisible();
  //     await expect(page.locator('input[name="account_main_contact_lastname"]')).toBeVisible();
  //   });

  //   test('should show all the section', async() => {
  //     const AccountInformation =  page.getByRole("heading", { name: "Account Information" });
  //     await expect(AccountInformation).toBeVisible();

  //     const AEDOptions =  page.getByRole("heading", { name: "AED Options" });
  //     await expect(AEDOptions).toBeVisible();

  //     const AccountPOC =  page.getByRole("heading", { name: "Account POC" });
  //     await expect(AccountPOC).toBeVisible();

  //     const ProjectManagers =  page.getByRole("heading", { name: "Project Managers" });
  //     await expect(ProjectManagers).toBeVisible();

  //     const  MainSiteInformation =  page.getByRole("heading", { name: "Main Site Information" });
  //     await expect(MainSiteInformation).toBeVisible();

  //     const  Technicians =  page.getByRole("heading", { name: "Technicians" });
  //     await expect(Technicians).toBeVisible();
  //   });

  // Test: Required fields show validation error
  // test('should show validation error if required fields are missing', async () => {
  //   await page.click('button[type="submit"]');  // Submit form without filling anything

  //   // Wait for validation messages to appear and assert their presence
  //   await expect(page.locator('text="Please Enter Account Name."')).toBeVisible();
  //   await expect(page.locator('text="Please enter a valid email address."')).toBeVisible();
  // });

    // Test: Valid form submission
    test('should allow form submission when all required fields are filled', async () => {  
      await page.fill('input[name="account_name"]', 'Test Account John');

      await page.click("select[name=customer_type_id]");
      await page.selectOption("select[name=customer_type_id]", { label: "Customer" });

      await page.fill('input[name="account_main_contact_firstname"]', 'John');
      await page.fill('input[name="account_main_contact_lastname"]', 'Doe');

      await page.fill('input[name="account_main_contact_email"]', 'test.email@gmail.com');

      await page.fill('input[name="account_site_address1"]', 'esrert');
      await page.fill('input[name="account_site_city"]', 'riben');
      await page.fill('input[name="state"]', 'Alabama');
      await page.pause();
      await page.fill('input[name="account_site_zipcode"]', '23456');

      await page.getByRole('button', { name: "Generate" }).click();

      await page.click('button[type="submit"]');

      await expect(page).toHaveURL("https://ross-ofr.techcarrel.in/accounts-listing");
      await expect(page.locator('text=Account created successfully')).toBeVisible();
    });

  //   // Test: Check toggle switches are clickable
  //   test('should toggle the restricted user switch', async () => {
  //     const toggleSwitch = page.locator('input[name="restricted_user"]');
  //     await expect(toggleSwitch).not.toBeChecked();
  //     await toggleSwitch.click();
  //     await expect(toggleSwitch).toBeChecked();
  //   });

  //   // Test: Country dropdown should display correct data
  //   test('should display countries in the country dropdown', async () => {
  //     await page.click('div[role="combobox"]'); // Assuming it's a dropdown
  //     const countryList = page.locator('div.country-dropdown-item');
  //     await expect(countryList).toHaveCount(230); // Assuming the country list is preloaded
  //   });

  //   // Test: Validate multi-select for products
  //   test('should select multiple products in the multi-select dropdown', async () => {
  //     const productSelect = page.locator('div.products-dropdown');
  //     await productSelect.click();
  //     await page.check('text=Product 1'); // Select a product
  //     await page.check('text=Product 2'); // Select another product
  //     await expect(productSelect).toContainText('2 Selected');
  //   });

  //   // Test: Ensure form can handle multiple emails and phones
  //   test('should allow adding multiple email and phone fields', async () => {
  //     const addEmailButton = page.locator('button#add-email');
  //     const addPhoneButton = page.locator('button#add-phone');

  //     // Check email addition
  //     await addEmailButton.click();
  //     await expect(page.locator('input[name="account_main_contact_email"]')).toHaveCount(2); // Ensure 2 email fields are present

  //     // Check phone addition
  //     await addPhoneButton.click();
  //     await expect(page.locator('input[name="account_main_contact_phone"]')).toHaveCount(2); // Ensure 2 phone fields are present
  //   });

  //   // Test: Handle the same address toggle
  //   test('should copy address when same address toggle is selected', async () => {
  //     await page.fill('input[name="account_site_address1"]', '123 Main St');
  //     await page.fill('input[name="account_site_city"]', 'Los Angeles');
  //     await page.check('input[name="same_billing_address"]'); // Simulate toggling same billing address
  //     await expect(page.locator('input[name="account_billing_info_address1"]')).toHaveValue('123 Main St');
  //     await expect(page.locator('input[name="account_billing_info_city"]')).toHaveValue('Los Angeles');
  //   });
});
