import React from 'react';
import { NavLink } from 'react-router-dom';
import "./SideBar.css";

const SideBar = () => {
    return (
        <nav className="side-bar">
            <ul className="side-bar-ul">
                <li><NavLink to="/employee" activeClassName="active">Employee</NavLink></li>
                <li><NavLink to="/lab" activeClassName="active">Lab</NavLink></li>
                <li><NavLink to="/contact" activeClassName="active">Login</NavLink></li>
            </ul>
        </nav>
    );
};

export default SideBar;