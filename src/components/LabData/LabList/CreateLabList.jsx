import React, { useState } from 'react';
import './CreateLabList.css';

import Heading from '../../Heading/Heading';
import SearchableDropDown from '../../SearchableDropDown/SearchableDropDown';
import { createLabMaster } from '../../../services/BackEndServiceCall';
import { labCategoryDropDownSearchURL, labClusterDropDownSearchURL, cityDropDownSearchURL, zipcodeDropDownSearchURL, telephoneCategoryDisplayURL, telephoneCategoryDropDownSearchURL } from '../../Config/config';

const initialLabData = {
    labFullName: '',
    labAuthName: '',
    labShortName: '',
    labCatId: '',
    labClusterId: '',
    cityId: '',
    otherGroup: ''
}

const initialLabAddress = {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    cityId: '',
    zipcodeId: '',
    labId: '',
}
const initialLabEpabx = {
    epabx: '',
    didNo: '',
}
const initialLabTelephone = {
    telephoneNo: '',
    teleCatId: '',
    stdCodeId: '',
}
const initialLabFax = {
    stdCodeId: '',
    faxNo: '',
    faxCatId: '',
}

function CreateLabList() {
    const [labData, setLabData] = useState(initialLabData);
    const [labAddress, setLabAddress] = useState(initialLabAddress);
    const [labEpabx, setLabEpabx] = useState(initialLabEpabx);
    const [labTelephone, setLabTelephone] = useState(initialLabTelephone);
    const [labFax, setLabFax] = useState(initialLabFax);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState('');


    const handleCreateLab = async (e) => {

        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmissionError('');
            try {

                await createLabMaster(labData, labAddress, labEpabx, labFax, labTelephone);

            } catch (error) {
                console.error('Error creating lab:', error);
                setSubmissionError('Error creating lab');
            }

        }

    }




    const handleLabChange = (e) => {
        const { name, value } = e.target;
        setLabData({ ...labData, [name]: value });
    }
    const hanldeAddressChange = (e) => {
        const { name, value } = e.target;
        setLabAddress({ ...labAddress, [name]: value });
    }

    const handleLabEpabxChange = (e) => {
        const { name, value } = e.target;
        setLabEpabx({ ...labEpabx, [name]: value });
    };

    const handleLabTelephoneChange = (e) => {
        const { name, value } = e.target;
        setLabTelephone({ ...labTelephone, [name]: value });
    };

    const handleLabFaxChange = (e) => {
        const { name, value } = e.target;
        setLabFax({ ...labFax, [name]: value });
    };


    const validateForm = () => {
        const validationErrors = {};
        const letterOnlyRegex = /^[A-Za-z]+$/;
        const letterAndNumberRegex = /^[A-Za-z0-9]+$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const stdCodeRegex = /^\d{2,5}$/; // Assuming std codes are between 2 to 5 digits
        const faxPhoneRegex = /^\d{6,10}$/; // Assuming fax numbers are between 6 to 10 digits

        const validateField = (value, fieldName, regex = null) => {
            if (!value.trim()) {
                validationErrors[fieldName] = `${fieldName} is required.`;
            } else if (regex && !regex.test(value)) {
                validationErrors[fieldName] = `${fieldName} is invalid.`;
            }
        };

        // Validate labData fields
        validateField(labData.labFullName, "labFullName", letterAndNumberRegex);
        validateField(labData.labAuthName, "labAuthName", letterAndNumberRegex);
        validateField(labData.labShortName, "labShortName", letterAndNumberRegex);

        if (!labData.labClusterId) { validationErrors.clusterFullName = 'Cluster is required.'; }
        if (!labData.labCatId) { validationErrors.catFullName = 'Category is required.'; }
        if (!labData.cityId) { validationErrors.cityFullName = 'City is required.'; }

        validateField(labData.otherGroup, "otherGroup", letterAndNumberRegex);

        // Validate labAddress fields
        validateField(labAddress.addressLine1, "addressLine1");
        validateField(labAddress.addressLine2, "addressLine2");
        validateField(labAddress.addressLine3, "addressLine3");

        if (!labAddress.cityId) { validationErrors.cityId = 'City is required.'; }
        if (!labAddress.zipcodeId) { validationErrors.zipcodeId = 'Zipcode is required.'; }

        // Validate labEpabx fields
        validateField(labEpabx.epabx, "epabx", phoneRegex);
        validateField(labEpabx.didNo, "didNo", phoneRegex);

        // Validate labTelephone fields
        validateField(labTelephone.telephoneNo, "telephoneNo", phoneRegex);

        if (!labTelephone.teleCatId) { validationErrors.teleCatId = 'Telephone Category is required.'; }
        if (!labTelephone.stdCodeId) { validationErrors.stdCodeId = 'STD Code is required.'; }

        // Validate labFax fields
        validateField(labFax.faxNo, "faxNo", faxPhoneRegex);

        if (!labFax.faxCatId) { validationErrors.faxCatId = 'Fax Category is required.'; }
        if (!labFax.stdCodeId) { validationErrors.stdCodeId = 'STD Code is required.'; }
        
        return validationErrors;
    }
    const handleClearFields = () => {
        setLabData(initialLabData);
        setLabAddress(initialLabAddress);
        setErrors({});
        setSubmissionError('');
    };

    const handleDropdownError = (name, error) => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error ? `${name} is required.` : '',
        }));
    };
    return (
        <form onSubmit={handleCreateLab} className='create-lab'>
            <Heading name={"Create Lab"} />

            {/* Lab Details */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="labFullName">Lab Full Name</label>
                    <input
                        type="text"
                        placeholder='Enter Lab Full Name'
                        name="labFullName"
                        value={labData.labFullName}
                        onChange={handleLabChange}
                    />
                    {errors.labFullName && <span className="error-message">{errors.labFullName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="labAuthName">Lab Auth Name</label>
                    <input
                        type="text"
                        placeholder='Enter Lab Auth Name'
                        name="labAuthName"
                        value={labData.labAuthName}
                        onChange={handleLabChange}
                    />
                    {errors.labAuthName && <span className="error-message">{errors.labAuthName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="labShortName">Lab Short Name</label>
                    <input
                        type="text"
                        placeholder='Enter Lab Short Name'
                        name="labShortName"
                        value={labData.labShortName}
                        onChange={handleLabChange}
                    />
                    {errors.labShortName && <span className="error-message">{errors.labShortName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="clusterFullName">Lab Cluster</label>
                    <SearchableDropDown
                        placeholder={"Select Cluster"}
                        url={labClusterDropDownSearchURL}
                        name="labClusterId"
                        onChange={handleLabChange}
                        onError={(error) => handleDropdownError('labCluster', error)}
                    />
                    {errors.labCluster && <span className="error-message">{errors.labCluster}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="catFullName">Lab Category</label>
                    <SearchableDropDown
                        placeholder={"Select Category"}
                        url={labCategoryDropDownSearchURL}
                        name="labCatId"
                        onChange={handleLabChange}
                        onError={(error) => handleDropdownError('labCategory', error)}
                    />
                    {errors.labCategory && <span className="error-message">{errors.labCategory}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="cityFullName">Lab City</label>
                    <SearchableDropDown
                        placeholder={"Select City"}
                        url={cityDropDownSearchURL}
                        name="cityId"
                        onChange={handleLabChange}
                        onError={(error) => handleDropdownError('cityName', error)}
                    />
                    {errors.cityName && <span className="error-message">{errors.cityName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="otherGroup">Other Group</label>
                    <input
                        type="text"
                        placeholder='Enter Other Group'
                        name="otherGroup"
                        value={labData.otherGroup}
                        onChange={handleLabChange}
                    />
                    {errors.otherGroup && <span className="error-message">{errors.otherGroup}</span>}
                </div>
            </div>
            {/* Lab Address */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="addressLine1">Address Line 1</label>
                    <input
                        type="text"
                        placeholder='Enter Address Line 1'
                        name="addressLine1"
                        value={labAddress.addressLine1}
                        onChange={hanldeAddressChange}
                    />
                    {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine2">Address Line 2</label>
                    <input
                        type="text"
                        placeholder='Enter Address Line 2'
                        name="addressLine2"
                        value={labAddress.addressLine2}
                        onChange={hanldeAddressChange}
                    />
                    {errors.addressLine2 && <span className="error-message">{errors.addressLine2}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine3">Address Line 3</label>
                    <input
                        type="text"
                        placeholder='Enter Address Line 3'
                        name="addressLine2"
                        value={labAddress.addressLine3}
                        onChange={hanldeAddressChange}
                    />
                    {errors.addressLine2 && <span className="error-message">{errors.addressLine2}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="cityId">City</label>
                    <SearchableDropDown
                        placeholder={"Select City"}
                        url={cityDropDownSearchURL}
                        name="cityId"
                        onChange={hanldeAddressChange}
                        onError={(error) => handleDropdownError('cityId', error)}
                    />
                    {errors.cityId && <span className="error-message">{errors.cityId}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="zipcodeId">Zipcode</label>
                    <SearchableDropDown
                        placeholder={"Select Zipcode"}
                        url={zipcodeDropDownSearchURL}
                        name="zipcodeId"
                        onChange={hanldeAddressChange}
                        onError={(error) => handleDropdownError('zipcodeId', error)}
                    />
                    {errors.zipcodeId && <span className="error-message">{errors.zipcodeId}</span>}
                </div>
            </div>
            {/* Lab Epabx */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="epabx">EPABX</label>
                    <input
                        type="text"
                        placeholder='Enter EPABX'
                        name="epabx"
                        value={labEpabx.epabx}
                        onChange={handleLabEpabxChange}
                    />
                    {errors.epabx && <span className="error-message">{errors.epabx}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="didNo">DID No</label>
                    <input
                        type="text"
                        placeholder='Enter DID No'
                        name="didNo"
                        value={labEpabx.didNo}
                        onChange={handleLabEpabxChange}
                    />
                    {errors.didNo && <span className="error-message">{errors.didNo}</span>}
                </div>
            </div>
            {/* Lab telephone */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="telephoneNo">Telephone No</label>
                    <input
                        type="text"
                        placeholder='Enter Telephone No'
                        name="telephoneNo"
                        value={labTelephone.telephoneNo}
                        onChange={handleLabTelephoneChange}
                    />
                    {errors.telephoneNo && <span className="error-message">{errors.telephoneNo}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="teleCatId">Telephone Category</label>
                    <SearchableDropDown
                        placeholder={"Select Telephone Category"}
                        url={telephoneCategoryDropDownSearchURL}
                        name="teleCatId"
                        onChange={hanldeAddressChange}
                        onError={(error) => handleDropdownError('telephoneCategory', error)}
                    />
                    {errors.telephoneCategory && <span className="error-message">{errors.telephoneCategory}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="stdCodeId">STD Code</label>
                    <SearchableDropDown
                        placeholder={"Select STD Code"}
                        url={telephoneCategoryDisplayURL}
                        name="stdCodeId"
                        onChange={hanldeAddressChange}
                        onError={(error) => handleDropdownError('stdCode', error)}
                    />
                    {errors.stdCode && <span className="error-message">{errors.stdCode}</span>}

                </div>
            </div>
            {/* Lab fax */}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="faxNo">Lab Fax Number</label>
                    <input
                        type="text"
                        placeholder='Enter Lab Fax Number'
                        name="faxNo"
                        value={labFax.faxNo}
                        onChange={handleLabFaxChange}
                    />
                    {errors.faxNo && <span className="error-message">{errors.faxNo}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="faxCatId">Fax Category ID</label>
                    <SearchableDropDown
                        placeholder={"Select Fax Category"}
                        url={telephoneCategoryDropDownSearchURL}
                        name="faxCatId"
                        onChange={handleLabFaxChange}
                        onError={(error) => handleDropdownError('faxCatId', error)}
                    />
                    {errors.faxCatId && <span className="error-message">{errors.faxCatId}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="stdCodeId">Fax STD Code</label>
                    <SearchableDropDown
                        placeholder={"Select Fax STD Code"}
                        url={telephoneCategoryDisplayURL}
                        name="stdCodeId"
                        onChange={handleLabFaxChange}
                        onError={(error) => handleDropdownError('stdCodeId', error)}
                    />
                    {errors.stdCodeId && <span className="error-message">{errors.stdCodeId}</span>}
                </div>
            </div>
            <div className="form-actions">
                <button className="submit-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Lab'}
                </button>
                <button type="button" className="clear-btn" onClick={handleClearFields}>
                    Clear
                </button>
            </div>
            {submissionError && <span className="error">{submissionError}</span>}
        </form>
    );
}

export default CreateLabList;