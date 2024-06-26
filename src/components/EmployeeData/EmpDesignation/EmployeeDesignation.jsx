import React, { useState, useCallback, useEffect } from "react";
import { searchEmpDesignation, getEmpDesignation } from "../../../services/EmployeeList";
import './EmployeeDesignation.css';

import SearchBar from "../../SearchBar/SearchBar";
import Pagination from "../../Pagination/Pagination";
import Heading from "../../Heading/Heading";

const EmployeeDesignation = () => {
    const [empDesignation, setempDesignation] = useState([]);
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
                result = await searchEmpDesignation(term, pageNo, sizeNo);
            } else {
                result = await getEmpDesignation(pageNo, sizeNo);
            }
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

    return (
        <div className="emp-designation">
            <Heading name={"Employee Designation"} />
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />
            {error && <p>Error: {error.message}</p>}
            {empDesignation && empDesignation.length > 0 && (
                <>
                    <DataTable employees={empDesignation} />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </>
            )}
            {!isLoading && !error && empDesignation.length === 0 && <p>No data available</p>}
        </div>
    );
}


const DataTable = ({employees}) => {
    return(
        <table border="1" cellPadding="5" cellSpacing="5" className="emp-designation-table">
            <thead>
                <tr>
                    <th>Designation Short</th>
                    <th>Designation Full</th>
                    <th>Cadre Short Name</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.designShortName}</td>
                        <td>{employee.designFullName}</td>
                        <td>{employee.cadreShortName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeDesignation;