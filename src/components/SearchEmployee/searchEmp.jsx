import React, { useState, useEffect, useCallback } from "react";
import { searchEmp } from "../../services/EmployeeList";

const SearchEmp = ({ onSearchResults }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
    const handleSearch = useCallback(async () => {
      try {
        const results = await searchEmp(searchTerm);
        onSearchResults(results);
      } catch (error) {
        console.error("Error searching employees:", error);
      }
    }, [searchTerm, onSearchResults]); // Only re-create handleSearch on searchTerm or onSearchResults change
  
    useEffect(() => {
      const timeOut = setTimeout(() => {
        if (searchTerm !== debouncedSearchTerm) {
          setDebouncedSearchTerm(searchTerm);
          handleSearch();
        }
      }, 500); // Adjust timeout as needed
  
      return () => clearTimeout(timeOut);
    }, [searchTerm]); // Re-run only on searchTerm change
  
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
  
  export default SearchEmp;