import React, { useState, useEffect, useCallback } from "react";
import './EmployeeList.css';
import { useNavigate } from 'react-router-dom';

import { getEmpList, searchEmpMaster } from "../../../services/EmployeeList.js";
// Components
import Pagination from "../../Pagination/Pagination.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import menuBar from "../../../imgs/menu.png";
import FilterBar from "../../FilterBar/FilterBar.jsx";
import Heading from "../../Heading/Heading.jsx";
import { labMasterDropDownSearchURL, empDesignationDropDownSearchURL } from "../../Config/config.js";

const EmployeeList = () => {

    // Handling employee data
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const filterConfigs = [
        { name: 'Lab', placeholder: 'Lab...', url: labMasterDropDownSearchURL },
        { name: 'Designation', placeholder:'Designation...', url: empDesignationDropDownSearchURL},
    ];


    // Handling pages
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage] = useState(10);

    // Handling Searching terms
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');


    useEffect(() => {
        fetchData(currentPage, recordsPerPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    const fetchData = useCallback(async (pageNo, sizeNo, term) => {
        setIsLoading(true);
        setError(null);

        try {
            let result;
            if (term) {
                result = await searchEmpMaster(term, pageNo, sizeNo);
            } else {
                result = await getEmpList(pageNo, sizeNo);
            }
            setEmployees(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);


    const navigate = useNavigate();

    const handleCreateEmployee = () => {
        navigate('/employee/create');
    };

    const handleEditEmployee = () => {
        navigate('/employee/edit');
    };

    const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="emp-list">
            <Heading name={"Employee List"} />
            <div className="table-top">
                <FilterBar filterConfigs={filterConfigs} />
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setCurrentPage={setCurrentPage}
                />

                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <img src={menuBar} alt="" className="menu-bar-img" />
                    </button>

                    <div className="dropdown-content">
                        <button className="create-btn" onClick={handleCreateEmployee} >Create Employee</button>
                        <button>Edit Employee</button>
                    </div>
                </div>

            </div>
            {error && <p>Error: {error.message}</p>}


            <DataTable employees={employees} error={error} isLoading={isLoading} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />


        </div>
    );
};

// emp table
const DataTable = ({ employees, error, isLoading }) => {
    return (
        <table className="empTable">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Title</th>
                    <th>Designation</th>
                    <th>Office Room</th>
                    <th>Lab Name</th>
                    <th>Additional Designation</th>
                </tr>
            </thead>
            <tbody>

                {employees && employees.length > 0 && employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.empFirstName}</td>
                        <td>{employee.empLastName}</td>
                        <td>{employee.empTitle}</td>
                        <td>{employee.designShortName}</td>
                        <td>{employee.officeRoomNo}</td>
                        <td>{employee.labFullName}</td>
                        <td>{employee.addlDesign}</td>
                    </tr>
                ))}
                {/* Display message when no data found (within tbody) */}
                {!isLoading && !error && employees.length === 0 && (
                    <tr>
                        <td colSpan="7" className="no-data-message">
                            <p>No data available</p>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default EmployeeList;