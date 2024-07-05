import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import EditEmployee from './components/EmployeeData/EmployeeDetails/EditEmployee';

const validPaths = [
    "/login",
    "/employee",

    "/employee/create",
    "/employee/details/:id",
    "/employee/edit/:id",

    "/employee/designation",
    "/employee/designation/create",
    "/employee/designation/details/:id",
    "/employee/designation/edit/:id",

    "/lab",
    "/lab/create",
    "/lab/details/:id",
    
];

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roles, setRoles] = useState('');
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !checkTokenExpiration(token)) {
            setAuthToken(token)
            setIsAuthenticated(true);
            setRoles(getRoleFromToken())
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        setIsSuperAdmin(roles.includes("SUPER ADMIN"));
    }, [roles]); // Depend on roles
    

    // Handle login success
    const handleLogin = () => {

        setIsAuthenticated(true);
    };
    if(isLoading) return (<div>Loading...</div>);

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
                            <Route path="/employee/details/:id" element={<EmployeeDetails />} />
                            <Route path="/employee/edit/:id" element={<EditEmployee />} />
                            <Route path="/lab" element={<LabList />} />
                            <Route path="/lab/create" element={<CreateLabList />} />
                            {/* {isSuperAdmin && <Route path="/admin" element={<AdminPanel />} />} */}

                        </Route>

                    </Routes>
                    <RouteHandler isAuthenticated={isAuthenticated} validPaths={validPaths} />

                </div>
            </div>
        </Router>
    );
}

const ConditionalSidebar = ({ isAuthenticated, setIsAuthenticated }) => {
    // Handle logout
    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    };
    if (!isAuthenticated) {
        return null; // Hide sidebar on login page
    }

    return <SideBar logout={handleLogout} />;
};

const RouteHandler = ({ isAuthenticated, validPaths }) => {
    let location = useLocation();
    let path = location.pathname;

    // Check if the current path is valid
    if (!validPaths.includes(path) && !validPaths.some(validPath => path.match(new RegExp(`^${validPath.replace(/:\w+/, "\\w+")}$`)))) {
        // Redirect based on authentication status
        return isAuthenticated ? <Navigate to="/employee" /> : <Navigate to="/login" />;
    }
    // No redirection needed
    return null;
};

export default App;
