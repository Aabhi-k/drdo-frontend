import React from "react";


const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="page-system">
            <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} className="pre-btn">Previous</button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button disabled={currentPage + 1 === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="next-btn">Next</button>
        </div>
    );
};

export default Pagination;