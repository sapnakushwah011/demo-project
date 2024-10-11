import { test, expect } from '@playwright/test';

test.describe('PaginateAutoComplete Component', () => {

  test.setTimeout(60000); // Set to 60 seconds

  test.beforeEach(async({ page}) => {
    await page.goto('https://ross-ofr.techcarrel.in/');
    await page.getByPlaceholder('Username').fill('rahulphalke123@gmail.com');
    await page.getByPlaceholder('Password').fill('Mighty@1234');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.goto('https://ross-ofr.techcarrel.in/dashboard');
    await page.goto('https://ross-ofr.techcarrel.in/admin-account'); // Adjust URL
  })

  test.afterEach(async({ page }) => {
    await page.close();
  })

  // Initial rendering of the component
  test('should render Autocomplete with default props', async ({ page }) => {
    // Verify component renders with default placeholder
    const autocomplete = page.locator('input[id="Demo-parent_account_id"]');
    await expect(autocomplete).toBeVisible();
  });

  test('should render placeholder', async ({ page }) => {
    // Verify component renders with default placeholder
    const autocomplete = page.locator('input[id="Demo-parent_account_id"]');
    await expect(autocomplete).toHaveAttribute('placeholder', '-- Select One --');
  });

  // Test fetching data on open
  test('should fetch data when opened', async ({ page }) => {

    // Simulate opening of the dropdown
    await page.locator('input[id="Demo-parent_account_id"]').click();
    await expect(page.locator("text=1 Dobby Zappers")).toBeVisible();
    await expect(page.locator("text=12-08-2024 Account Testing")).toBeVisible();
  });

  // Test API fetch with debounce on input change
  test('should fetch and filter results based on search input', async ({ page }) => {

    const inputField = page.locator('input[id="Demo-parent_account_id"]');
    
    // Type into the input field (debounced search)
    await inputField.type('test', { delay: 100 });

    // Check if data is fetched after debounce
    await page.waitForTimeout(1000);  // Wait for debounce to complete
    await expect(page.locator("text=10-09-24_Test")).toBeVisible();
    await expect(page.locator("text=12-08-2024 Account Testing")).toBeVisible(); 
  });

  //  Test scrolling and pagination
  test('should load more options when scrolling', async ({ page }) => {
    // Open the dropdown by clicking the input field
    await page.click('input[id="Demo-parent_account_id"]');
    await page.waitForSelector('.MuiAutocomplete-popper', { state: 'visible' });

    // Locate the dropdown list container
    const dropdownList = page.locator('.MuiAutocomplete-listbox'); 
    await dropdownList.evaluate(node => node.scrollTo(0, node.scrollHeight));
    await page.waitForTimeout(500);
    await expect(page.locator('text=Abilene Browseblab')).toBeVisible();
});


  // Test disabling the select
  // test('should disable the Autocomplete when `selectDisabled` prop is true', async ({ page }) => {
  //   await page.goto('/your-component-url?selectDisabled=true'); // Pass selectDisabled prop

  //   // Verify the input is disabled
  //   const inputField = page.locator('.MuiAutocomplete-input');
  //   await expect(inputField).toBeDisabled();
  // });

  // // Test custom render option
  // test('should use custom render option if provided', async ({ page }) => {
  //   await page.goto('/your-component-url?customRenderOption=true');  // Adjust based on your prop handling

  //   // Open dropdown
  //   await page.click('.MuiAutocomplete-root input');

  //   // Check if custom render logic is applied
  //   const options = page.locator('.render-option.custom');  // Assuming custom class is added in custom render
  //   await expect(options).toHaveCount(20);
  // });

  // // Test clearing the search input
  test('should clear search and reset data when input is cleared', async ({ page }) => {
    // Navigate to the page containing the Autocomplete component
    const inputField = page.locator('input[id="Demo-parent_account_id"]');

    // Type into the input field
    await inputField.type('test', { delay: 100 });
    await page.waitForSelector('.MuiAutocomplete-listbox');

    await inputField.fill('');
    await page.waitForTimeout(500); 

    const options = page.locator('.MuiAutocomplete-listbox');
    await expect(options).toHaveCount(1); 
});

});
