import React, { useState } from "react";
import SearchableDropDown from "../../../services/SearchableDropDown";
import { empDesignationDropDownSearchURL } from "../../Config/config";

const CreateEmpList = () => {
    const [newEmployeeData, setNewEmployeeData] = useState({
        empTitle: '',
        empFirstName: '',
        empMiddleName: '',
        empLastName: '',
        empDesignId: '',
        officeRoomNo: '',
        labId: '',
        empRoleId: '',
        addlDesign: '',
    });

    const handleCreateEmployee = (e) => {
        e.preventDefault();
        console.log(newEmployeeData);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployeeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (

        <form onSubmit={handleCreateEmployee} className="create-emp">

            <input
                type="text"
                name="empTitle"
                placeholder="Title"
                value={newEmployeeData.empTitle}
                onChange={handleChange}
            />
            <input
                type="text"
                name="empFirstName"
                placeholder="First Name"
                value={newEmployeeData.empFirstName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="empMiddleName"
                placeholder="Middle Name"
                value={newEmployeeData.empMiddleName}
                onChange={handleChange}
            />
            <input
                type="text"
                name="empLastName"
                placeholder="Last Name"
                value={newEmployeeData.empLastName}
                onChange={handleChange}
            />
            <SearchableDropDown
                placeholder="Designation"
                url= {empDesignationDropDownSearchURL}
                name="empDesignId"
                value={newEmployeeData.empDesignId}
                onChange={handleChange}
            />
            <input
                type="text"
                name="officeRoomNo"
                placeholder="Office Room"
                value={newEmployeeData.officeRoomNo}
                onChange={handleChange}
            />
            <input
                type="text"
                name="labId"
                placeholder="Lab Name"
                value={newEmployeeData.labId}
                onChange={handleChange}
            />
            <input
                type="text"
                name="empRoleId"
                placeholder="Employee Role"
                value={newEmployeeData.empRoleId}
                onChange={handleChange}
            />
            <input
                type="text"
                name="addlDesign"
                placeholder="Additional Designation"
                value={newEmployeeData.addlDesign}
                onChange={handleChange}
            />
            <button className="submit-btn" type="submit">Create Employee</button>
        </form>
    );

}

export default CreateEmpList;