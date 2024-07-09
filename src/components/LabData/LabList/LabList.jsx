import React, { useCallback, useEffect, useState } from "react";
import { getLabList, searchLabMaster } from "../../../services/BackEndServiceCall.js";
import './LabList.css';
import { useNavigate } from "react-router-dom";

import SearchBar from "../../SearchBar/SearchBar.jsx";
import Pagination from "../../Pagination/Pagination.jsx";
import Heading from "../../Heading/Heading.jsx";
import menuBar from "../../../imgs/menu.png";
import FilterBar from "../../FilterBar/FilterBar.jsx";

import { labCategoryDropDownSearchURL, labClusterDropDownSearchURL, cityDropDownSearchURL } from "../../Config/config.js";


const filterConfigs = [
    { name: 'Cluster', placeholder: 'Cluster...', url: labClusterDropDownSearchURL },
    { name: 'Category', placeholder: 'Category...', url: labCategoryDropDownSearchURL},
    { name: 'City', placeholder: 'City...', url: cityDropDownSearchURL },
];

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
    
    // Handling Filter
    const [selectedFilters, setSelectedFilters] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    
    const navigate = useNavigate();

    const fetchData = useCallback(async (pageNo, sizeNo, term, filter) => {
        setIsLoading(true);
        setError(null);
        try {
            // let result;
            const result = term
                ? await searchLabMaster(term, filter, pageNo, sizeNo)
                : await getLabList(filter, pageNo, sizeNo);

            setLab(result.content);
            setTotalPages(result.totalPages);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);



    useEffect(() => {
        fetchData(currentPage, recordsPerPage, debouncedSearchTerm, selectedFilters);
    }, [currentPage, debouncedSearchTerm, selectedFilters]);
    useEffect(() => {
        setCurrentPage(0);
    }, [searchTerm]);

    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCreateLab = () => {
        navigate('/lab/create');
    };
    const handleEditLab = () => {
        navigate('/lab/edit');
    };
    const handleApplyFilter = (filters) => {
        setSelectedFilters(filters);
        setCurrentPage(0);
    };
    const handleRowClick = (id) => {
        navigate(`/lab/details/${id}`);
    }

    return (
        <div className="lab-list">
            <Heading name={"Lab List"} />
            <div className="table-top">
                <FilterBar filterConfigs={filterConfigs} applyFilter={handleApplyFilter} />
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />

                <div className="dropdown">
                    <button className="dropdown-toggle" onClick={toggleDropdown}>
                        <img src={menuBar} alt="" className="menu-bar-img" />
                    </button>

                    <div className="dropdown-content">
                        <button className="create-btn" onClick={handleCreateLab} >Create Lab</button>
                        <button className="lab-cluster">Lab Cluster</button>
                        <button className="lab-category">Lab Category</button>
                    </div>
                </div>

            </div>
            {error && <p>Error: {error.message}</p>}
            
                <>
                    <DataTable lab={lab} isLoading={isLoading} onRowClick={handleRowClick}/>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </>
            


        </div>
    );
}

const DataTable = ({ lab, isLoading, onRowClick }) => {
    return (
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
                {lab.length > 0 ? (
                    lab.map((lab, index) => (
                        <tr key={index} onDoubleClick={() => onRowClick(lab.id)}>
                            <td>{lab.labFullName}</td>
                            <td>{lab.labAuthName}</td>
                            <td>{lab.labShortName}</td>
                            <td>{lab.clusterFullName}</td>
                            <td>{lab.catFullName}</td>
                            <td>{lab.cityFullName}</td>
                            <td>{lab.otherGroup}</td>
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
}

export default LabList;