import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import PaginateAutoComplete from '../PaginateAutoComplete';

describe('PaginateAutoComplete', () => {

  const handleSelect = jest.fn();

  const defaultProps = {
    dropDownName : "parent_account_id",
    apiEndpoint : "/account/parents-account-dropdowns",
    idKey : "account_id",
    valueKey : "account_main_contact_firstname",
    parentKey : "parentAccount",
    onSelect : handleSelect,
    shouldFetchOnOpen : true ,
    isCache : false, 
    className : "styles.ddLabel",
    isAsync : true,
    pageSize : 20
  };

  test('renders without crashing', () => {
    render(<PaginateAutoComplete {...defaultProps} />);
    expect(screen.getByPlaceholderText('-- Select One --')).toBeInTheDocument();
  });


  test('should display placeholder text', () => {
    render(<PaginateAutoComplete {...defaultProps} placeholder='--Select--'  />)
    expect(screen.getByPlaceholderText('--Select--')).toBeInTheDocument();
  })


  test('handles disabled state', () => {
    render(<PaginateAutoComplete {...defaultProps} selectDisabled={true} />);
    expect(screen.getByPlaceholderText('-- Select One --')).toBeDisabled();
  }); 
  
  test('displays loading state while fetching data', async () => {
    render(<PaginateAutoComplete {...defaultProps} />);

    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();

  });

  test('should fetch and display options on open', async () => {
    render(<PaginateAutoComplete {...defaultProps} />);
    
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
    // screen.debug();

    const option = await screen.findByText("Abilene Fatz", {} , { timeout : 3000 });
    const secondOption = await screen.findByText("1 Dobby Zappers");
    expect(option).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();

  });

test('handles input change and debounce search', async () => {
    render(<PaginateAutoComplete {...defaultProps} isSearchable = {true} />);
    fireEvent.mouseDown(screen.getByRole('combobox'));

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Abi' } });

    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
    // screen.debug();
    const option = await screen.findByText("Abilene Fatz", {} , { timeout : 3000 });
    expect(option).toBeInTheDocument();
});
  

test('handles pagination on scroll', async () => {
  // jest.setTimeout(15000);
  render(<PaginateAutoComplete {...defaultProps} />);

  fireEvent.mouseDown(screen.getByRole('combobox'));
  expect(screen.getByText(/Loading…/i)).toBeInTheDocument();

  const firstOption = await screen.findByText("Abilene Fatz", {}, { timeout: 3000 });
  expect(firstOption).toBeInTheDocument();


  const listbox = screen.getByRole('listbox');
  // screen.debug(listbox);
  fireEvent.scroll(listbox, { target: { scrollTop: listbox.scrollHeight } });

  const secondOption = await screen.findByText("Abilene Kwinu");
  expect(secondOption).toBeInTheDocument();
  
});

// test/'handles selection change', async () => {
//   render(<PaginateAutoComplete {...defaultProps} />);

//   fireEvent.mouseDown(screen.getByRole('combobox'));

//   const option = await screen.findByText("Abilene Fatz", {}, { timeout: 3000 });
//   expect(option).toBeInTheDocument();
//   screen.debug();
//   fireEvent.click(option);

//   // Verify that onSelect was called with correct parameters
//   expect(handleSelect).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ value: "Abilene Fatz" }) ]));

// });


test('handles clear search input', async () => {
  render(<PaginateAutoComplete {...defaultProps}/>);

  fireEvent.mouseDown(screen.getByRole('combobox'));
  const option = await screen.findByText("Abilene Fatz", {}, { timeout: 3000 });
  expect(option).toBeInTheDocument();

  // Type in the search input to trigger search
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Abilene' } });
  const debouncedOption = await screen.findByText("Abilene Fatz", {}, { timeout: 3000 });
  expect(debouncedOption).toBeInTheDocument();

  // Clear the search input
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '' } });
  expect(screen.getByRole('combobox')).toHaveValue('');

});

// test('should handle multi-selection', async () => {
  
//   render(<PaginateAutoComplete {...defaultProps} multiple={true} />);
//   fireEvent.mouseDown(screen.getByRole('combobox'));
//   expect(screen.getByText(/Loading…/i)).toBeInTheDocument();

//   const optionOne = await screen.findByText("Abilene Fatz", {} , { timeout: 3000})
//   expect(optionOne).toBeInTheDocument();

//   fireEvent.click(screen.getByText("Abilene Fatz"));

//   expect(handleSelect).toHaveBeenCalledWith(
//       expect.objectContaining({
//           target: expect.objectContaining({
//               value: expect.arrayContaining([15897]),
//               formatted: expect.arrayContaining([
//                   { label: "Abilene Fatz", value: 15897 },
//               ])
//           })
//       }),
//       expect.arrayContaining([
//           expect.objectContaining({
//               account_id: 15897,
//               account_main_contact_firstname: "Abilene Fatz"
//           }),
//           expect.objectContaining({
//               account_main_contact_firstname: "1 Dobby Zappers"
//           })
//       ])
     
//   );

//   // Verify that the selection reflects the correct data
//   const selectedChips = screen.getAllByRole('button'); // Chips are usually rendered as buttons
//   expect(selectedChips).toHaveLength(2);
//   expect(selectedChips[0]).toHaveTextContent(" 1 Dobby Zappers");
//   expect(selectedChips[1]).toHaveTextContent("Abilene Fatz");
// });


});
