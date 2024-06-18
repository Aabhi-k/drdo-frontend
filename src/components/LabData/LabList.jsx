import React, { useCallback, useEffect, useState } from "react";
import { getLabList, searchLabMaster} from "../../services/EmployeeList";
import './LabList.css';
import { useNavigate } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import Heading from "../Heading/Heading.jsx";

const LabList = () => {
    // Handling lab data
    const [lab, setLab] = useState([]);
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
                result = await searchLabMaster(term, pageNo, sizeNo);
            }
            else {

                result = await getLabList(pageNo, sizeNo);
            }
            setLab(result.content);
            setTotalPages(result.totalPages);
        }
        catch (error) {
            setError(error);
        }
        finally {
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
    const handleCreateLab = () => {
        navigate('/lab/create');
    };
    const handleEditLab = () => {
        navigate('/lab/edit');
    };
    const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility


    return (
        <div className="lab-list">
            <Heading name={"Lab List"} />
            <div className="table-top">

            <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage} />

            </div>
            {error && <p>Error: {error.message}</p>}
            {lab && lab.length > 0 && (
                <>
                    <DataTable lab={lab} />
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </>
            )}
           

        </div>
    );
}

const DataTable = ({lab}) => {
    return(
        <table className="labTable">
            <thead>
                <tr>
                    <th>Lab Name</th>
                    <th>Lab Auth </th>
                    <th>Lab Short Name</th>
                    <th>Cluster</th>
                    <th>Category</th>
                    <th>City</th>
                    <th>Other Group</th>
                </tr>
            </thead>
            <tbody>
                {lab.map((lab, index) => (
                    <tr key={index}>
                        <td>{lab.labFullName}</td>
                        <td>{lab.labAuthName}</td>
                        <td>{lab.labShortName}</td>
                        <td>{lab.clusterFullName}</td>
                        <td>{lab.catFullName}</td>
                        <td>{lab.cityFullName}</td>
                        <td>{lab.otherGroup}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default LabList;