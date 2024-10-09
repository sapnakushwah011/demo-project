import { fireEvent, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import Login from '../Login';


describe("Login Component", () => {
    beforeEach(() => {
        render(<Login />);
      });
    
    it("renders login form with all input fields", () => {
        expect(screen.getByLabelText(/Enter username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Enter email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Create Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
      }); 


    it("filling in the form" , () => {
       
        fireEvent.change(screen.getByLabelText(/Enter username/i), {
            target: { value: "John Doe"},
        });

        expect(screen.getByLabelText(/Enter username/i)).toHaveValue("John Doe");
    });

      it("showing error message if password does not match", () => {
        
        fireEvent.change(screen.getByLabelText(/Enter username/i), {
          target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Enter email address/i), {
          target: { value: "john.doe@email.com" },
        });
        fireEvent.change(screen.getByLabelText(/Create Password/i), {
          target: { value: "john123" },
        });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
          target: { value: "john456" },
        });
    
        fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));
    
        expect(screen.getByText(/Email and password wrong/i)).toBeInTheDocument();
      });

      it("trigger alert on successful submission" , () => {
        global.alert = jest.fn();

        fireEvent.change(screen.getByLabelText(/Enter username/i), {
            target: { value: "John Doe" },
          });
          fireEvent.change(screen.getByLabelText(/Enter email address/i), {
            target: { value: "john.doe@email.com" },
          });
          fireEvent.change(screen.getByLabelText(/Create Password/i), {
            target: { value: "john123" },
          });
          fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
            target: { value: "john123" },
          });
      
          fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));
      
          expect(global.alert).toHaveBeenCalledWith("Sign up successfully");
          global.alert.mockClear();
      })
    
      it("resets form on successful submission", () => {
        fireEvent.change(screen.getByLabelText(/Enter username/i), {
          target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText(/Enter email address/i), {
          target: { value: "john.doe@email.com" },
        });
        fireEvent.change(screen.getByLabelText(/Create Password/i), {
          target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
          target: { value: "password123" },
        });
    
        fireEvent.click(screen.getByRole("button", { name: /Sign up/i }));
    
        expect(screen.getByLabelText(/Enter username/i)).toHaveValue("");
        expect(screen.getByLabelText(/Enter email address/i)).toHaveValue("");
        expect(screen.getByLabelText(/Create Password/i)).toHaveValue("");
        expect(screen.getByLabelText(/Confirm Password/i)).toHaveValue("");
        expect(screen.queryByText(/Email and password wrong/i)).not.toBeInTheDocument();
      });

})