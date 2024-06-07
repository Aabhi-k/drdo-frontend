import React, { useState } from "react";
import SearchableDropDown from "../../../services/SearchableDropDown";
import { empDesignationDropDownSearchURL, labMasterDropDownSearchURL, empRoleDropDownSearchURL } from "../../Config/config";

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

    const [errors, setErrors] = useState({}); // State for storing validation errors

    const handleCreateEmployee = (e) => {
        e.preventDefault();
        // Validate form data here
        const validationErrors = validateForm();
        setErrors(validationErrors); // Update errors state if any

        if (Object.keys(validationErrors).length === 0) {
            // Submit data if no errors
            console.log(newEmployeeData); // Replace with actual submission logic (e.g., API call)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployeeData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const validationErrors = {};

        if (!newEmployeeData.empTitle.trim()) {
            validationErrors.empTitle = 'Title is required.';
        }

        if (!newEmployeeData.empFirstName.trim()) {
            validationErrors.empFirstName = 'First Name is required.';
        }
        if (!newEmployeeData.empLastName.trim()) {
            validationErrors.empLastName = 'Last Name is required.';
        }

        if (!newEmployeeData.empDesignId) {
            validationErrors.empDesignId = 'Designation is required.';
        }

        if (!newEmployeeData.officeRoomNo.trim()) {
            validationErrors.officeRoomNo = 'Office Room No. is required.';
        }

        if (!newEmployeeData.labId) {
            validationErrors.labId = 'Lab Name is required.';
        }

        if (!newEmployeeData.empRoleId) {
            validationErrors.empRoleId = 'Employee Role is required.';
        }

        return validationErrors;
    };

    return (
        <form onSubmit={handleCreateEmployee} className="create-emp">
            <div className="form-group">
                <input
                    type="text"
                    name="empTitle"
                    placeholder="Title"
                    value={newEmployeeData.empTitle}
                    onChange={handleChange}
                />
                {errors.empTitle && <span className="error">{errors.empTitle}</span>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="empFirstName"
                    placeholder="First Name"
                    value={newEmployeeData.empFirstName}
                    onChange={handleChange}
                />
                {errors.empFirstName && <span className="error">{errors.empFirstName}</span>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="empMiddleName"
                    placeholder="Middle Name"
                    value={newEmployeeData.empMiddleName}
                    onChange={handleChange}
                />
                {errors.empMiddleName && <span className="error">{errors.empMiddleName}</span>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="empLastName"
                    placeholder="Last Name"
                    value={newEmployeeData.empLastName}
                    onChange={handleChange}
                />
                {errors.empLastName && <span className="error">{errors.empLastName}</span>}
            </div>
            <div className="form-group">
                <SearchableDropDown
                    placeholder="Designation"
                    url={empDesignationDropDownSearchURL}
                    name="empDesignId"
                    value={newEmployeeData.empDesignId}
                    onChange={handleChange}
                />
                {errors.empDesignId && <span className="error">{errors.empDesignId}</span>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="officeRoomNo"
                    placeholder="Office Room"
                    value={newEmployeeData.officeRoomNo}
                    onChange={handleChange}
                />
                {errors.officeRoomNo && <span className="error">{errors.officeRoomNo}</span>}
            </div>
            <div className="form-group">
                <SearchableDropDown
                    placeholder="Lab Name"
                    url={labMasterDropDownSearchURL}
                    name="labId"
                    value={newEmployeeData.labId}
                    onChange={handleChange}
                />
                {errors.labId && <span className="error">{errors.labId}</span>}
            </div>
            <div className="form-group">
                <SearchableDropDown
                    placeholder="Employee Role"
                    url={empRoleDropDownSearchURL}
                    name="empRoleId"
                    value={newEmployeeData.empRoleId}
                    onChange={handleChange}
                />
                {errors.empRoleId && <span className="error">{errors.empRoleId}</span>}
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="addlDesign"
                    placeholder="Additional Designation"
                    value={newEmployeeData.addlDesign}
                    onChange={handleChange}
                />
            </div>
            <button className="submit-btn" type="submit">Create Employee</button>
        </form>
    );
}

export default CreateEmpList;