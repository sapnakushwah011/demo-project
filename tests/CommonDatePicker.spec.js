import { test, expect } from "@playwright/test";

let page; 
let context; 

test.describe("Common Date Picker Component", () => {
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
    await page.getByText("Account ting").click();
    await page.getByRole("button", { name: "POPS" }).click();
    await page.getByText('New', { exact: true }).click();

  });

  // Clean up the context after all tests are finished
  test.afterAll(async () => {
    await context.close();
  });

  test.beforeEach(async () => {
    await page.reload(); 
  });

  test('should render without crashing', async() => {
    const calendarIcon = await page.getByRole('img', { name: "calendar" }); 
    await expect(calendarIcon).toBeVisible();
  });

  test('should open the date picker on click', async() => {
    const calendarButton = await page.getByRole('img', { name: "calendar" }); 
    await calendarButton.click();

    const datePicker = await page.locator('.react-datepicker'); // Adjust selector if necessary
    await expect(datePicker).toBeVisible();
  });

  test('should select a date and update value', async() => {
    await page.getByRole('img', { name: "calendar" }).click();
    await page.getByLabel('Choose Tuesday, October 15th,').click();
    
    // Check that the input value is updated correctly
    const inputValue = await page.locator('div').filter({ hasText: /^Contract Start\*$/ }).getByRole('textbox').inputValue(); 
    await expect(inputValue).toMatch('10/15/2024'); 
  });

  test('should show validation error for required field', async() => {
    await page.getByRole('button', { name: "SUBMIT" }).click();

    const inputField = await page.locator('div').filter({ hasText: /^Contract Start\*This field is required\.$/ }).getByRole('textbox');
    const borderColor = await inputField.evaluate(el => getComputedStyle(el).borderColor);
    await expect(borderColor).toBe('rgb(220, 53, 69)');

  });

});