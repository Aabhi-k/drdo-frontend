import React, { useState, useRef, useEffect } from "react";
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchableDropDown from "../SearchableDropDown/SearchableDropDown";

const FilterBar = ({ filterConfigs, applyFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [errors, setErrors] = useState({});
  const [displayValue, setDisplayValue] = useState({});
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.options-list')) {
      closeMenu();
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

  const handleItemClick = (item) => setOpenSubmenu(openSubmenu === item ? null : item);
  const handleSubmenuItemClick = (e) => {
    const { name, value, label } = e.target;
    console.log(name, value, label);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setDisplayValue((prevDisplay) =>({...prevDisplay,[name]: label}));
    
  };

  const handleDropdownError = (name, error) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error ? `${name} is required.` : '',
    }));
  };

  const countActiveFilters = () => Object.keys(selectedFilters).length;

  const handleApply = () => {
    if (Object.values(errors).some(error => error)) {
      alert("Please resolve the errors before applying the filters.");
      return;
    }
    setSelectedFilters(displayValue);
    applyFilter(filters);
    closeMenu();
  };

  const handleReset = () => {
    setFilters({});
    setSelectedFilters({});
    setDisplayValue({});
    setErrors({});
    applyFilter({});
    closeMenu();
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button className="filter-dropdown-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faFilter} />
        Filter{countActiveFilters() > 0 && ` (${countActiveFilters()})`}
      </button>
      {isOpen && (
        <div className="filter-dropdown-content animate-enter">
          {filterConfigs.map(config => (
            <div className="content-div" key={config.name}>
              <button onClick={() => handleItemClick(config.name)}>{config.name}</button>
              {openSubmenu === config.name && (
                <div className="submenu-items animate-enter">
                  <SearchableDropDown
                    placeholder={config.placeholder}
                    url={config.url}
                    name={config.name}
                    onChange={handleSubmenuItemClick}
                    onError={(error) => handleDropdownError(config.name, error)}
                  />
                  {errors[config.name] && <div className="error-message">{errors[config.name]}</div>}
                </div>
              )}
            </div>
          ))}
          <div className="selected-filter">
            <span>Selected Filters</span>
            {Object.entries(selectedFilters).map(([name, label]) => (
              <div key={name}>
                <span>{name} : </span>
                <span>{label}</span> {/* Displaying the name of the selected filter */}
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
