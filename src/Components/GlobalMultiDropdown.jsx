import React, { useState, useEffect, useCallback, useRef } from 'react';
import Select from 'react-select';
import { Overlay, Tooltip } from 'react-bootstrap';
// import axios from 'axios';
import debounce from 'lodash/debounce';
import { useTranslation } from 'react-i18next';
import { BASE_API } from './Common';
import _ from 'lodash';

const cache = new Map();

const GlobalMultiDropdown = ({
  apiEndpoint,
  dropDownName = "select",
  parentKey = "",
  idKey = 'id',
  valueKey = 'value',
  isSearchable = false,
  initialSelectedValue = null,
  options = null,
  isMulti = false,
  placeholder = 'Select...',
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
  shouldFetchOnOpen = true, // Changed to true by default
  className = "",
  defaultValue = {},
  selectDisabled = false,
  isMultiSelect = false,
  closeMenuSelect = true,
  prepareOptions=null,
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [validationError, setValidationError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasLoadedData = useRef(false);

  useEffect(() => {
    if (initialSelectedValue) {
      setSelectedValue(initialSelectedValue);
    }
  }, [initialSelectedValue]);

  useEffect(() => {
    if (!_.isEmpty(defaultValue)) {
      if (data.length === 0) {
        const obj = {};
        obj[idKey] = defaultValue?.id;
        obj[valueKey] = defaultValue?.value;
        setData([obj]);
      }
    }
  }, [defaultValue]);

  const fetchData = useCallback(async (search = '', page = 1) => {
    if (options) {
      setData(options);
      return;
    }
  
    const cacheKey = `${apiEndpoint}`;
    if (isCache && cache.has(cacheKey)) {
      setData(cache.get(cacheKey));
      return;
    }
  
    setLoading(true);
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscGhhbGtlMTIzQGdtYWlsLmNvbSIsIm5hbWUiOiJSYWh1bCBQaGFsa2UiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfZWRpdCI6ZmFsc2UsInBvc2l0aW9uIjoiIiwiYWNjb3VudF9pZCI6MCwidXNlcl90eXBlIjowLCJjb250YWN0X2lkIjowLCJ1c2VySUQiOjEsImlhdCI6MTcyNTg1NjkwNSwiZXhwIjoxNzI1ODY0MTA1fQ.NMnTr-Jci6hStGE9FwWpccrr1US1KgRgp5mfHc2xnc4'
      if (!token) {
        throw new Error(t(`${i18nPrefix}.noToken`));
      }
  
      const response = await fetch(`${BASE_API}${apiEndpoint}?pageSize=${pageSize}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const resultData = (parentKey ? data?.data?.[parentKey] : data?.data) || [];
      if (resultData) {
        setData(resultData);
        if (isCache) {
          cache.set(cacheKey, resultData);
        }
        hasLoadedData.current = true; // Mark data as loaded
      }
      setError(null);
    } catch (err) {
      setError(err.message || t(`${i18nPrefix}.fetchError`));
      console.log(error)
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, options, pageSize, isCache, tokenKey, t, i18nPrefix, parentKey]);
  

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      setPage(1);
      // setData([]); // Clear existing data when searching
    }, 300),
    []
  );

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onSelect(selectedOption);
    validateSelection(selectedOption);
  };

  const handleInputChange = (inputValue) => {
    debouncedSearch(inputValue);
  };

  const handleClear = () => {
    setSelectedValue(null);
    onSelect(null);
    validateSelection(null);
  };

  const validateSelection = (value) => {
    if (isRequired && (!value || (Array.isArray(value) && value.length === 0))) {
      setValidationError(t(`${i18nPrefix}.required`));
    } else if (isMulti && value && value.length < minSelection) {
      setValidationError(t(`${i18nPrefix}.minSelection`, { count: minSelection }));
    } else if (isMulti && value && value.length > maxSelection) {
      setValidationError(t(`${i18nPrefix}.maxSelection`, { count: maxSelection }));
    } else if (customValidation) {
      const customError = customValidation(value);
      setValidationError(customError);
    } else {
      setValidationError(null);
    }
  };

  const formatOptionLabel = ({ [valueKey]: value, [idKey]: id, ...rest }) => {
    return customRender ? customRender({ [valueKey]: value, [idKey]: id, ...rest }) : value;
  };

  const handleMenuOpen = () => {
    setIsOpen(true);
    if (shouldFetchOnOpen && !hasLoadedData.current) {
      fetchData(searchTerm, page);
    }
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const selectOptions = prepareOptions ? prepareOptions(data,idKey,valueKey) :  data.map(item => ({
    value: item[idKey],
    label: item[valueKey],
    isDisabled: item.disabled,
    ...item
  }));

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div className="d-flex">
        <Select
          name={dropDownName}
          value={selectedValue}
          onChange={handleChange}
          options={selectOptions}
          isMulti={isMultiSelect}
          isDisabled={disabled}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
          className={`${className} flex-grow-1 ${isOpen ? 'shadow-md' : ''}`}
          styles={{
            control: (base) => ({
              ...base,
              transition: 'box-shadow 0.3s ease',
              boxShadow: isOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : base.boxShadow
            })
          }}
          placeholder={t(`${placeholder}`)}
          isLoading={loading}
          isSearchable={isSearchable}
          onInputChange={handleInputChange}
          formatOptionLabel={formatOptionLabel}
          closeMenuOnSelect={closeMenuSelect}
        //   isClearable
        />
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

export default GlobalMultiDropdown;
