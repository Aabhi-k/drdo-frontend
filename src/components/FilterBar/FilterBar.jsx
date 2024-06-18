import React, { useState, useRef, useEffect } from "react";
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import SearchableDropDown from "../SearchableDropDown/SearchableDropDown";
import { labMasterDropDownSearchURL } from "../Config/config";

const FilterBar = ({ filterConfigs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [filters, setFilters] = useState({});
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

  const handleItemClick = (item) => {
    if (openSubmenu === item) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(item);
    }
  };
  const handleSubmenuItemClick = (subItem, submenu) => { // Include submenu as argument
    setFilters((prevFilters) => ({
      ...prevFilters,
      [submenu]: subItem,
    }));
    console.log(`Selected in ${submenu}: ${subItem}`); // Optional logging
  };


  const handleApply = () => {

    closeMenu(); // Close the menu after applying
  };

  const countActiveFilters = () => {
    return Object.values(filters).filter(value => value).length;
  };


  const handleReset = () => {
    setFilters({});
    closeMenu();
  };
  const handleChange = () => {
    console.log("Change detected");
  }

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button className="filter-dropdown-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faFilter} /> 
        Filter{countActiveFilters() > 0 && ` (${countActiveFilters()})`}
      </button>
      {isOpen &&
        (<div
          className={`filter-dropdown-content ${isOpen ? "animate-enter" : ""
            }`}
        >
          {filterConfigs.map((config) => (
            <div className="content-div" key={config.name}>
              <button onClick={() => handleItemClick(config.name)}>{config.name}</button>

              {openSubmenu === config.name && (
                <div className={`submenu-items ${isOpen ? "animate-enter" : ""}`}>

                  <SearchableDropDown
                    placeholder={config.placeholder}
                    url={config.url}
                    name={config.name}
                    value={config.value}
                    onChange={(e) => handleSubmenuItemClick(config.name, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
          {isOpen && (
            <div className="end-btns">
              <button onClick={handleReset}>Reset</button>
              <button onClick={handleApply}>Apply</button>
            </div>
          )}
        </div>
        )
      }
    </div>
  );
};

export default FilterBar;
