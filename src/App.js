import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';
import SideBar from './components/SideBar/SideBar';

import EmployeeList from './components/EmployeeData/EmpMaster/EmployeeList';
import EmployeeDesignation from './components/EmployeeData/EmpDesignation/EmployeeDesignation';
import LabList from './components/LabData/LabList';
import CreateEmpList from './components/EmployeeData/EmpMaster/CreateEmpList';
import UserLogin from './components/UserLogin/UserLogin';
import { checkTokenExpiration } from './services/login';

function App() {
    localStorage.clear();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !checkTokenExpiration(token)) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Handle login success
    const handleLogin = () => {

        setIsAuthenticated(true);
    };


    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <ConditionalSidebar isAuthenticated={isAuthenticated} />
                <div className="content">
                    <Routes>
                    <Route 
                            path="/login" 
                            element={isAuthenticated ? <Navigate to="/employee" /> : <UserLogin onLogin={handleLogin} />} 
                        />

                        {/* Private routes */}
                        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                            {/* Employee */}
                            <Route path='/employee' element={<EmployeeList />} />
                            <Route path='/employee/create' element={<CreateEmpList />} />
                            <Route path='/employee/designation' element={<EmployeeDesignation />} />
                            {/* Lab */}
                            <Route path='/lab' element={<LabList />} />
                            <Route path='/lab/create' />

                        </Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const ConditionalSidebar = ({ isAuthenticated }) => {
    if (!isAuthenticated) {
        return null; // Hide sidebar on login page
    }

    return <SideBar />;
};

export default App;
