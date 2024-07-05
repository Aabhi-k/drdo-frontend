import React, { useEffect, useState } from 'react';

import SearchableDropDown from "../../SearchableDropDown/SearchableDropDown";
import { empDesignationDropDownSearchURL, labMasterDropDownSearchURL, empRoleDropDownSearchURL, zipcodeDropDownSearchURL, cityDropDownSearchURL, telephoneCategoryDropDownSearchURL } from "../../Config/config";
import { empDesignationDisplayURL, empRoleDisplayURL, cityDisplayURL, telephoneCategoryDisplayURL, zipcodeDisplayURL, labMasterDisplayURL } from "../../Config/config";
import Heading from "../../Heading/Heading";
import { useParams, useNavigate } from 'react-router-dom';
import { editEmpAddress, editEmpMaster, editEmpTelephone, getEmployeeAddress, getEmployeeEditDetails, getEmployeeTelephone } from "../../../services/EmployeeList";

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
const initialTelephoneData = {
    telephoneNumber: '',
    teleCatId: '',
    empId: '',
    epabx: '',
}

const EditEmployee = () => {
    const [newEmployeeData, setNewEmployeeData] = useState(initialEmployeeData);
    const [newAddressData, setNewAddressData] = useState(initialAddressData);
    const [newTelephoneData, setNewTelephoneData] = useState(initialTelephoneData);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeDetails(id);

    }, [id]);

    const fetchEmployeeDetails = async (employeeId) => {
       try{
        // Fetching Employee Details
        const empResult = await getEmployeeEditDetails(employeeId);
        setNewEmployeeData({ ...initialEmployeeData, ...empResult });
        const addressResult = await getEmployeeAddress(employeeId);
        setNewAddressData({ ...initialAddressData, ...addressResult });
        const telephoneResult = await getEmployeeTelephone(employeeId);
        setNewTelephoneData({ ...initialTelephoneData, ...telephoneResult });

        }catch (error) {
            console.error('Error fetching Employee details:', error);
            throw error;
        }
    
    }

    const handleEditEmployee = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmissionError('');
            try {
                // Putting Employee Details
                await editEmpMaster(id, newEmployeeData);
                await editEmpAddress(id, newAddressData);
                await editEmpTelephone(id, newTelephoneData);
                alert('Employee details updated successfully.');

                setIsSubmitting(false);

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
    const hanldeTelephoneChange = (e) => {
        const { name, value } = e.target;
        setNewTelephoneData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleExit = () => {
        setErrors({});
        setSubmissionError('');
        navigate('/employee');
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
        if (!newEmployeeData.empLastName.trim()) {
            validationErrors.empLastName = 'Last Name is required.';
        } else if (!noSpaceRegex.test(newEmployeeData.empLastName)) {
            validationErrors.empLastName = 'Last Name must contain only letters without spaces.';
        }
        if (!newEmployeeData.empDesignId) {
            validationErrors.Designation = 'Designation is required.';
        }
        if (!newEmployeeData.officeRoomNo.trim()) {
            validationErrors.officeRoomNo = 'Office Room No. is required.';
        } else if (/[^A-Za-z0-9]/.test(newEmployeeData.officeRoomNo)) {
            validationErrors.officeRoomNo = 'Office Room No. must not contain special characters or spaces.';
        }
        if (!newEmployeeData.labId) {
            validationErrors.Lab = 'Lab Name is required.';
        }

        if (!newEmployeeData.empRoleId) {
            validationErrors.Role = 'Employee Role is required.';
        }

        if (newAddressData.addressLine1.trim() === '') {
            validationErrors.addressLine1 = 'Address Line 1 is required.';
        }
        if (!newAddressData.addressLine2.trim()) {
            validationErrors.addressLine2 = 'Address Line 2 is required.';
        }
        if (!newAddressData.cityId) {
            validationErrors.City = 'City is required.';
        }
        if (!newAddressData.zipcodeId) {
            validationErrors.zipcode = 'Zip Code is required.';
        }
        if (!newTelephoneData.teleCatId) {
            validationErrors.TelephoneCategory = 'Telephone Category is required.';
        }
        if (!newTelephoneData.telephoneNumber.trim()) {
            validationErrors.telephoneNumber = 'Telephone number is required.';
        } else if (!/^\d{10}$/.test(newTelephoneData.telephoneNumber)) {
            validationErrors.telephoneNumber = 'Telephone number must be a 10-digit number.';
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
        <form onSubmit={handleEditEmployee} className="create-emp">
            <Heading name={"Edit"} />
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
                        initialValue={newEmployeeData.empDesignId}
                        displayURL={empDesignationDisplayURL}
                        
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
                        initialValue={newEmployeeData.labId}
                        displayURL={labMasterDisplayURL}
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
                        initialValue={newEmployeeData.empRoleId}
                        displayURL={empRoleDisplayURL}
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
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="telephoneNumber">Telephone Number</label>
                    <input
                        type="text"
                        id="telephoneNumber"
                        name="telephoneNumber"
                        placeholder="Enter Telephone Number"
                        value={newTelephoneData.telephoneNumber}
                        onChange={hanldeTelephoneChange}
                    />
                    {errors.telephoneNumber && <span className="error">{errors.telephoneNumber}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="teleCatId">Telephone Category</label>
                    <SearchableDropDown
                        placeholder="Select Telephone Category"
                        url={telephoneCategoryDropDownSearchURL}
                        name="teleCatId"
                        onChange={hanldeTelephoneChange}
                        onError={(error) => handleDropdownError('Telephone Category', error)}
                        initialValue={newTelephoneData.teleCatId}
                        displayURL={telephoneCategoryDisplayURL}
                    />
                    {errors.TelephoneCategory && <span className="error">{errors.TelephoneCategory}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="epabx">EPABX</label>
                    <input
                        type="text"
                        id="epabx"
                        name="epabx"
                        placeholder="Enter EPABX"
                        value={newTelephoneData.epabx}
                        onChange={hanldeTelephoneChange}
                    />
                    {errors.epabx && <span className="error">{errors.epabx}</span>}
                </div>
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
                        initialValue={newAddressData.cityId}
                        displayURL={cityDisplayURL}
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
                        initialValue={newAddressData.zipcodeId}
                        displayURL={zipcodeDisplayURL}
                    />


                    
                    {errors.Zipcode && <span className="error">{errors.Zipcode}</span>}
                </div>
            </div>
            <div className="form-actions">
                <button className="submit-emp-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Employee'}
                </button>
                <button type="button" className="clear-btn" onClick={handleExit}>
                    Exit
                </button>
            </div>
            {submissionError && <span className="error">{submissionError}</span>}
        </form>
    );
};

export default EditEmployee;