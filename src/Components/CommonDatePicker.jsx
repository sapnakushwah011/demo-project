import React, { useState, useEffect,forwardRef,useRef } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import MaskedInput from 'react-text-mask'
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "./Common";

const CustomInput = forwardRef(({isRequired,isFilled, ...props}, ref) => (
    <MaskedInput
      mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]} 
      {...props}
      ref={ref}
      required={isRequired}
    />
));

function CommonDatePicker({
  calName,
  CalVal,
  HandleChange,
   disabled = false,
   isRequired = false,
   minDate,
   maxDate,
}) {
  // const inputReference = useRef(null);
  const [DateValueState, setDateValueState] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to track if date picker is open
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef(null);

  const handleCalendarChange = (value) => {
    if (!value) return "N/A";
    const date = moment(value).format("YYYY-MM-DD");

    if(date.toLowerCase() =='invalid date') {
      return "N/A";
    }

    const v1 = new Date(value);
    HandleChange(calName, date);
    setDateValueState(v1);
    setIsFilled(true); 
    setIsOpen(false)
  };


  useEffect(() => {
    if (!CalVal || CalVal=='unknown') return ;
    if(moment(CalVal).format("MM/DD/YYYY") === 'Invalid Date') return "N/A";
    const v1 = moment(CalVal).format("MM/DD/YYYY");
    handleCalendarChange(v1);
  }, [CalVal]);

  return (
    <div className={`d-flex align-items-center calendar-input-btn calendar-input-btn-1012 ${disabled ? 'disabled-date':''}`} 
    style={{
      border: (isRequired && !isFilled) ? '1px solid red' : '',
    }}>

      <DatePicker
        open={isOpen}
        selected={DateValueState}
        onChange={handleCalendarChange}
        inputRef={inputRef}
        maxDate={maxDate}
        minDate={minDate}
        disabled={disabled}
        onClickOutside={() => setIsOpen(false)}
        shouldCloseOnSelect={true}
        customInput={
          <CustomInput 
            inputRef={inputRef}
            disabled={disabled}
            isRequired={isRequired}
            isFilled={isFilled}
            />
        }
      />  
       
        <span className="cl-name" onClick={() => 
          (disabled) ? "" :  setIsOpen(!isOpen)
          } ><CalendarIcon/></span>
    </div>
  );
}

export default CommonDatePicker;
