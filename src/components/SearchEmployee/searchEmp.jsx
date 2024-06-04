import React, {useState,useEffect} from "react";

import { searchEmp } from "../../services/EmployeeList";

const Search = () => {
    const [search, setSearch] = useState("");
    const [empList, setEmpList] = useState([]);

    useEffect(() => {
        searchEmp(search).then(res => {
            setEmpList(res);
        });
    }, [search]);

    return (
        <div>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
    );

}

export default Search;