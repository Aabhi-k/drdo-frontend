import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './EmployeeDesignation.css';

import menuBar from "../../../imgs/menu.png"
import SearchBar from "../../SearchBar/SearchBar";
import Pagination from "../../Pagination/Pagination";
import Heading from "../../Heading/Heading";
import { searchEmpDesignation, getEmpDesignation } from "../../../services/BackEndServiceCall";

const EmployeeDesignation = () => {
    const [empDesignation, setEmpDesignation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage, recordsPerPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    useEffect(() => {
        setCurrentPage(0);
    }, [searchTerm]);

    const fetchData = useCallback(async (pageNo, sizeNo, term) => {
        setIsLoading(true);
        setError(null);

        try {
            let result;
            result = term ? await searchEmpDesignation(term, pageNo, sizeNo) : await getEmpDesignation(pageNo, sizeNo);
            setEmpDesignation(result.content);
            setTotalPages(result.totalPages);
            console.log(result);
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

    const toggleDropdown = () => setIsOpen(prevState => !prevState);
    const onRowClick = (id) => navigate(`/employee/designation/details/${id}`);
    

    return (
        <div className="emp-designation">
            <Heading name={"Designations"} />

            <div className="table-top">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />

                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <img src={menuBar} alt="Menu" className="menu-bar-img" />
                    </button>
                    <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                        <button className="create-designation">Create Designation</button>
                    </div>
                </div>
            </div>

            {error && <p>Error: {error.message}</p>}

            <DataTable employees={empDesignation} isLoading={isLoading} onRowClick={onRowClick} />

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
}

const DataTable = ({ employees, isLoading, onRowClick }) => {
    return (
        <table className="empTable">
            <thead>
                <tr>
                    <th>Designation Short</th>
                    <th>Designation Full</th>
                    <th>Cadre Name</th>
                </tr>
            </thead>
            <tbody>
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <tr key={index} onDoubleClick={() => onRowClick(employee.id)}>
                            <td>{employee.designShortName}</td>
                            <td>{employee.designFullName}</td>
                            <td>{employee.cadreFullName}</td>
                        </tr>
                    ))
                ) : (
                    !isLoading && (
                        <tr>
                            <td colSpan="3" className="no-data-message">
                                <p>No data available</p>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </table>
    );
};

export default EmployeeDesignation;
