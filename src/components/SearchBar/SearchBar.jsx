import React from "react";


const SearchBar = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setCurrentPage(0);
        }
    };
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;