import React from 'react';
import CommonDatePicker from './Components/CommonDatePicker';
import GlobalDropdown from './Components/GlobalDropdown';
import Login from './Components/Login';
import MyTable from './Components/MyTable'
// import GlobalMultiDropdown from './Components/GlobalMultiDropdown';


function App() {
  return (
    <>
    <Login />
    <CommonDatePicker/>
    <GlobalDropdown/>
    {/* <GlobalMultiDropdown /> */}
    <MyTable />
    </>
  );
}

export default App;
