import { fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import { jest } from '@jest/globals';
import GlobalDropdown from '../GlobalDropdown';


describe("GlobalDropdown Component", () => {

  const handleSelect = jest.fn();

  const defaultProps = {  
    dropDownName : "customer_type_id",
    apiEndpoint : "/account/customer-account-dropdowns",
    idKey : "dropdown_customer_type_id",
    valueKey : "customer_type_name",
    parentKey : "customerType",
    onSelect : handleSelect,
    shouldFetchOnOpen : true,
    isCache : false,
    className : "styles.ddLabel",
    selectDisabled : false,
    placeholder: "Select an option"
  }    

  it('renders without crashing', () => {
    render(<GlobalDropdown {...defaultProps}/>)
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays the placeholder correctly', () => {
    render(<GlobalDropdown placeholder='Select an option'/>)

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

it('displays loading state during data fetch', async () => {
    render(<GlobalDropdown {...defaultProps} />);

    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });  


it('fetches data from the real API when dropdown is focused', async () => {
  render(<GlobalDropdown {...defaultProps} />);


  fireEvent.focus(screen.getByRole('combobox'));
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await waitFor(() => {
    // screen.debug();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Government')).toBeInTheDocument();
  });
});  
  
  it('renders options passed via props', () => {
    const options = [ { id: 1, value: 'Option 1' }, { id: 2, value: 'Option 2' } ];
  
    render(
      <GlobalDropdown
        shouldFetchOnOpen={true}
        isCache={false}
        className="styles.ddLabel"
        selectDisabled={false}
        options={options}
      />
    );
    
    fireEvent.focus(screen.getByRole('combobox'));
  
    expect(screen.getByRole('option', { name: /Option 1/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Option 2/i })).toBeInTheDocument();
  });
  

  it('calls onSelect when an option is selected after fetching from the API', async () => {
    render(<GlobalDropdown {...defaultProps} />);

    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the API data to be rendered
    await waitFor(() => {
      // screen.debug();
      expect(screen.getByRole('option', { name: /Customer/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /Government/i})).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    expect(handleSelect).toHaveBeenCalledWith(expect.anything(), '1');
  }); 

  it('supports custom rendering of options', () => {
    // Define a custom render function
    const customRender = (item, idKey, valueKey) => (
      <span key={item[idKey]}>{`Custom ${item[valueKey]}`}</span>
    );

    const options = [{ id: 1, value: 'Option 1' }, { id: 2, value: 'Option 2' }];

    render(<GlobalDropdown options={options} customRender={customRender} />);

    expect(screen.getByText('Custom Option 1')).toBeInTheDocument();
    expect(screen.getByText('Custom Option 2')).toBeInTheDocument();
  });
    

  it('supports grouped options rendering', () => {
    const options = [
      { id: '1', value: 'Option 1', group: 'Group A' },
      { id: '2', value: 'Option 2', group: 'Group A' },
      { id: '3', value: 'Option 3', group: 'Group B' }
    ];

    render(<GlobalDropdown options={options} groupBy="group" />);
   screen.debug();
   const optgroupA = document.querySelector('optgroup[label="Group A"]');
   const optgroupB = document.querySelector('optgroup[label="Group B"]');

    expect(optgroupA).toBeInTheDocument();
    expect(optgroupB).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
  
});
