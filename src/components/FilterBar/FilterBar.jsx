import React, { useState, useRef, useEffect } from "react";
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchableDropDown from "../SearchableDropDown/SearchableDropDown";
import { labMasterDropDownSearchURL } from "../Config/config";

const FilterBar = ({ filterConfigs, applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [errors, setErrors] = useState({});

  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      const isDropdownElement = event.target.closest('.options-list');
      if (!isDropdownElement) {
        closeMenu();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const handleItemClick = (item) => {
    if (openSubmenu === item) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(item);
    }
  };

  const handleSubmenuItemClick = (selectedOption, submenu) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [submenu]: selectedOption,
    }));
    console.log(`Selected in ${submenu}: ${selectedOption.name}`);
  };

  const countActiveFilters = () => {
    return Object.keys(filters).length;
  };

  const handleApply = () => {
    setSelectedFilters(filters);
    applyFilter(filters);
    closeMenu();
  };

  const handleReset = () => {
    setFilters({});
    setSelectedFilters({});
    applyFilter({});
    closeMenu();
  };

  const handleDropdownError = (name, error) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error ? `${name} is required.` : '',
    }));
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button className="filter-dropdown-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faFilter} />
        Filter{countActiveFilters() > 0 && ` (${countActiveFilters()})`}
      </button>
      {isOpen && (
        <div className="filter-dropdown-content animate-enter">
          {filterConfigs.map((config) => (
            <div className="content-div" key={config.name}>
              <button onClick={() => handleItemClick(config.name)}>{config.name}</button>
              {openSubmenu === config.name && (
                <div className="submenu-items animate-enter">
                  <SearchableDropDown
                    placeholder={config.placeholder}
                    url={config.url}
                    name={config.name}
                    onChange={(selectedOption) => handleSubmenuItemClick(selectedOption, config.name)}
                    onError={(error) => handleDropdownError(config.name, error)}
                  />
                </div>
              )}
            </div>
          ))}
          <div className="selected-filter">
            <span>Selected Filters</span>
            {Object.entries(selectedFilters).map(([key, value]) => (
              <div key={key}>
                <span>{key}</span>
                <span>{value.name}</span> {/* Displaying the name of the selected filter */}
              </div>
            ))}
          </div>
          <div className="end-btns">
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
