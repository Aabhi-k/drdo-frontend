import React, { useState, useEffect, useCallback } from "react";
import { searchEmp } from "../../services/EmployeeList";

const SearchBar = ({ onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
    const handleSearch = useCallback(async () => {
      if (!searchTerm) {
        onSearchResults(null);
        return;
      }
      try {
        const results = await searchEmp(searchTerm);
        onSearchResults(results);
      } catch (error) {
        console.error("Error searching employees:", error);
      }
    }, [searchTerm]); 
  
    useEffect(() => {
      const timeOut = setTimeout(() => {
        if (searchTerm !== debouncedSearchTerm) {
          setDebouncedSearchTerm(searchTerm);
          handleSearch();
        }
      }, 500); //  timeout as needed
  
      return () => clearTimeout(timeOut);
    }, [searchTerm]);
  
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };
  
  export default SearchBar;