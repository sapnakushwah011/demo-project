import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Spinner, Button, Overlay, Tooltip } from 'react-bootstrap';
// import axios from 'axios';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import { BASE_API } from "./Common"
import _ from 'lodash';

const cache = new Map();

const GlobalDropdown = ({
  apiEndpoint,
  dropDownName="select",
  parentKey = "",
  idKey = 'id',
  valueKey = 'value',
  isSearchable = false,
  initialSelectedValue = null,
  options = null,
  isMulti = false,
  placeholder = '--Select One--',
  customRender = null,
  groupBy = null,
  isAsync = false,
  pageSize = 20,
  onSelect,
  disabled = false,
  isCache = false,
  tokenKey = 'ross_token',
  isRequired = false,
  minSelection = 0,
  maxSelection = Infinity,
  customValidation = null,
  i18nPrefix = 'dropdown',
  shouldFetchOnOpen = false,  // Add this prop to control API call on open
  className="",
  defaultValue={},
  selectDisabled=false,
  requiredMsg="Please Select Brand."
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [validationError, setValidationError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
    useEffect(()=>{
        if(initialSelectedValue){
            setSelectedValue(initialSelectedValue);
        }
    },[initialSelectedValue])

    useEffect(()=>{
      
      if(!_.isEmpty(defaultValue) && defaultValue?.value){
          // arIndex == -1 && 
          // console.log({MSg: "View Are Inside the Condition"})

          if( idKey === 'pad_type_id'){
    
          }


          if(data.length===0){
            const obj = {};
            
            obj[idKey]    = defaultValue?.id;
            obj[valueKey] = defaultValue?.value;
            setData([obj]);
          }
      }
    },[defaultValue])

 const fetchData = useCallback(async (search = '', page = 1) => {
        if (options) {
          setData(options);
          return;
        }
      
        const cacheKey = `${apiEndpoint}-${search}-${page}-${parentKey}`;
        if (isCache && cache.has(cacheKey)) {
          setData(cache.get(cacheKey));
          return;
        }
      
        setLoading(true);
        try {
          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscGhhbGtlMTIzQGdtYWlsLmNvbSIsIm5hbWUiOiJSYWh1bCBQaGFsa2UiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfZWRpdCI6ZmFsc2UsInBvc2l0aW9uIjoiIiwiYWNjb3VudF9pZCI6MCwidXNlcl90eXBlIjowLCJjb250YWN0X2lkIjowLCJ1c2VySUQiOjEsImlhdCI6MTcyNTcwNjc5NSwiZXhwIjoxNzI1NzEzOTk1fQ.kwL6eiQQz4EYFdq4Qa7_7hszvtn2rE8eOZwSbtVlZ8U'
          if (!token) {
            throw new Error(t(`${i18nPrefix}.noToken`));
          }
      
          const response = await fetch(`${BASE_API}${apiEndpoint}?search=${search}&page=${page}&pageSize=${pageSize}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (!response.ok) {
            throw new Error(t(`${i18nPrefix}.fetchError`));
          }
      
          const data = await response.json();
          const resultData = parentKey ? data?.data?.[parentKey] : data?.data;
          
          if (resultData) {
            setData(resultData);
            if (isCache) {
              cache.set(cacheKey, resultData);
            }
          }
      
          setError(null);
        } catch (err) {
          setError(err.message || t(`${i18nPrefix}.fetchError`));
        } finally {
          setLoading(false);
        }
      }, [apiEndpoint, options, pageSize, isCache, t, i18nPrefix, parentKey]);

  useEffect(() => {
    if (!shouldFetchOnOpen) {
      fetchData(searchTerm, page);
    }
    // fetchData, searchTerm, page,
  }, [ shouldFetchOnOpen,apiEndpoint]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      setPage(1);
      setData([]); // Clear existing data when searching
    }, 300),
    []
  );

  const handleChange = (event) => {
    const value = isMulti
      ? Array.from(event.target.selectedOptions, option => option.value)
      : event.target.value;
    setSelectedValue(value);
    onSelect(event,value);
    validateSelection(value);
  };

  const handleSearch = (event) => {
    debouncedSearch(event.target.value);
  };

  const handleClear = () => {
    setSelectedValue(isMulti ? [] : '');
    onSelect(isMulti ? [] : '');
    validateSelection(isMulti ? [] : '');
  };

  const validateSelection = (value) => {
    if (isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
      setValidationError(t(`${i18nPrefix}.required`));
    } else if (isMulti && value.length < minSelection) {
      setValidationError(t(`${i18nPrefix}.minSelection`, { count: minSelection }));
    } else if (isMulti && value.length > maxSelection) {
      setValidationError(t(`${i18nPrefix}.maxSelection`, { count: maxSelection }));
    } else if (customValidation) {
      const customError = customValidation(value);
      setValidationError(customError);
    } else {
      setValidationError(null);
    }
  };

  const renderOptions = () => {
    let renderedOptions = Array.isArray(data) ? data : [];

    if (groupBy) {
      const groups = renderedOptions.reduce((acc, item) => {
        const groupName = item[groupBy] || 'Ungrouped';
        if (!acc[groupName]) {
          acc[groupName] = [];
        }
        acc[groupName].push(item);
        return acc;
      }, {});

      return Object.entries(groups).map(([groupName, groupItems]) => (
        <optgroup key={groupName} label={groupName}>
          {groupItems.map(item => (
            customRender  ? customRender(item,idKey,valueKey)  : 
            <option key={item[idKey]} value={item[idKey]} disabled={item.disabled}>
              {/* {customRender ? customRender(item) : item[valueKey]} */}
              {item[valueKey]}
            </option>
          ))}
        </optgroup>
      ));
    }

    // return renderedOptions.map(item => (
    //   <option key={item[idKey]} value={item[idKey]} disabled={item?.disabled}>
    //     {customRender ? customRender(item) : item[valueKey]}
    //   </option>
    // ));

    return renderedOptions.map(item =>  customRender  ? customRender(item,idKey,valueKey)  : 
    <option key={item[idKey]} value={item[idKey]} disabled={item.disabled}>
      {item[valueKey]}
    </option>)
  };

  const handleFocus = () => {
    setIsOpen(true);
    // if (shouldFetchOnOpen && (data.length === 0 || data.length === 1)) {
      if (shouldFetchOnOpen) {
      fetchData(searchTerm, page);
    }
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{position:'relative'}}>
      {isSearchable && (
        <Form.Control
          type="text"
          placeholder={t(`Search`)}
          onChange={handleSearch}
          className="mb-2"
        />
      )}
      <div className="d-block">
        <Form.Select
          name={dropDownName}
          value={selectedValue}
          onChange={handleChange}
          multiple={isMulti}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={` ${className} flex-grow-1 ${isOpen ? 'shadow-md' : ''}`}
          style={{ transition: 'box-shadow 0.3s ease' }}
          required={isRequired}
        >
          <option value="" disabled={selectDisabled} selected >{t(`${placeholder}`)}</option>
          {loading ? <option value="" disabled >Loading...{data}</option>:renderOptions()}
        </Form.Select>
        
        <Form.Control.Feedback type="invalid">
                {requiredMsg}
              </Form.Control.Feedback>
      </div>
      {error && <div className="text-danger mt-2">{error}</div>}
      <Overlay target={dropdownRef.current} show={!!validationError} placement="bottom">
        {(props) => (
          <Tooltip id="validation-tooltip" {...props}>
            {validationError}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default GlobalDropdown;
