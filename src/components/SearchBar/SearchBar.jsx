import React from "react";
import './SearchBar.css';
import searchIcon from "../../imgs/loupe.png";


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
            <img src= {searchIcon} alt="" className="search-img" />
            <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchBar;