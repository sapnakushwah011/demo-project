import { fireEvent, render, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import CommonDatePicker from '../CommonDatePicker';
import { jest } from '@jest/globals';

// Mock CalendarIcon
jest.mock('../Common', () => ({
    CalendarIcon: () => <svg data-testid="calendar-icon" />,
}));

describe("DatePicker Component", () => {
    const mockHandleChange = jest.fn();

    beforeEach(() => {
        render(<CommonDatePicker 
            calName="test" 
            CalVal="2024-01-01" 
            // CalVal={null}
            HandleChange={mockHandleChange}  
            disabled={true}
        />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render without crashing', () => {
        expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    });

    test('should call HandleChange when date is selected', () => {
        // Open the date picker
        fireEvent.click(screen.getByTestId('calendar-icon'));
        
        // Simulate finding the input inside the DatePicker component
        const dateInput = screen.getByRole('textbox');

        fireEvent.change(dateInput, { target: { value: '01/01/2024' } });
        expect(mockHandleChange).toHaveBeenCalledWith('test', '2024-01-01');
    });

    test('should update state when CalVal is changed', () => {
        
        // Assert that the input value is formatted correctly
        expect(screen.getByRole('textbox')).toHaveValue('01/01/2024');
    });

    test('should disable date picker when disabled prop is true', () => {
        
        // Ensure that the date picker is not clickable
        expect(screen.getByTestId('calendar-icon').closest('.calendar-input-btn')).toHaveClass('disabled-date');
      });

    test('should show red border when isRequired is true and date is not filled', () => {
        const { container } = render(<CommonDatePicker calName="test" CalVal={null} HandleChange={mockHandleChange} isRequired={true} />);
        
        // Check if the container has red border
        expect(container.querySelector('.calendar-input-btn')).toHaveStyle('border: 1px solid red');
    }); 
    
    test('should not show red border when isRequired is false', () => {
        const { container } = render(<CommonDatePicker calName="test" CalVal={null} HandleChange={mockHandleChange} isRequired={false} />);
        
        // Check if the container does not have red border
        expect(container.querySelector('.calendar-input-btn')).not.toHaveStyle('border: 1px solid red');
      });

    
    test('should handle click outside of date picker to close it', () => {
        const { container } = render(<CommonDatePicker calName="test" CalVal={null} HandleChange={mockHandleChange} />);
        
        // Open the date picker
        fireEvent.click(container.querySelector('.calendar-input-btn'));
        
        // Simulate clicking outside
        act(() => {
          fireEvent.click(document.body);
        });
    
        // Ensure the date picker is closed
        expect(screen.queryByRole('dialog')).toBeNull();
      });   
      
      test('should handle invalid date input', () => {
        render(<CommonDatePicker calName="test" CalVal="invalid-date" HandleChange={mockHandleChange} />);
        
        // Check if the date picker shows "N/A" for invalid date
        expect(screen.getByRole('dialog')).toHaveValue('N/A');
      });     

});
