import React, { useState } from "react";
import "./CreateEmpList.css";

import SearchableDropDown from "../../SearchableDropDown/SearchableDropDown";
import { empDesignationDropDownSearchURL, labMasterDropDownSearchURL, empRoleDropDownSearchURL, zipcodeDropDownSearchURL, cityDropDownSearchURL, telephoneCategoryDropDownSearchURL, empMailCategoryDropDownSearchURL } from "../../Config/config";
import Heading from "../../Heading/Heading";
import { createEmpMaster } from "../../../services/EmployeeList";
import { useNavigate } from "react-router-dom";

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
const initialAddressData = {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    cityId: '',
    zipcodeId: '',
    empId: '',
}
const initialMailData = {
    empId: '',
    email: '',
    mailCatId: '',
}
const initialTelephoneData = {
    telephoneNumber: '',
    teleCatId: '',
    empId: '',
    epabx: '',
}

const CreateEmpList = () => {

    const [newEmployeeData, setNewEmployeeData] = useState(initialEmployeeData);
    const [newAddressData, setNewAddressData] = useState(initialAddressData);
    const [newTelephoneData, setNewTelephoneData] = useState([initialTelephoneData]);
    const [newMailData, setNewMailData] = useState([initialMailData]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');

    const navigate = useNavigate();

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmissionError('');
            try {
                // Posting Employee Data
                await createEmpMaster(newEmployeeData, newTelephoneData, newMailData, newAddressData);
                alert('Employee Created Successfully');
                setNewEmployeeData(initialEmployeeData);
                setNewAddressData(initialAddressData);
                setNewTelephoneData([initialTelephoneData]);
                setNewMailData([initialMailData]);

                navigate('/employee');

            } catch (error) {
                setSubmissionError(error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleEmpChange = (e) => {
        const { name, value } = e.target;
        setNewEmployeeData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const hanldeAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddressData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleTelephoneChange = (index, e) => {
        const { name, value } = e.target;
        const updatedTelephones = newTelephoneData.map((tel, i) => {
            if (i === index) {
                return { ...tel, [name]: value };
            }
            return tel;
        });
        setNewTelephoneData(updatedTelephones);
    };
    const handleAddNewTelephone = () => setNewTelephoneData([...newTelephoneData, initialTelephoneData]);
    const handleRemoveTelephone = (index) => setNewTelephoneData(newTelephoneData.filter((tel, i) => i !== index));

    const handleMailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedMails = newMailData.map((mail, i) => {
            if (i === index) {
                return { ...mail, [name]: value };
            }
            return mail;
        });
        setNewMailData(updatedMails);
    };

    const handleAddNewMail = () => setNewMailData([...newMailData, initialMailData]);
    const handleRemoveMail = (index) => setNewMailData(newMailData.filter((mail, i) => i !== index));

    const handleClearFields = () => {
        setNewEmployeeData(initialEmployeeData);
        setErrors({});
        setSubmissionError('');
    };



    const validateForm = () => {
        const validationErrors = {};
        const letterOnlyRegex = /^[A-Za-z]+$/;
        const letterAndNumberRegex = /^[A-Za-z0-9]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        const validateField = (value, fieldName, regex = null) => {
            if (!value.trim()) {
                validationErrors[fieldName] = `${fieldName} is required.`;
            } else if (regex && !regex.test(value)) {
                validationErrors[fieldName] = `${fieldName} is invalid.`;
            }
        };

        // Validate employee details
        validateField(newEmployeeData.empTitle, 'empTitle', letterOnlyRegex);
        validateField(newEmployeeData.empFirstName, 'empFirstName', letterOnlyRegex);
        validateField(newEmployeeData.empLastName, 'empLastName', letterOnlyRegex);
        validateField(newEmployeeData.officeRoomNo, 'officeRoomNo', letterAndNumberRegex);
        if (!newEmployeeData.empDesignId) validationErrors.Designation = 'Designation is required.';
        if (!newEmployeeData.labId) validationErrors.Lab = 'Lab Name is required.';
        if (!newEmployeeData.empRoleId) validationErrors.Role = 'Employee Role is required.';

        // Validate address details
        validateField(newAddressData.addressLine1, 'Address Line 1');
        validateField(newAddressData.addressLine2, 'Address Line 2');
        if (!newAddressData.cityId) validationErrors.City = 'City is required.';
        if (!newAddressData.zipcodeId) validationErrors.zipcode = 'Zip Code is required.';

        // Validate telephone numbers
        newTelephoneData.forEach((tel, index) => {
            if (!tel.teleCatId) validationErrors[`teleCatId_${index}`] = 'Telephone Category is required.';
            validateField(tel.telephoneNumber, `telephoneNumber_${index}`, phoneRegex);
            validateField(tel.epabx, `epabx_${index}`);
        });

        // Validate email
        newMailData.forEach((mail, index) => {
            if (!mail.mailCatId) validationErrors[`mailCategoty_${index}`] = 'Mail Category is required.';
            validateField(mail.email, `Email_${index}`, emailRegex);
        });


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
            {/* Employee Details Fields  */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="empFirstName">First Name</label>
                    <input
                        type="text"
                        id="empFirstName"
                        name="empFirstName"
                        placeholder="Enter First Name"
                        value={newEmployeeData.empFirstName}
                        onChange={handleEmpChange}
                    />
                    {errors.empFirstName && <span className="error">{errors.empFirstName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empMiddleName">Middle Name</label>
                    <input
                        type="text"
                        id="empMiddleName"
                        name="empMiddleName"
                        placeholder="Enter Middle Name"
                        value={newEmployeeData.empMiddleName}
                        onChange={handleEmpChange}
                    />
                    {errors.empMiddleName && <span className="error">{errors.empMiddleName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empLastName">Last Name</label>
                    <input
                        type="text"
                        id="empLastName"
                        name="empLastName"
                        placeholder="Enter Last Name"
                        value={newEmployeeData.empLastName}
                        onChange={handleEmpChange}
                    />
                    {errors.empLastName && <span className="error">{errors.empLastName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empTitle">Title</label>
                    <input
                        type="text"
                        id="empTitle"
                        name="empTitle"
                        placeholder="Enter Title"
                        value={newEmployeeData.empTitle}
                        onChange={handleEmpChange}
                    />
                    {errors.empTitle && <span className="error">{errors.empTitle}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empDesignId">Designation</label>
                    <SearchableDropDown
                        placeholder="Select Designation"
                        url={empDesignationDropDownSearchURL}
                        name="empDesignId"
                        onChange={handleEmpChange}
                        onError={(error) => handleDropdownError('Designation', error)}
                    />
                    {errors.Designation && <span className="error">{errors.Designation}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="officeRoomNo">Office Room</label>
                    <input
                        type="text"
                        id="officeRoomNo"
                        name="officeRoomNo"
                        placeholder="Enter Office Room"
                        value={newEmployeeData.officeRoomNo}
                        onChange={handleEmpChange}
                    />
                    {errors.officeRoomNo && <span className="error">{errors.officeRoomNo}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="labId">Lab Name</label>
                    <SearchableDropDown
                        placeholder="Select Lab Name"
                        url={labMasterDropDownSearchURL}
                        name="labId"
                        onChange={handleEmpChange}
                        onError={(error) => handleDropdownError('Lab', error)}
                    />
                    {errors.Lab && <span className="error">{errors.Lab}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="empRoleId">Employee Role</label>
                    <SearchableDropDown
                        placeholder="Select Employee Role"
                        url={empRoleDropDownSearchURL}
                        name="empRoleId"
                        onChange={handleEmpChange}
                        onError={(error) => handleDropdownError('Role', error)}
                    />
                    {errors.Role && <span className="error">{errors.Role}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addlDesign">Additional Designation</label>
                    <input
                        type="text"
                        id="addlDesign"
                        name="addlDesign"
                        placeholder="Enter Additional Designation"
                        value={newEmployeeData.addlDesign}
                        onChange={handleEmpChange}
                    />
                </div>
            </div>
            {/* Telephone Fields */}
            {newTelephoneData.map((tel, index) => (
                <div key={index} className="form-fields">
                    <div className="form-group">
                        <label htmlFor={`telephoneNumber_${index}`}>Telephone Number</label>
                        <input
                            type="text"
                            id={`telephoneNumber_${index}`}
                            name="telephoneNumber"
                            placeholder="Enter Telephone Number"
                            value={tel.telephoneNumber}
                            onChange={(e) => handleTelephoneChange(index, e)}
                        />
                        {errors[`telephoneNumber_${index}`] && <span className="error">{errors[`telephoneNumber_${index}`]}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor={`teleCatId_${index}`}>Telephone Category</label>
                        <SearchableDropDown
                            placeholder="Select Telephone Category"
                            url={telephoneCategoryDropDownSearchURL}
                            name="teleCatId"
                            onChange={(e) => handleTelephoneChange(index, e)}
                            onError={(error) => handleDropdownError(`teleCatId_${index}`, error)}
                        />
                        {errors[`teleCatId_${index}`] && <span className="error">{errors[`teleCatId_${index}`]}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor={`epabx_${index}`}>EPABX</label>
                        <input
                            type="text"
                            id={`epabx_${index}`}
                            name="epabx"
                            placeholder="Enter EPABX"
                            value={tel.epabx}
                            onChange={(e) => handleTelephoneChange(index, e)}
                        />
                        {errors[`epabx_${index}`] && <span className="error">{errors[`epabx_${index}`]}</span>}
                    </div>
                </div>
            ))}
            <div className="telephone-buttons">

                <button type="button" onClick={handleAddNewTelephone} className="telephone-btn">Add New Telephone</button>
                {newTelephoneData.length > 1 && <button type="button" onClick={() => handleRemoveTelephone(newTelephoneData.length - 1)} className="telephone-btn">Remove Telephone</button>    }
            </div>

            {/* Employee Mail  */}
            {newMailData.map((mail, index) => (

                <div key={index} className="form-fields">
                    <div className="form-group">
                        <label htmlFor={`email_${index}`}>Email</label>
                        <input
                            type="email"
                            id={`email_${index}`}
                            name="email"
                            placeholder="Enter Email"
                            value={mail.email}
                            onChange={(e) => handleMailChange(index, e)}
                        />
                        {errors[`Email_${index}`] && <span className="error">{errors[`Email_${index}`]}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor={`mailCatId_${index}`}>Mail Category</label>
                        <SearchableDropDown
                            placeholder="Select Mail Category"
                            url={empMailCategoryDropDownSearchURL}
                            name="mailCatId"
                            onChange={(e) => handleMailChange(index, e)}
                            onError={(error) => handleDropdownError(`mailCatId_${index}`, error)}
                        />
                        {errors[`mailCategoty_${index}`] && <span className="error">{errors[`mailCategoty_${index}`]}</span>}
                    </div>
                </div>
            ))}
            <div className="mail-buttons">
                <button type="button" onClick={handleAddNewMail} className="mail-btn">Add New Email</button>
                {newMailData.length > 1 && <button type="button" onClick={() => handleRemoveMail(newMailData.length - 1)} className="mail-btn">Remove Email</button>}
            </div>
            {/* Address Fields */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="addressLine1">Address Line 1</label>
                    <input
                        type="text"
                        id="addressLine1"
                        name="addressLine1"
                        placeholder="Enter Address Line 1"
                        value={newAddressData.addressLine1}
                        onChange={hanldeAddressChange}
                    />
                    {errors.addressLine1 && <span className="error">{errors.addressLine1}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine2">Address Line 2</label>
                    <input
                        type="text"
                        id="addressLine2"
                        name="addressLine2"
                        placeholder="Enter Address Line 2"
                        value={newAddressData.addressLine2}
                        onChange={hanldeAddressChange}
                    />
                    {errors.addressLine2 && <span className="error">{errors.addressLine2}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine3">Address Line 3</label>
                    <input
                        type="text"
                        id="addressLine3"
                        name="addressLine3"
                        placeholder="Enter Address Line 3"
                        value={newAddressData.addressLine3}
                        onChange={hanldeAddressChange}
                    />
                    {errors.addressLine3 && <span className="error">{errors.addressLine3}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="cityId">City</label>
                    <SearchableDropDown
                        placeholder="Select City"
                        url={cityDropDownSearchURL}
                        name="cityId"
                        onChange={hanldeAddressChange}
                        onError={(error) => handleDropdownError('City', error)}
                    />
                    {errors.City && <span className="error">{errors.City}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="zipcodeId">Zipcode</label>
                    <SearchableDropDown
                        placeholder="Select Zipcode"
                        url={zipcodeDropDownSearchURL}
                        name="zipcodeId"
                        onChange={hanldeAddressChange}
                        onError={(error) => handleDropdownError('Zipcode', error)}
                    />
                    {errors.Zipcode && <span className="error">{errors.Zipcode}</span>}
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

