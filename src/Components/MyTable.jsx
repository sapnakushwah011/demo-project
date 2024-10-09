import React, { useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DecryptToken } from "./Common/index.js"; 
import { getPermission } from "./Common/index.js";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import CloseIcon from "@mui/icons-material/Close";
import { Lock } from "@mui/icons-material";
import { RenderEqupment } from "./Common/index.js"; 
import { Button as BButton, Form } from "react-bootstrap";
import { Skeleton } from "@mui/material";

const DataGrid = ({
  tableData,
  totalPages,
  currentPage,
  onPageChange,
  setShowSearchReset,
  showSearchReset,
  handleReset,
  showLoading,
  handleSetSearch,
}) => {
  const navigate = useNavigate();
  const user = DecryptToken();
  const privilege = getPermission();
  const [searchInput, setSearchInput] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Account Name",
        accessor: "account_name",
        Cell: ({ row }) => (
          <div style={{ color: "blue", fontWeight: "600" }}>
            {RenderAccTitle(row.original)}
          </div>
        ),
        width: "20%",
      },
      {
        Header: "Equipment",
        accessor: "equipment",
        Cell: ({ value, row }) => RenderEqupment(row.original),
        width: "10%",
        disableSortBy: true, // Disable sorting for this column
      },
      {
        Header: "Training",
        accessor: "trainning",
        Cell: () => (
          <span className="text-danger">
            <CloseIcon color="error" />
          </span>
        ),
        width: "10%",
        disableSortBy: true, // Disable sorting for this column
      },
      {
        Header: "Customer Type",
        accessor: "customer_type_name",
        width: "15%",
      },
      {
        Header: "Parent Account",
        accessor: "parent_name",
        Cell: ({ row }) => (
          <div style={{ color: "blue" }}>{RenderAccParent(row.original)}</div>
        ),
        width: "15%",
      },
      {
        Header: "Distributor Account",
        accessor: "distributon_name",
        Cell: ({ row }) => RenderDistributer(row.original),
        width: "15%",
      },
      {
        Header: "Owner",
        accessor: "owner",
        width: "10%",
      },
      {
        Header: "Restricted",
        accessor: "isSecure",
        Cell: ({ value }) =>
          value ? (
            <Lock size={16} className="text-dark" />
          ) : (
            <CloseIcon color="error" />
          ),
        width: "5%",
        disableSortBy: true, // Disable sorting for this column
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: tableData || [],
      initialState: { pageIndex: 0, pageSize: 50 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );


  const RenderAccTitle = (account) => {
    const isClickable =
      user?.user_type === 0 ||
      (user?.user_type === 2 &&
        user?.sub_admin != "" &&
        (privilege?.includes("account-details") ||
          privilege?.includes("site-tab") ||
          privilege?.includes("contact-tab") ||
          privilege?.includes("equipment-tab") ||
          privilege?.includes("training-tab") ||
          privilege?.includes("inperson-tab") ||
          privilege?.includes("pops-tab") ||
          privilege?.includes("notes-tab") ||
          privilege?.includes("support-tab") ||
          privilege?.includes("email-tab") ||
          privilege?.includes("documents-tab") ||
          privilege?.includes("rfi-tab")));

    return (
      <span
        className={isClickable ? "link" : ""}
        onClick={() =>
          isClickable &&
          navigate(`/account-details/${account.account_id}`, {
            state: {
              siteTitle: "Account: " + account?.account_name,
              editUrl: `/account/accounts-edit/${account?.account_id}`,
              deleteUrl: `/account/accounts-delete/${account?.account_id}`,
            },
          })
        }
      >
        {account.account_name}
      </span>
    );
  };

  const RenderAccParent = (account) => {
    return (
      <span
        className={
          user?.user_type === 0 ||
          (user?.user_type === 2 &&
            user?.sub_admin != "" &&
            (privilege?.includes("account-details") ||
              privilege?.includes("site-tab") ||
              privilege?.includes("contact-tab") ||
              privilege?.includes("equipment-tab") ||
              privilege?.includes("training-tab") ||
              privilege?.includes("inperson-tab") ||
              privilege?.includes("pops-tab") ||
              privilege?.includes("notes-tab") ||
              privilege?.includes("support-tab") ||
              privilege?.includes("email-tab") ||
              privilege?.includes("documents-tab") ||
              privilege?.includes("rfi-tab")))
            ? "link"
            : ""
        }
        onClick={() =>
          (user?.user_type === 0 ||
            (user?.user_type === 2 &&
              user?.sub_admin != "" &&
              (privilege?.includes("account-details") ||
                privilege?.includes("site-tab") ||
                privilege?.includes("contact-tab") ||
                privilege?.includes("equipment-tab") ||
                privilege?.includes("training-tab") ||
                privilege?.includes("inperson-tab") ||
                privilege?.includes("pops-tab") ||
                privilege?.includes("notes-tab") ||
                privilege?.includes("support-tab") ||
                privilege?.includes("email-tab") ||
                privilege?.includes("documents-tab") ||
                privilege?.includes("rfi-tab")))) &&
          navigate(`/account-details/${account.parent_account_id}`, {
            state: {
              siteTitle: "Account: " + account?.parent_name,
              editUrl: `/account/accounts-edit/${account?.parent_account_id}`,
              deleteUrl: `/account/accounts-delete/${account?.parent_account_id}`,
            },
          })
        }
        role="button"
      >
        {account.parent_name}
      </span>
    );
  };

  const RenderDistributer = (account) => {
    return (
      <span
        className={
          user?.user_type === 0 ||
          (user?.user_type === 2 &&
            user?.sub_admin != "" &&
            (privilege?.includes("account-details") ||
              privilege?.includes("site-tab") ||
              privilege?.includes("contact-tab") ||
              privilege?.includes("equipment-tab") ||
              privilege?.includes("training-tab") ||
              privilege?.includes("inperson-tab") ||
              privilege?.includes("pops-tab") ||
              privilege?.includes("notes-tab") ||
              privilege?.includes("support-tab") ||
              privilege?.includes("email-tab") ||
              privilege?.includes("documents-tab") ||
              privilege?.includes("rfi-tab")))
            ? "link"
            : ""
        }
        onClick={() =>
          (user?.user_type === 0 ||
            (user?.user_type === 2 &&
              user?.sub_admin != "" &&
              (privilege?.includes("account-details") ||
                privilege?.includes("site-tab") ||
                privilege?.includes("contact-tab") ||
                privilege?.includes("equipment-tab") ||
                privilege?.includes("training-tab") ||
                privilege?.includes("inperson-tab") ||
                privilege?.includes("pops-tab") ||
                privilege?.includes("notes-tab") ||
                privilege?.includes("support-tab") ||
                privilege?.includes("email-tab") ||
                privilege?.includes("documents-tab") ||
                privilege?.includes("rfi-tab")))) &&
          navigate(`/account-details/${account.distributor_id}`, {
            state: {
              siteTitle: "Account: " + account?.distributor_name,
              editUrl: `/account/accounts-edit/${account?.distributor_id}`,
              deleteUrl: `/account/accounts-delete/${account?.distributor_id}`,
            },
          })
        }
        role="button"
      >
        {account.distributor_name}
      </span>
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchInput.length > 0) {
      setShowSearchReset(true);
      handleSetSearch(e.target.search.value);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.trim() === "" && value.endsWith(" ")) {
      return;
    }
    setSearchInput(value);
  };

  return (
    <div className="bg-light base-table">
      <Form onSubmit={handleSearch}>
        <div className="" style={{ display: "flex", gap: 5 }}>
          <input
            name="search"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Search by keywords..."
            className="form-control w-25"
          />
          <BButton variant="primary" type="submit">
            Search
          </BButton>

          {showSearchReset && (
            <BButton
              onClick={() => {
                handleReset();
                setSearchInput("");
              }}
              variant="danger"
              type="button"
            >
              Reset
            </BButton>
          )}
        </div>
      </Form>
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table table-bordered table-hover"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <td
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ width: column.width, backgroundColor: "#999" }}
                    className="tb-td"
                  >
                    <div className="d-flex align-items-center th-d">
                      {column.render("Header")}
                      <span className="ml-1">
                        {!column.disableSortBy && // Only show icon if sorting is not disabled
                          (column.isSorted ? (
                            column.isSortedDesc ? (
                              <SouthIcon size={2} />
                            ) : (
                              <NorthIcon size={2} />
                            )
                          ) : (
                            <SouthIcon size={2} /> // Default icon if not sorted
                          ))}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {showLoading ? (
              [...Array(15)].map((_, i) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td
                      key={j}
                      style={{
                        backgroundColor: i % 2 === 0 ? "white" : "#e4e4e4",
                      }}
                      className="tb-td"
                    >
                      <Skeleton
                        width={"90%"}
                        height={50}
                        style={{ margin: "10px" }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : tableData?.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontStyle: "italic",
                    color: "grey",
                  }}
                >
                  No data found
                </td>
              </tr>
            ) : (
              page?.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          backgroundColor: i % 2 === 0 ? "white" : "#e4e4e4",
                        }}
                        className="tb-td"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 d-flex justify-content-end align-items-center">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="btn btn-light mx-1"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{background: "#dad7d763"}}
                >
                  &lt;
                </button>
              </li>
              {currentPage > 3 && (
                <>
                  <li className="page-item">
                    <button
                      className="btn btn-light mx-1"
                      onClick={() => onPageChange(1)}
                    >
                      1
                    </button>
                  </li>
                  <li className="page-item">
                    <span className="mx-1">...</span>
                  </li>
                </>
              )}
              {[...Array(5)].map((_, idx) => {
                const pageNumber = currentPage - 2 + idx;
                return pageNumber > 0 && pageNumber <= totalPages ? (
                  <li key={pageNumber} className="page-item">
                    <button
                      className={`btn mx-1 ${
                        currentPage === pageNumber ? "btn-primary" : "btn-light"
                      }`}
                      onClick={() => onPageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ) : null;
              })}
              {currentPage < totalPages - 2 && (
                <>
                  <li className="page-item">
                    <span className="mx-1">...</span>
                  </li>
                  <li className="page-item">
                    <button
                      className="btn btn-light mx-1"
                      onClick={() => onPageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                </>
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="btn btn-light mx-1"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{background: "#dad7d763"}}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
