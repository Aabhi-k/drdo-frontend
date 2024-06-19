import React from "react";

import './UserLogin.css';

import SearchableDropDown from "../SearchableDropDown/SearchableDropDown";
import Heading from "../Heading/Heading";

const UserLogin = () => {
    return(
        <div className="login-page">
           <Heading name = {"Login"}/>
            <div className="login-form">
                <form>
                    <SearchableDropDown
                    placeholder="Lab"
                    url="http://localhost:8080/api/v1/users/search"
                    name="lab"
                    value=""
                    onChange={() => {}}
                    />
                    <input type="text" placeholder="Password" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        </div>
    );
};

export default UserLogin;