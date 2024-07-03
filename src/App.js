import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { checkTokenExpiration, setAuthToken, getRoleFromToken } from './services/login';

import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import SideBar from './components/SideBar/SideBar';
import EmployeeList from './components/EmployeeData/EmpMaster/EmployeeList';
import EmployeeDesignation from './components/EmployeeData/EmpDesignation/EmployeeDesignation';
import LabList from './components/LabData/LabList';
import CreateEmpList from './components/EmployeeData/EmpMaster/CreateEmpList';
import UserLogin from './components/UserLogin/UserLogin';
import CreateLabList from './components/LabData/CreateLabList';
import EmployeeDetails from './components/EmployeeData/EmployeeDetails/EmployeeDetails';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roles, setRoles] = useState('');
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !checkTokenExpiration(token)) {
            setAuthToken(token)
            setIsAuthenticated(true);
            setRoles(getRoleFromToken())
            setIsSuperAdmin(roles.includes("SUPER ADMIN"))            
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    
    // Handle login success
    const handleLogin = () => {

        setIsAuthenticated(true);
    };


    // Handle logout


    return (
        <Router>
            <div className="App">
                <ConditionalSidebar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <div className="content">
                    <Routes>
                        <Route path="/login" element={isAuthenticated ? <Navigate to="/employee" /> : <UserLogin onLogin={handleLogin} />} />

                        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            
                            <Route path="/employee" element={<EmployeeList />} />
                            <Route path="/employee/create" element={<CreateEmpList />} />
                            <Route path="/employee/designation" element={<EmployeeDesignation />} />
                            <Route path="/lab" element={<LabList />} />
                            <Route path="/lab/create" element={<CreateLabList />} />
                            <Route path="/employee/details/:id" element={<EmployeeDetails />} />
                            {/* {isSuperAdmin && <Route path="/admin" element={<AdminPanel />} />} */}
                  
                        </Route>

                        <Route path="*" element={isAuthenticated ? <Navigate to="/employee" /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const ConditionalSidebar = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    };
    if (!isAuthenticated) {
        return null; // Hide sidebar on login page
    }

    return <SideBar logout={handleLogout} />;
};

export default App;
