import { fireEvent, render, screen, act, waitFor, findByText } from '@testing-library/react';
import "@testing-library/jest-dom";
import { jest } from '@jest/globals';
import GlobalMultiDropdown from '../GlobalMultiDropDown';


describe("GlobalMutliDropdown Component", () => {
    const handleSelect = jest.fn();

    const defaultProps = {
        dropDownName: 'account_status',
        apiEndpoint: 'account/account-status-dropdowns',
        idKey: 'drop_account_status_id',
        valueKey: 'account_status',
        parentKey: 'accountStatus',
        onSelect: handleSelect,
        initialSelectedValue: [],
        shouldFetchOnOpen: true,
        className: 'react-select-container',
        selectDisabled: false,
        isMultiSelect: true,
        closeMenuSelect: false,
        placeholder: "--Select--"
      };

    it('renders without crashing', () => {
        render(<GlobalMultiDropdown />)
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

    it('displays the placeholder correctly', () => {
        render(<GlobalMultiDropdown {...defaultProps} />);
        expect(screen.getByText('--Select--')).toBeInTheDocument();
      });    

      it('should display initial selected value', () => {
        const initialSelectedValue = [ { value : 1, label : 'Active'}, { value: 2 , label : "Do not Contact"} ]
    
        render(<GlobalMultiDropdown {...defaultProps} initialSelectedValue = {initialSelectedValue} />);
        screen.debug();
        expect(screen.getByLabelText('Active')).toBeInTheDocument();
      });  

    it('should show a loading spinner when fetching data', async () => {
    
        render(<GlobalMultiDropdown {...defaultProps} />);
        fireEvent.mouseDown(screen.getByRole('combobox'));
    
        const loading = await screen.findByText('Loading...');
        expect(loading).toBeInTheDocument();
      });    
    
    it('should fetch data on menu open', async () => {
        render(<GlobalMultiDropdown {...defaultProps} />);

        fireEvent.mouseDown(screen.getByRole('combobox'));
        expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
        
        const Active = await screen.findByText("Active");
        const DNC = await screen.findByText("Do not Contact");

        expect(Active).toBeInTheDocument();
        expect(DNC).toBeInTheDocument();
    
        // await waitFor(() => {
        //     expect(screen.findByText('Active')).toBeInTheDocument();
        //     expect(screen.findByText('Do not Contact')).toBeInTheDocument();
        //   });
    });   
    
    it('should display options provided directly via props', () => {
        const options = [ { id: 1, value: 'Option 1' }, { id: 2, value: 'Option 2' } ];
        render(
         <GlobalMultiDropdown 
            shouldFetchOnOpen = {true}
            isCache = {false}
            className = 'react-select-container'
            selectDisabled = {false}
            isMultiSelect = {true}
            closeMenuSelect = {false}
            options={options}
          />);

        fireEvent.mouseDown(screen.getByRole('combobox'));
        
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
      });    

      it('should call the onSelect callback when an option is selected', async () => {
    
        render(<GlobalMultiDropdown {...defaultProps} />);
        fireEvent.mouseDown(screen.getByRole('combobox'));
    
        const Active = await screen.findByText('Active');
        fireEvent.click(Active);
    
        expect(handleSelect).toHaveBeenCalledWith(expect.arrayContaining([expect.objectContaining({ value: 1 }) ]));
      });    
      
      
    it('should display an error message if the API call fails', async () => {
        render(
        <GlobalMultiDropdown 
        dropDownName = 'account_status'
        apiEndpoint = 'account/account-status'
        idKey = 'drop_account_status_id'
        valueKey= 'account_status'
        parentKey = 'accountStatus'
        onSelect = {handleSelect}
        shouldFetchOnOpen = {true}
        isCache = {false}
        className = 'react-select-container'
        selectDisabled = {false}
        isMultiSelect = {true}
        closeMenuSelect = {false}
        />);

        fireEvent.mouseDown(screen.getByRole('combobox'));
    
        await waitFor(() => {
          expect(screen.getByText('HTTP error! status: 404')).toBeInTheDocument();
        });
    });

    // it('should handle multi-selection', async () => {
    //     const select =  render(<GlobalMultiDropdown {...defaultProps} />);
        
    //     fireEvent.mouseDown(select.getByRole('combobox'));
    
    //     const option1 = await select.findByText('Active');
    //     const option2 = await select.findByText('Do not Contact');
    //     fireEvent.click(option1);
    //     fireEvent.click(option2);
    
    //     expect(handleSelect).toHaveBeenCalledWith([
    //         expect.arrayContaining([expect.objectContaining({ value : 1, label : "Active" })]),
    //         expect.arrayContaining([expect.objectContaining({ value : 2, label : "Do not Contact" })])
    //     ]);
    //   });


    it('should cache the data if isCache is true', async () => {
      const handleSelect = jest.fn();
      const defaultProps = {
        dropDownName: 'account_status',
        apiEndpoint: 'account/account-status-dropdowns',
        idKey: 'drop_account_status_id',
        valueKey: 'account_status',
        parentKey: 'accountStatus',
        onSelect: handleSelect,
        isCache: true, 
        shouldFetchOnOpen: true,
        selectDisabled: false,
        isMultiSelect: true,
        closeMenuSelect: false,
      };
  
      render(<GlobalMultiDropdown {...defaultProps} />);
      fireEvent.mouseDown(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Do not Contact')).toBeInTheDocument();
      });

      // Reopen after caching
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape', code: 'Escape' });
      fireEvent.mouseDown(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(screen.getByText('Do not Contact')).toBeInTheDocument();
      });
    });  

});