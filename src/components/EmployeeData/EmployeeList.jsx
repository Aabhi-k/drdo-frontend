import React, { useState, useEffect, useCallback } from "react";
import './EmployeeList.css';
import { getEmpList, getEmpDesignation, searchEmp } from "../../services/EmployeeList.js";


const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage] = useState(10);
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
                result = await searchEmp(term, pageNo, sizeNo);
            } else {
                result = await getEmpDesignation(pageNo, sizeNo);
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

    return (
        <div className="emp-list">
            <h1>Employee List</h1>


            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />

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
const SearchBar = ({ searchTerm, setSearchTerm, setCurrentPage }) => {
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value === '') {
            setCurrentPage(0);
        }
    };
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
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

// prev and next button
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="page-system">
            <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} className="pre-btn">Previous</button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button disabled={currentPage + 1 === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="next-btn">Next</button>
        </div>
    );
};


export default EmployeeList;