import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchableDropDown = ({placeholder, url, name, value, onChange}) => {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm) {
            const fetchOptions = async () => {
                try {
                    const response = await axios.get(url, {
                        params: { query: searchTerm }
                    });
                    setOptions(response.data);
                } catch (error) {
                    console.error("Error fetching options:", error);
                }
            };
            fetchOptions();
        }
    }, [searchTerm, url]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onChange({ target: { name, value: e.target.value } });
    };

    const handleOptionSelect = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
        setSearchTerm('');
    };

    return (
        <div className="searchable-dropdown">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
            {searchTerm && options.length > 0 && (
                <ul className="options-list">
                    {options.map(option => (
                        <li key={option.id} onClick={() => handleOptionSelect(option.name)}>
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


export default SearchableDropDown;