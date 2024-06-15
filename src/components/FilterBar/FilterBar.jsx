import React, { useState, useRef, useEffect } from "react";
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [selectedValues, setSelectedValues] = useState({}); // Object for multiple selections

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
    setSelectedValues({ ...selectedValues, [submenu]: subItem }); // Update specific key
    console.log(`Selected in ${submenu}: ${subItem}`); // Optional logging
  };
  
  const handleApply = () => {
    // Handle selected value here (e.g., send to backend, store in local storage)
    // console.log("Selected value:", selectedValue[item]); // Example usage
    closeMenu(); // Close the menu after applying
  };

  const handleReset = () => {
    setSelectedValues({});
    closeMenu();
  };


  const subMenuItems = {
    'Lab': ['Lab 1', 'Lab 2', 'Lab 3'],
    'City': ['City 1', 'City 2', 'City 3'],
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button className="filter-dropdown-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faFilter} /> Filter
      </button>
      {isOpen &&
        (

          <div
            className={`filter-dropdown-content ${isOpen ? "animate-enter" : ""
              }`}
          >
            {Object.keys(subMenuItems).map((item) => (
              <div className="content-div" key={item}>
                <button onClick={() => handleItemClick(item)}>{item}</button>
                {openSubmenu === item && (
                  <div className={`filter-submenu ${openSubmenu === item ? 'show' : ''}`}>
                    {subMenuItems[item].map((subItem) => (
                      <label key={subItem} className="radio-label">
                        <input
                          type="radio"
                          name="filter"
                          checked={selectedValues[item] === subItem}  
                          value={subItem}
                          onClick={() => handleSubmenuItemClick(subItem)}
                        />
                        {subItem}
                      </label>
                    ))}
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
