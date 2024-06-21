import React, { useState, useEffect, useCallback, useMemo } from "react";
import './EmployeeList.css';
import { useNavigate } from 'react-router-dom';

import { getEmpList, searchEmpMaster } from "../../../services/EmployeeList.js";
import Pagination from "../../Pagination/Pagination.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";
import menuBar from "../../../imgs/menu.png";
import FilterBar from "../../FilterBar/FilterBar.jsx";
import Heading from "../../Heading/Heading.jsx";
import { labMasterDropDownSearchURL, empDesignationDropDownSearchURL } from "../../Config/config.js";

const filterConfigs = [
    { name: 'Lab', placeholder: 'Lab...', url: labMasterDropDownSearchURL },
    { name: 'Designation', placeholder: 'Designation...', url: empDesignationDropDownSearchURL },
];

const EmployeeList = () => {
    // Handling Employee Data
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handling Pages
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const recordsPerPage = 10;

    // Handling Searching terms
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Handling Filter
    const [selectedFilters, setSelectedFilters] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();


    const fetchData = useCallback(async (pageNo, sizeNo, term, filters) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = term
                ? await searchEmpMaster(term, filters, pageNo, sizeNo)
                : await getEmpList(filters, pageNo, sizeNo);

            setEmployees(result.content);
            setTotalPages(result.totalPages);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchData(currentPage, recordsPerPage, debouncedSearchTerm, selectedFilters);
    }, [currentPage, debouncedSearchTerm, selectedFilters, fetchData]);


    useMemo(() => {
        const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
        return searchTerm;
    }, [searchTerm]);

    const handleCreateEmployee = () => navigate('/employee/create');
    const handleEditEmployee = () => navigate('/employee/edit');
    const toggleDropdown = () => setIsOpen(prevState => !prevState);

    const handleApplyFilter = (filters) => {
        setSelectedFilters(filters);
        setCurrentPage(0);
    };

    return (
        <div className="emp-list">
            <Heading name="Employee List" />
            <div className="table-top">
                <FilterBar filterConfigs={filterConfigs} applyFilter={handleApplyFilter} />
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <img src={menuBar} alt="Menu" className="menu-bar-img" />
                    </button>
                    <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                        <button className="create-btn" onClick={handleCreateEmployee}>Create Employee</button>
                        <button className="edit-btn" onClick={handleEditEmployee}>Edit Employee</button>
                    </div>
                </div>
            </div>
            {error && <p>Error: {error.message}</p>}
            <DataTable employees={employees} isLoading={isLoading} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />

        </div>
    );
};

const DataTable = ({ employees, isLoading }) => (
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
            {employees.length > 0 ? (
                employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.empFirstName}</td>
                        <td>{employee.empLastName}</td>
                        <td>{employee.empTitle}</td>
                        <td>{employee.designShortName}</td>
                        <td>{employee.officeRoomNo}</td>
                        <td>{employee.labFullName}</td>
                        <td>{employee.addlDesign}</td>
                    </tr>
                ))
            ) : (
                !isLoading && (
                    <tr>
                        <td colSpan="7" className="no-data-message">
                            <p>No data available</p>
                        </td>
                    </tr>
                )
            )}
        </tbody>
    </table>
);

export default EmployeeList;
