import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './UserLogin.css';
import SearchableDropDown from "../SearchableDropDown/SearchableDropDown";
import Heading from "../Heading/Heading";
import { labMasterDropDownSearchURL } from "../Config/config";
import { loginUser } from "../../services/login";

const UserLogin = ({ onLogin }) => {
    const [userData, setUserData] = useState({ labId: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear errors when user starts typing again
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleDropdownError = (name, error) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error ? `${name} is required.` : '',
        }));
    };

    const validateForm = () => {
        const validationErrors = {};
        if (!userData.labId) validationErrors.labId = 'Lab ID is required.';
        if (!userData.password.trim()) validationErrors.password = 'Password is required.';
        return validationErrors;
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await loginUser(userData);
                console.log("Login successful!");
                onLogin(true);
                <Navigate to="/employee" />
            } catch (error) {
                console.error("Login error:", error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page">
            <Heading name="Login" />
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <SearchableDropDown
                        className="searchable-dropdown"
                        placeholder="Lab name"
                        url={labMasterDropDownSearchURL}
                        name="labId"
                        onChange={handleChange}
                        onError={(error) => handleDropdownError("labId", error)}
                    />
                    
                    {errors.labId && <span className="error">{errors.labId}</span>}
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                    <button className="submit-btn" type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;
