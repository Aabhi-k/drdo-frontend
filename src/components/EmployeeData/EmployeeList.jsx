import React, { useState, useEffect } from "react";
import './EmployeeList.css';
import { getEmpList, getEmpDesignation } from "../../services/EmployeeList.js";
import SearchBar from "../SearchEmployee/SearchBar.jsx";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    // Divinding data into pages
    const [currentPage, setCurrentPage] = useState(0); // Start on page 1
    // Number of records on a page default = 10
    const [recordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchData(currentPage, recordsPerPage);
    }, [currentPage]);

    const fetchData = async (pageNo, sizeNo) => {
        if (searchTerm) {
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const result = await getEmpDesignation(pageNo , sizeNo);
            setEmployees(result.content);
            setTotalPages(result.totalPages);
            
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    

    const handleSearchResults = (results) => {
        if(!results){
            setSearchTerm('');
            fetchData(currentPage, recordsPerPage);
            return;
        }
        setSearchTerm("not empty");
        setEmployees(results.content);
        setTotalPages(results.totalPages);
    };

    

    const displayedEmployees = employees;

    return (
        <div className="emp-list">
            <h1>Employee List</h1>
            <SearchBar onSearchResults={handleSearchResults} />
            {error && <p>Error: {error.message}</p>}
            {employees && employees.length > 0 && (
                <>
                    <DataTable employees={displayedEmployees} />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage = {totalPages} />
                </>
            )}
            {!isLoading && !error && employees.length === 0 && <p>No data available</p>}
        </div>
    );

};

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
const Pagination = ({ currentPage, setCurrentPage, totalPage }) => {
    return (
        <div className="page-system">
            <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} className="pre-btn">Previous</button>
            <span>Page {currentPage +1} of {totalPage}</span>
            <button disabled={currentPage +1 === totalPage} onClick={() => setCurrentPage(currentPage+1)} className="next-btn">Next</button>
        </div>
    );
};


export default EmployeeList;