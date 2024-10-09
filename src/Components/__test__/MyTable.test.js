import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import MyTable from "../MyTable";
import { MemoryRouter } from 'react-router-dom';

// Fetching the accounts data
const fetchAccountsData = async (page = 1, search="") => {
   try {
     const response = await fetch(`https://ross-op.techcarrel.in/api/account/account-list`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscGhhbGtlMTIzQGdtYWlsLmNvbSIsIm5hbWUiOiJSYWh1bCBQaGFsa2UiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfZWRpdCI6ZmFsc2UsInBvc2l0aW9uIjoiIiwiYWNjb3VudF9pZCI6MCwidXNlcl90eXBlIjowLCJjb250YWN0X2lkIjowLCJ1c2VySUQiOjEsImlhdCI6MTcyNTk2NTg5OSwiZXhwIjoxNzI1OTczMDk5fQ.cUL0yv00mFqNNBQYPBanmQ30G59fwImundaZ1QsGBmg'
       },
       body: JSON.stringify({ page, search: search.trimEnd() }),
     });
 
 
     const accountsData = await response.json();
     const account = accountsData.data.account || []
     const totalPages = accountsData.data.totalPages || 0
 
     return {account, totalPages };
   } catch (error) {
     // Log the error for debugging
     console.error("Error fetching data:", error.message);
     return { accounts: [], totalPages: 0 };
   }
 };
 
const handleSetSearch = jest.fn(); 

describe("Account Table component", () => {

  it("renders table with data", async () => {
    const page = 1;
    const { account, totalPages } = await fetchAccountsData(page);

    render(
      <MemoryRouter>
        <MyTable
          tableData={account} 
          totalPages={totalPages} 
          currentPage={page} 
          showLoading={false}
        />
      </MemoryRouter>
    );

   //  screen.debug();
    await waitFor(()=> {
      expect(screen.getByText("Abilene Fatz")).toBeInTheDocument();
      expect(screen.getByText("Abilene Fiveclub")).toBeInTheDocument();
    });
  });

test("displays no data found message when tableData is empty and showLoading is false", () => {
   render(
      <MemoryRouter>
         <MyTable
          tableData={[]}
          totalPages={1}
          currentPage={1}
          showLoading={false}
         />
      </MemoryRouter>);

    expect(screen.getByText('No data found')).toBeInTheDocument();

})  

//  test("displays loading skeleton when showLoading is true", async() => {
//    const page = 1;
//    const { account, totalPages } = await fetchAccountsData(page);

//    render(
//       <MemoryRouter>
//         <MyTable
//           tableData={account} 
//           totalPages={totalPages} 
//           currentPage={page} 
//           showLoading={true}
//         />
//       </MemoryRouter>
//     );   

//     screen.debug();
//     const skeletons = screen.getAllByRole('progressbar');
//     expect(skeletons).toHaveLength(15);

//  });  

test("handles search input and search button click", async() => {
   const page = 1;
   const search = {};
   const { account, totalPages } = await fetchAccountsData(page, search);

   render(
      <MemoryRouter>
         <MyTable
          tableData={account}
          totalPages={totalPages}
          currentPage={page}
          handleSetSearch={handleSetSearch}
          setShowSearchReset={jest.fn()}
          showSearchReset={false}
          showLoading={false}   
         />
      </MemoryRouter>);
 
    fireEvent.change(screen.getByPlaceholderText('Search by keywords...'), { target: { value: '09-08-24Complete testing' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(handleSetSearch).toHaveBeenCalledWith('');
    });
})

});
