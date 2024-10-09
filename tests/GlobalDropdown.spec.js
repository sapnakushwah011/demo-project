import { test, expect } from '@playwright/test';

test.describe('GlobalDropdown Component', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the page with the GlobalDropdown component
    await page.goto('https://ross-ofr.techcarrel.in/');
  });

  test('Login test', async ({ page }) => {

    await page.getByPlaceholder('Enter Username').fill('rahulphalke123@gmail.com');
    await page.getByPlaceholder('Password').fill('Mighty@1234');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByTestId('ArrowDropDownIcon').locator('path').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await page.pause();
  });

//   test('should display options when data is loaded', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');

//     // Assuming the data loads successfully, verify options are rendered
//     const option = await page.getByRole('option', { name: 'Option 1' });
//     await expect(option).toBeVisible();
//     await expect(option).toHaveValue('1'); // example option value

//     const secondOption = await page.getByRole('option', { name: 'Option 2' });
//     await expect(secondOption).toBeVisible();
//     await expect(secondOption).toHaveValue('2'); // example option value
//   });

//   test('should show validation error when required and no selection', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');
    
//     // Trigger form submission without selecting an option
//     const form = await page.getByRole('form');
//     await form.evaluate(form => form.requestSubmit());

//     // Verify the validation error appears
//     const errorTooltip = await page.getByRole('tooltip');
//     await expect(errorTooltip).toHaveText('Please Select Brand.');
//   });

//   test('should allow search and filter options when searchable', async ({ page }) => {
//     const searchInput = await page.getByPlaceholder('Search');
    
//     // Type a search query
//     await searchInput.fill('Option 1');
    
//     // Verify filtered results
//     const option = await page.getByRole('option', { name: 'Option 1' });
//     await expect(option).toBeVisible();
//     await expect(page.getByRole('option', { name: 'Option 2' })).not.toBeVisible();
//   });

//   test('should select multiple options when isMulti is enabled', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');

//     // Simulate selecting multiple options
//     await dropdown.selectOption(['1', '2']); // selecting options with values '1' and '2'
    
//     const selectedOptions = await dropdown.evaluate(el => Array.from(el.selectedOptions).map(option => option.value));
//     await expect(selectedOptions).toEqual(['1', '2']);
//   });

//   test('should handle disabled state correctly', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');
    
//     // Assuming the dropdown is disabled
//     await expect(dropdown).toBeDisabled();
//   });

//   test('should call onSelect handler when an option is selected', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');
    
//     // Simulate selecting an option
//     await dropdown.selectOption('1'); // Select an option with value '1'
    
//     // Assuming onSelect logs or changes state, check if the function is triggered
//     await expect(page.locator('log-message')).toHaveText('Selected value: 1'); // Adjust based on your logic
//   });

//   test('should fetch new data when opening if shouldFetchOnOpen is true', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');
    
//     // Simulate opening the dropdown (e.g., focusing)
//     await dropdown.focus();

//     // Expect new data to be fetched and displayed
//     const fetchedOption = await page.getByRole('option', { name: 'Fetched Option 1' });
//     await expect(fetchedOption).toBeVisible();
//   });

//   test('should clear selection when handleClear is called', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');

//     // Simulate selecting an option
//     await dropdown.selectOption('1');

//     // Trigger the clear functionality
//     const clearButton = await page.getByRole('button', { name: 'Clear' });
//     await clearButton.click();

//     // Verify the dropdown is cleared
//     await expect(dropdown).toHaveValue('');
//   });

//   test('should display group labels when grouped options are provided', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');

//     // Assuming options are grouped, check if group labels appear
//     const groupLabel = await page.getByRole('group', { name: 'Group 1' });
//     await expect(groupLabel).toBeVisible();
    
//     const option = await page.getByRole('option', { name: 'Option in Group 1' });
//     await expect(option).toBeVisible();
//   });

//   test('should handle errors during data fetching', async ({ page }) => {
//     const dropdown = await page.getByRole('combobox');

//     // Simulate a failed API call
//     const errorMessage = await page.locator('.text-danger');
//     await expect(errorMessage).toHaveText('Failed to fetch options');
//   });

});
