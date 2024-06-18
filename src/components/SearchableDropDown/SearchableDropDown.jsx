import React, { useEffect, useState } from "react";
import axios from "axios";
import './SearchableDropDown.css';
const SearchableDropDown = ({ placeholder, url, name, value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (searchTerm) {
            const fetchOptions = async () => {
                try {
                    const response = await axios.get(url, {
                        params: { query: searchTerm }
                    });
                    setOptions(response.data.content);
                } catch (error) {
                    console.error("Error fetching options:", error);
                }
            };
            fetchOptions();
        }
    }, [searchTerm, url]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setDisplayValue(e.target.value);
        onChange({ target: { name, value: e.target.value } });
    };

    const handleOptionSelect = (option) => {
        setDisplayValue(option.name);
        onChange({ target: { name, value: option.id } });
        setSearchTerm('');
    };

    return (
        <div className="searchable-dropdown">
            <input
                type="text"
                placeholder={placeholder}
                value={displayValue}
                onChange={handleInputChange}
            />
            {searchTerm && options.length > 0 && (
                <ul className="options-list">
                    {options.map(option => (
                        <li key={option.id} onClick={() => handleOptionSelect(option)}>
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchableDropDown;
