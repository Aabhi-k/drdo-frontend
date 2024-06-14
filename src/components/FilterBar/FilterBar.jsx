import React, { useState } from "react";
import './FilterBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filterOptions = [ // Replace with your actual table headers
    { value: 'labName', label: 'Lab Name' },
    { value: 'city', label: 'City' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <div className="filter-bar">
      <button className="filter-btn" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faFilter} /> Filter {selectedFilter ? `(${selectedFilter})` : ''}
      </button>
      {isOpen && (
        <ul className="filter-dropdown">
          {filterOptions.map((option) => (
            <li key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="filter"
                value={option.value}
                checked={selectedFilter === option.value}
                onChange={handleFilterChange}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterBar;
