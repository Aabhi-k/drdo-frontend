import React, { useState } from 'react';
import './CreateLabList.css';

import Heading from '../Heading/Heading';
import SearchableDropDown from '../SearchableDropDown/SearchableDropDown';
import { createLabMaster } from '../../services/EmployeeList';
import { labCategoryDropDownSearchURL, labClusterDropDownSearchURL, cityDropDownSearchURL, zipcodeDropDownSearchURL } from '../Config/config';

const initialLabData = {
    labFullName: '',
    labAuthName: '',
    labShortName: '',
    clusterFullName: '',
    catFullName: '',
    cityFullName: '',
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
                let id;
                id = await createLabMaster(labData);
                
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

    const validateForm = () => {
        const errors = {};
        if (!labData.labFullName.trim()) {
            errors.labFullName = 'Lab Full Name is required';
        }
        if (!labData.labAuthName.trim()) {
            errors.labAuthName = 'Lab Auth Name is required';
        }
        if (!labData.labShortName.trim()) {
            errors.labShortName = 'Lab Short Name is required';
        }
        if (!labData.clusterFullName.trim()) {
            errors.clusterFullName = 'Cluster Full Name is required';
        }
        if (!labData.catFullName.trim()) {
            errors.catFullName = 'Cat Full Name is required';
        }
        if (!labData.cityFullName.trim()) {
            errors.cityFullName = 'City Full Name is required';
        }
        if (!labData.otherGroup.trim()) {
            errors.otherGroup = 'Other Group is required';
        }
        if (!labAddress.addressLine1.trim()) {
            errors.addressLine1 = 'Address Line 1 is required';
        }
        if (!labAddress.addressLine2.trim()) {
            errors.addressLine2 = 'Address Line 2 is required';
        }

        if (!labAddress.cityId.trim()) {
            errors.cityId = 'City is required';
        }
        if (!labAddress.zipcodeId.trim()) {
            errors.zipcodeId = 'Zipcode is required';
        }
        return errors;
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
        <form onSubmit={handleCreateLab} className='create-emp'>
            <Heading name={"Create Lab"} />
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="labFullName">Lab Full Name</label>
                    <input
                        type="text"
                        placeholder='Enter Lab Full Name'
                        name="labFullName"
                        value={labData.labFullName}
                        onChange={handleLabChange}
                        className={errors.labFullName ? 'error' : ''}
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
                        className={errors.labAuthName ? 'error' : ''}
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
                        className={errors.labShortName ? 'error' : ''}
                    />
                    {errors.labShortName && <span className="error-message">{errors.labShortName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="clusterFullName">Cluster Full Name</label>
                    <SearchableDropDown
                        placeholder={"Select Cluster"}
                        url={labCategoryDropDownSearchURL}
                        name="clusterFullName"
                        onChange={handleLabChange}
                        onError={(error) => handleDropdownError('clusterFullName', error)}
                    />

                    {errors.clusterFullName && <span className="error-message">{errors.clusterFullName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="catFullName">Cat Full Name</label>
                    <SearchableDropDown
                        placeholder={"Select Category"}
                        url={labCategoryDropDownSearchURL}
                        name="catFullName"
                        onChange={handleLabChange}
                        onError={(error) => handleDropdownError('catFullName', error)}
                    />

                    {errors.catFullName && <span className="error-message">{errors.catFullName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="cityFullName">City Full Name</label>
                    <SearchableDropDown
                        placeholder={"Select City"}
                        url={cityDropDownSearchURL}
                        name="cityFullName"
                        onChange={handleLabChange}
                        onError={(error) => handleDropdownError('cityFullName', error)}
                    />


                    {errors.cityFullName && <span className="error-message">{errors.cityFullName}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="otherGroup">Other Group</label>
                    <input
                        type="text"
                        placeholder='Enter Other Group'
                        name="otherGroup"
                        value={labData.otherGroup}
                        onChange={handleLabChange}
                        className={errors.otherGroup ? 'error' : ''}
                    />
                    {errors.otherGroup && <span className="error-message">{errors.otherGroup}</span>}
                </div>
            </div>
            <div className="form-fields">

                <div className="form-group">
                    <label htmlFor="addressLine1">Address Line 1</label>
                    <input
                        type="text"
                        placeholder='Enter Address Line 1'
                        name="addressLine1"
                        value={labAddress.addressLine1}
                        onChange={hanldeAddressChange}
                        className={errors.addressLine1 ? 'error' : ''}
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
                        className={errors.addressLine2 ? 'error' : ''}
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

export default CreateLabList;