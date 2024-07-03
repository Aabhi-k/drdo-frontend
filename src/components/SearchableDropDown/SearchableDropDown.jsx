import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import './SearchableDropDown.css';
import { dropdownSearch } from "../../services/EmployeeList";

const SearchableDropDown = ({ placeholder, url, name, onChange, onError }) => {
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayValue, setDisplayValue] = useState('');
    const [isError, setIsError] = useState(false);
    const debounceTimeoutRef = useRef(null);
    const isSelectingRef = useRef(false);

    useEffect(() => {
        if (searchTerm) {
            const fetchOptions = async () => {

                const response = await dropdownSearch(url, searchTerm);
                setOptions(response);
            };

            // Debounce the fetch call
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = setTimeout(fetchOptions, 200);
        } else {
            setOptions([]);
        }
    }, [searchTerm, url]);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setDisplayValue(e.target.value);
        setIsError(false);
        onError(false); // Clear error state on input change
    };

    const handleOptionSelect = (option) => {
        isSelectingRef.current = true;
        setIsError(false);
        onError(false); 
        setDisplayValue(option.name);
        onChange({ target: { name, value: option.id, label: option.name } });
        setSearchTerm('');
        setOptions([]); 
        setTimeout(() => {
            isSelectingRef.current = false;
        }, 0);
    };

    const handleBlur = () => {
        // Only set the error state if there was user input
        if (!isSelectingRef.current && searchTerm.trim() !== "") {
            const selectedOption = options.find(option => option.name === displayValue);
            if (!selectedOption) {
                setIsError(true);
                onError(true); // Set error state on blur if no valid option is selected
                onChange({ target: { name, value: '' } });
            }
        }
    };

    return (
        <div className={`searchable-dropdown ${isError ? 'list-error' : ''}`}>
           <div className="input-icon-container">
            <input
                type="text"
                placeholder={placeholder}
                value={displayValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            <div className="dropdown-icon">▼</div> 
        </div>
            {searchTerm && options.length > 0 && (
                <ul className="options-list">
                    {options.map((option) => (
                        <li key={option.id} onMouseDown={() => handleOptionSelect(option)}>
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchableDropDown;
