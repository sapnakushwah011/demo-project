import { mount, test, expect } from '@playwright/experimental-ct-react';
import PaginateAutoComplete from '../components/PaginateAutoComplete';

test.describe('PaginateAutoComplete Component', () => {
  
  const defaultProps = {
    dropDownName: "parent_account_id",
    apiEndpoint: "/account/parents-account-dropdowns",
    idKey: "account_id",
    valueKey: "account_main_contact_firstname",
    parentKey: "parentAccount",
    tokenKey: 'ross_token',
    // onSelect: jest.fn(),
    placeholder: "-- Select One --",
    useApiSearch: true,
    isCache: false,
    multiple: false,
    defaultValue: null,
    excludeRecords: [],
    selectDisabled: false,
    shouldFetchOnOpen: true,
    showCheckBox: false
  };

  test('should render component with default props', async ({ page }) => {
    const component = await mount(page, <PaginateAutoComplete {...defaultProps} />);
    const input = component.locator('input');
    await expect(input).toHaveAttribute('placeholder', '-- Select One --');
  });

//   test('should fetch data on open if shouldFetchOnOpen is true', async ({ page }) => {
//     const fetchSpy = jest.spyOn(global, 'fetch');
//     await mount(page, <PaginateAutoComplete {...defaultProps} />);
//     const input = page.locator('input');
    
//     // Open the dropdown
//     await input.click();
    
//     // Ensure API call is made
//     expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining(defaultProps.apiEndpoint), expect.anything());
//   });

//   test('should display loading spinner while data is fetching', async ({ page }) => {
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} />);
//     const input = component.locator('input');

//     await input.click(); // Open dropdown to trigger fetch
//     const spinner = component.locator('.MuiAutocomplete-loading');
//     await expect(spinner).toBeVisible();
//   });

//   test('should select a single option', async ({ page }) => {
//     const onSelectMock = jest.fn();
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} onSelect={onSelectMock} />);
//     const input = component.locator('input');

//     // Simulate fetching and selecting option
//     await input.click();
//     const option = component.locator('li').first(); // Assume the first option in dropdown
//     await option.click();

//     expect(onSelectMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: expect.any(String) } }));
//   });

//   test('should handle multiple selection when multiple=true', async ({ page }) => {
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} multiple={true} />);
//     const input = component.locator('input');
//     await input.click(); // Open dropdown
    
//     // Select multiple options
//     const options = component.locator('li');
//     await options.nth(0).click();
//     await options.nth(1).click();
    
//     const selectedChips = component.locator('.MuiChip-root');
//     await expect(selectedChips).toHaveCount(2); // Expect 2 chips for 2 selected items
//   });

//   test('should filter options based on excludeRecords', async ({ page }) => {
//     const excludeId = 3;
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} excludeRecords={[excludeId]} />);
//     const input = component.locator('input');
//     await input.click();

//     const options = component.locator('li');
//     const excludedOption = options.filter({ hasText: excludeId.toString() });

//     await expect(excludedOption).toHaveCount(0); // Expect the excluded record not to be displayed
//   });

//   test('should cache results if isCache=true', async ({ page }) => {
//     const fetchSpy = jest.spyOn(global, 'fetch');
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} isCache={true} />);
    
//     await component.locator('input').click(); // Open dropdown to fetch
//     expect(fetchSpy).toHaveBeenCalledTimes(1); // Called first time
    
//     await component.locator('input').click(); // Open again
//     expect(fetchSpy).toHaveBeenCalledTimes(1); // Should not call again due to caching
//   });

//   test('should trigger debounced search on input change', async ({ page }) => {
//     const fetchSpy = jest.spyOn(global, 'fetch');
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} useApiSearch={true} />);
    
//     const input = component.locator('input');
//     await input.fill('test search'); // Type in search

//     await page.waitForTimeout(300); // Wait for debounce

//     expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('search=test+search'), expect.anything());
//   });

//   test('should clear search and reset data on clear input', async ({ page }) => {
//     const component = await mount(page, <PaginateAutoComplete {...defaultProps} />);
//     const input = component.locator('input');
    
//     await input.fill('test search'); // Type in search
//     await input.press('Escape'); // Clear the search input
    
//     await expect(input).toHaveValue(''); // Expect search to be cleared
//   });

//   test('should not fetch data if selectDisabled is true', async ({ page }) => {
//     const fetchSpy = jest.spyOn(global, 'fetch');
//     await mount(page, <PaginateAutoComplete {...defaultProps} selectDisabled={true} />);
    
//     const input = page.locator('input');
//     await input.click(); // Try to open dropdown
    
//     expect(fetchSpy).not.toHaveBeenCalled(); // Should not fetch data when disabled
//   });
});
