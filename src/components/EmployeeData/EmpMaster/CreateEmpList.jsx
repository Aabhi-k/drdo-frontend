import React, { useState } from "react";
import SearchableDropDown from "../../SearchableDropDown/SearchableDropDown";
import { empDesignationDropDownSearchURL, labMasterDropDownSearchURL, empRoleDropDownSearchURL } from "../../Config/config";
import "./CreateEmpList.css";
import Heading from "../../Heading/Heading";
import { createEmpMaster } from "../../../services/EmployeeList";

const initialEmployeeData = {
    empTitle: '',
    empFirstName: '',
    empMiddleName: '',
    empLastName: '',
    empDesignId: '',
    officeRoomNo: '',
    labId: '',
    empRoleId: '',
    addlDesign: '',
};

const CreateEmpList = () => {
    const [newEmployeeData, setNewEmployeeData] = useState(initialEmployeeData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmissionError('');
            try {
                await createEmpMaster(newEmployeeData);
                setNewEmployeeData(initialEmployeeData);
            } catch (error) {
                setSubmissionError(error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEmployeeData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleClearFields = () => {
        setNewEmployeeData(initialEmployeeData);
        setErrors({}); // Optionally clear validation errors as well
        setSubmissionError(''); // Clear any submission errors if needed
    };



    const validateForm = () => {
        const validationErrors = {};
        const noSpaceRegex = /^[A-Za-z]+$/;
        const noSpecialCharRegex = /^[A-Za-z]+$/;

        if (!newEmployeeData.empTitle.trim()) {
            validationErrors.empTitle = 'Title is required.';
        } else if (!noSpecialCharRegex.test(newEmployeeData.empTitle)) {
            validationErrors.empTitle = 'Title must contain only letters without special characters or spaces.';
        }

        if (!newEmployeeData.empFirstName.trim()) {
            validationErrors.empFirstName = 'First Name is required.';
        } else if (!noSpaceRegex.test(newEmployeeData.empFirstName)) {
            validationErrors.empFirstName = 'First Name must contain only letters without spaces.';
        }

        if (newEmployeeData.empMiddleName && !noSpaceRegex.test(newEmployeeData.empMiddleName)) {
            validationErrors.empMiddleName = 'Middle Name must contain only letters without spaces.';
        }

        if (!newEmployeeData.empLastName.trim()) {
            validationErrors.empLastName = 'Last Name is required.';
        } else if (!noSpaceRegex.test(newEmployeeData.empLastName)) {
            validationErrors.empLastName = 'Last Name must contain only letters without spaces.';
        }

        if (!newEmployeeData.empDesignId) {
            validationErrors.empDesignId = 'Designation is required.';
        }

        if (!newEmployeeData.officeRoomNo.trim()) {
            validationErrors.officeRoomNo = 'Office Room No. is required.';
        } else if (/[^A-Za-z0-9]/.test(newEmployeeData.officeRoomNo)) {
            validationErrors.officeRoomNo = 'Office Room No. must not contain special characters or spaces.';
        }

        if (!newEmployeeData.labId) {
            validationErrors.labId = 'Lab Name is required.';
        }

        if (!newEmployeeData.empRoleId) {
            validationErrors.empRoleId = 'Employee Role is required.';
        }

        return validationErrors;
    };

    const handleDropdownError = (name, error) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error ? `${name} is required.` : '',
        }));
    };

    return (
        <form onSubmit={handleCreateEmployee} className="create-emp">
            <Heading name={"Create Employee"} />
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="empFirstName">First Name</label>
                    <input
                        type="text"
                        id="empFirstName"
                        name="empFirstName"
                        placeholder="First Name"
                        value={newEmployeeData.empFirstName}
                        onChange={handleChange}
                    />
                    {errors.empFirstName && <span className="error">{errors.empFirstName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empMiddleName">Middle Name</label>
                    <input
                        type="text"
                        id="empMiddleName"
                        name="empMiddleName"
                        placeholder="Middle Name"
                        value={newEmployeeData.empMiddleName}
                        onChange={handleChange}
                    />
                    {errors.empMiddleName && <span className="error">{errors.empMiddleName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empLastName">Last Name</label>
                    <input
                        type="text"
                        id="empLastName"
                        name="empLastName"
                        placeholder="Last Name"
                        value={newEmployeeData.empLastName}
                        onChange={handleChange}
                    />
                    {errors.empLastName && <span className="error">{errors.empLastName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empTitle">Title</label>
                    <input
                        type="text"
                        id="empTitle"
                        name="empTitle"
                        placeholder="Title"
                        value={newEmployeeData.empTitle}
                        onChange={handleChange}
                    />
                    {errors.empTitle && <span className="error">{errors.empTitle}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empDesignId">Designation</label>
                    <SearchableDropDown
                        placeholder="Designation"
                        url={empDesignationDropDownSearchURL}
                        name="empDesignId"
                        onChange={handleChange}
                        onError={(error) => handleDropdownError('empDesignId', error)}
                    />
                    {errors.empDesignId && <span className="error">{errors.empDesignId}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="officeRoomNo">Office Room</label>
                    <input
                        type="text"
                        id="officeRoomNo"
                        name="officeRoomNo"
                        placeholder="Office Room"
                        value={newEmployeeData.officeRoomNo}
                        onChange={handleChange}
                    />
                    {errors.officeRoomNo && <span className="error">{errors.officeRoomNo}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="labId">Lab Name</label>
                    <SearchableDropDown
                        placeholder="Lab Name"
                        url={labMasterDropDownSearchURL}
                        name="labId"
                        onChange={handleChange}
                        onError={(error) => handleDropdownError('labId', error)}
                    />
                    {errors.labId && <span className="error">{errors.labId}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empRoleId">Employee Role</label>
                    <SearchableDropDown
                        placeholder="Employee Role"
                        url={empRoleDropDownSearchURL}
                        name="empRoleId"
                        onChange={handleChange}
                        onError={(error) => handleDropdownError('empRoleId', error)}
                    />
                    {errors.empRoleId && <span className="error">{errors.empRoleId}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addlDesign">Additional Designation</label>
                    <input
                        type="text"
                        id="addlDesign"
                        name="addlDesign"
                        placeholder="Additional Designation"
                        value={newEmployeeData.addlDesign}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-actions">
                <button className="submit-emp-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Employee'}
                </button>
                <button type="button" className="clear-btn" onClick={handleClearFields}>
                    Clear
                </button>
            </div>
            {submissionError && <span className="error">{submissionError}</span>}
        </form>
    );


}

export default CreateEmpList;
