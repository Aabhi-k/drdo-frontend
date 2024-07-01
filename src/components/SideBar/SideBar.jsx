import React from 'react';
import { NavLink } from 'react-router-dom';
import "./SideBar.css";
import { getRoleFromToken } from '../../services/login';

import emp from "../../imgs/employee.png";
import lab from "../../imgs/lab.png";
import lgout from "../../imgs/logout.png";

const SideBar = ({logout}) => {

    const roles = getRoleFromToken();

    const isSuperAdmin = roles.includes("SUPER ADMIN");


    

    return (
        <nav className="side-bar">
            <ul className="side-bar-ul">
                <li><NavLink to="/employee" ><img src= {emp} alt="Employeess" width={32} /></NavLink></li>
                <li><NavLink to="/lab" ><img src= {lab} width={32} alt="lab" /></NavLink></li>
                {isSuperAdmin && (
                    <li><NavLink to="/admin" >Admin Panel</NavLink></li>
                )}
            </ul>
            <button onClick={logout}><img src={lgout} alt="Logout" width={32} /></button>
        </nav>
    );
};

export default SideBar;