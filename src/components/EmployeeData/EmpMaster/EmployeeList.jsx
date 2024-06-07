import React, { useState, useEffect, useCallback } from "react";
import './EmployeeList.css';
import { getEmpList, searchEmpMaster } from "../../../services/EmployeeList.js";
import Pagination from "../../Pagination/Pagination.jsx";
import SearchBar from "../../SearchBar/SearchBar.jsx";

import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {

    // Handling employee data
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div className="emp-list">
            <h1>Employee List</h1>


            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
            <button className="create-emp" onClick={handleCreateEmployee}>
                Create Employee
            </button>

            {error && <p>Error: {error.message}</p>}
            {employees && employees.length > 0 && (
                <>
                    <DataTable employees={employees} />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </>
            )}
            {!isLoading && !error && employees.length === 0 && <p>No data available</p>}
        </div>
    );
};

// emp table
const DataTable = ({ employees }) => {
    return (
        <table border="1" cellPadding="5" cellSpacing="5" className="empTable">
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
                {employees.map((employee, index) => (
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
            </tbody>
        </table>
    );
};

export default EmployeeList;