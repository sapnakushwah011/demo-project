import React, { useState, useEffect, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
// import axios from "axios";
import debounce from 'lodash/debounce';
import { BASE_API } from "./Common"; 
import { Checkbox } from "@mui/material";

const cache = new Map();

export default function PaginateAutoComplete({
    dropDownName = "parent_account_id",
    apiEndpoint = "/account/parents-account-dropdowns",
    idKey = "account_id",
    valueKey = "account_main_contact_firstname",
    parentKey = "parentAccount",
    tokenKey = 'ross_token',
    useApiSearch = true,
    isCache = false,
    onSelect = () => {},
    shouldFetchOnOpen = true,
    className = 'styles.ddLabel',
    selectDisabled = false,
    defaultValue = null,
    multiple = false,
    placeholder = "-- Select One --",
    excludeRecords = [],
    customRenderOption = null,
    customGetOptionLabel = null,
    showCheckBox = false
}) {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (defaultValue) {
            const processedDefaultValue = multiple
                ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue])
                : defaultValue;
            setSelectedValue(processedDefaultValue);
            setData(prevData => {
                const newData = [...prevData];
                const valuesToAdd = Array.isArray(processedDefaultValue)
                    ? processedDefaultValue
                    : [processedDefaultValue];
                valuesToAdd.forEach(value => {
                    if (!newData.some(item => item[idKey] === value[idKey])) {
                        newData.push(value);
                    }
                });
                return newData;
            });
        } else {
            setSelectedValue(multiple ? [] : null);
        }
    }, [multiple, idKey, defaultValue]);

    const fetchData = useCallback(async (searchText = "", pageNum = 1) => {
        const cacheKey = `${apiEndpoint}-${parentKey}-${pageNum}-${searchText}`;
        
        if (isCache && cache.has(cacheKey)) {
            const cachedData = cache.get(cacheKey);
            setData(prevData => [...prevData, ...cachedData.data]);
            setTotalCount(cachedData.totalCount);
            return;
        }

        setLoading(true);
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscGhhbGtlMTIzQGdtYWlsLmNvbSIsIm5hbWUiOiJSYWh1bCBQaGFsa2UiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfZWRpdCI6ZmFsc2UsInBvc2l0aW9uIjoiIiwiYWNjb3VudF9pZCI6MCwidXNlcl90eXBlIjowLCJjb250YWN0X2lkIjowLCJ1c2VySUQiOjEsImlhdCI6MTcyNTcwNjc5NSwiZXhwIjoxNzI1NzEzOTk1fQ.kwL6eiQQz4EYFdq4Qa7_7hszvtn2rE8eOZwSbtVlZ8U"
        try {
            const response = await fetch(`${BASE_API}${apiEndpoint}?search=${searchText}&page=${pageNum}&pageSize=20`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            const responseData = await response.json();
            const resultData = responseData?.data?.[parentKey]?.data || [];
            const totalCountRes = responseData?.data?.[parentKey]?.totalCount || 0;
    
            if (resultData.length > 0) {
                const cachingData = {
                    data: resultData,
                    totalCount: totalCountRes
                };
                cache.set(cacheKey, cachingData);
                setData(prevData => [...prevData, ...resultData]);
                setTotalCount(totalCountRes);
            } else {
                setData([]);
                setTotalCount(0);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint, parentKey, isCache, tokenKey]);

    useEffect(() => {
        // console.log({shouldFetchOnOpen,open})
        if (shouldFetchOnOpen) {
            fetchData('', 1);
        }
    }, [fetchData, shouldFetchOnOpen]);
    
    // useEffect(()=>{
    //     if(open){
    //         fetchData('', 1);
    //     }
    // },[fetchData,open])

    const handleChange = (event, value) => {
        setSelectedValue(value);
        onSelect({
            target: {
                name: dropDownName,
                value: multiple ? value.map(v => v[idKey]) : value?.[idKey] || "",
                formatted: multiple ? value.map(v => ({label: v[valueKey],  value:v[idKey]})) : value?.[idKey]
            }
        }, value);
    };

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (useApiSearch) {
                setSearch(term);
                setPage(1);
                setData([]);
                fetchData(term, 1);
            }
        }, 300),
        [fetchData, useApiSearch]
    );

    const handleScroll = (event) => {
        //  total pages is not available that's why didn't stop to load the values 
        //  we can fix this bug after using total result counts in the each and every api inside the dropdown's

        const listbox = event.currentTarget;
        if (listbox.scrollHeight - listbox.scrollTop <= listbox.clientHeight + 1) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(search, nextPage);
        }
    };

    const removeDuplicates = (arr) => {
        const uniqueObjects = arr.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t?.[idKey] === item?.[idKey] 
          ))
        );
        
        return uniqueObjects;
    };

    const filteredOptions = useMemo(() => {
        const arr = data.filter(item => !excludeRecords.includes(item[idKey]));
        return removeDuplicates(arr);
    }, [data, excludeRecords, idKey]);

    const defaultRenderOption = (props, option, { selected }) => (
        <Box
            component="li"
            key={option[idKey]}
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            className={`text-black py-1 ${showCheckBox ? 'px-1' : 'px-3'}  cursor-pointer render-option`}
        >   
            {showCheckBox && 
                <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
            }
            {option[valueKey]}
        </Box>
    );

    const defaultGetOptionLabel = (option) => option[valueKey] || "";

    const handleInputChange = (event, value, reason) => {
        if (reason === 'input') {
            debouncedSearch(value);
        } else if (reason === 'clear') {
            setSearch("");
            setData([]);
            setPage(1);
            if (shouldFetchOnOpen) {
                fetchData('', 1);
            }
        }
    };

    return (
        <Autocomplete
            multiple={multiple}
            className={`autocomplete-select-101 ${className}`}
            loading={loading}
            id={`Demo-${dropDownName}`}
            name={dropDownName}
            autoHighlight
            disableListWrap
            value={selectedValue}
            options={filteredOptions}
            getOptionLabel={customGetOptionLabel || defaultGetOptionLabel}
            isOptionEqualToValue={(option, value) => option[idKey] === value[idKey]}
            onChange={handleChange}
            onInputChange={handleInputChange}
            renderOption={customRenderOption || defaultRenderOption}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder={multiple ? (selectedValue.length ? '' : placeholder) : placeholder}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password"
                    }}
                    InputProps={{
                        ...params.InputProps,
                        sx: {
                            width:'100%',
                            height: multiple ? "auto" : '37.3px', 
                            padding: '0px',
                        }
                    }}
                />
            )}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                    <Chip
                        label={customGetOptionLabel ? customGetOptionLabel(option) : option[valueKey]}
                        {...getTagProps({ index })}
                        key={option[idKey]}
                    />
                ))
            }
            ListboxProps={{
                onScroll: handleScroll
            }}
            disabled={selectDisabled}
            onOpen={() => {
                setOpen(true)
                fetchData('', 1);
            }}
            onClose={() => setOpen(false)}
        />
    );
}