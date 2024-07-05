import React, { useState, useCallback, useEffect } from "react";
import { searchEmpDesignation, getEmpDesignation } from "../../../services/EmployeeList";
import './EmployeeDesignation.css';

import SearchBar from "../../SearchBar/SearchBar";
import Pagination from "../../Pagination/Pagination";
import Heading from "../../Heading/Heading";
import { useNavigate } from "react-router-dom";

const EmployeeDesignation = () => {
    const [empDesignation, setempDesignation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [recordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchData(currentPage, recordsPerPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    const fetchData = useCallback(async (pageNo, sizeNo, term) => {
        setIsLoading(true);
        setError(null);

        try {
            let result;
            result = term ? await searchEmpDesignation(term, pageNo, sizeNo) : await getEmpDesignation(pageNo, sizeNo);
            setempDesignation(result.content);
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

    const onRowClick = (id) => {
        navigate(`/employee/designation/details/${id}`);
    }

    return (
        <div className="emp-designation">
            <div className="table-top">
                <Heading name={"Employee Designation"} />
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
            </div>
            {error && <p>Error: {error.message}</p>}


            <DataTable employees={empDesignation} isLoading={isLoading} onRowClick={onRowClick} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />

        </div>
    );
}


const DataTable = ({ employees, isLoading, onRowClick }) => {
    return (
        <table border="1" cellPadding="5" cellSpacing="5" className="emp-designation-table">
            <thead>
                <tr>
                    <th>Designation Short</th>
                    <th>Designation Full</th>
                    <th>Cadre Short Name</th>
                </tr>
            </thead>
            <tbody>
                {employees.length > 0 ? (
                    employees.map((employee, index) => (
                        <tr key={index} onDoubleClick={() => onRowClick(employee.id)}>
                            <td>{employee.designShortName}</td>
                            <td>{employee.designFullName}</td>
                            <td>{employee.cadreShortName}</td>
                        </tr>
                    ))) : (
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