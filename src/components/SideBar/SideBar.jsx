import React from 'react';
import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import emp from "../../imgs/employee.png";
import lab from "../../imgs/lab.png";
const SideBar = () => {
    return (
        <nav className="side-bar">
            <ul className="side-bar-ul">
                <li><NavLink to="/employee" ><img src= {emp} alt="Employeess" width={32} /></NavLink></li>
                <li><NavLink to="/lab" ><img src= {lab} width={32} alt="lab" /></NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
        </nav>
    );
};

export default SideBar;