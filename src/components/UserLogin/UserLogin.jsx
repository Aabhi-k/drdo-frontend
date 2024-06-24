import React, { useState } from "react";
import './UserLogin.css';
import SearchableDropDown from "../SearchableDropDown/SearchableDropDown";
import Heading from "../Heading/Heading";
import { labMasterDropDownSearchURL } from "../Config/config";

const UserLogin = () => {
    const [userData, setUserData] = useState({ lab: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDropdownError = (name, error) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error ? `${name} is required.` : '',
        }));
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!userData.lab) validationErrors.lab = 'Lab is required.';
        if (!userData.password.trim()) validationErrors.password = 'Password is required.';
        return validationErrors;
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log(userData);
            // Add login logic here
        }
    };

    return (
        <div className="login-page">
            <Heading name="Login" />
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <SearchableDropDown
                        className="searchable-dropdown"
                        placeholder="Lab"
                        url={labMasterDropDownSearchURL}
                        name="lab"
                        onChange={handleChange}
                        onError={(error) => handleDropdownError("lab", error)}
                    />
                    {errors.lab && <span className="error">{errors.lab}</span>}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <button className="submit-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
