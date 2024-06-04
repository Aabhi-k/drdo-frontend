import React, { useState, useEffect } from "react";
import './EmployeeList.css';
import { getEmpList, getEmpDesignation } from "../../services/EmployeeList.js";
import SearchEmp from "../SearchEmployee/searchEmp.jsx";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Divinding data into pages
    const [currentPage, setCurrentPage] = useState(1); // Start on page 1
    // Number of records on a page default = 10
    const [recordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        if (searchTerm) {
            return; 
        }
        setIsLoading(true);
        setError(null);

        try {
            const result = await getEmpDesignation();
            setEmployees(result);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    

    const handleSearchResults = (results) => {
        if(!results){
            fetchData();
            return;
        }
        setEmployees(results);
        setCurrentPage(1);
    };

    

    const totalPages = Math.ceil(employees.length / recordsPerPage);
    const displayedEmployees = employees.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    return (
        <div className="emp-list">
            <h1>Employee List</h1>
            <SearchEmp onSearchResults={handleSearchResults} />
            {error && <p>Error: {error.message}</p>}
            {employees && employees.length > 0 && (
                <>
                    <DataTable employees={displayedEmployees} />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </>
            )}
            {!isLoading && !error && employees.length === 0 && <p>No data available</p>}
        </div>
    );

};

const DataTable = ({ employees }) => {
    return (
        <table border="1" cellPadding="5" cellSpacing="10" className="empTable">
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
                        <td>{employee.empTitle}</td> { /*empTitle */}
                        <td>{employee.designShortName}</td>
                        <td>{employee.officeRoomNo}</td> {/*officeRoomNo*/}
                        <td>{employee.labFullName}</td>
                        <td>{employee.addlDesign}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="page-system">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="pre-btn">Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="next-btn">Next</button>
        </div>
    );
};


export default EmployeeList;