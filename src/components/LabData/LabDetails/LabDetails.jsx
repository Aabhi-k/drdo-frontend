import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Details.css';
import Heading from '../../Heading/Heading';
import { getLabDetails } from '../../../services/BackEndServiceCall';

const initialLabDetails = {
    labFullName: '',
    labAuthName: '',
    labShortName: '',
    labCategoryShortName: '',
    labCategoryFullName: '',
    labClusterShortName: '',
    labClusterFullName: '',
    labCityFullName: '',
    otherGroup: '',
    labAddressLine1: '',
    labAddressLine2: '',
    labAddressLine3: '',
    cityFullName: '',
    labZipcode: '',

}

const LabDetails = () => {

    const [labData, setLabData] = useState(initialLabDetails);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch lab details data here
        fetchLabDetails();
    }, []);

    const fetchLabDetails = async () => {
        
        const data = await getLabDetails(id);
        setLabData(data);
        setLoading(false);
    };

    const handleEdit = () => navigate(`/lab/edit/${id}`);
    const handleBack = () => navigate('/lab');

    return (
        <div className="lab-details">
            <Heading name={"Lab Details"} />
            <div className="btn-row">
                <button className='edit-btn' onClick={handleEdit}>Edit</button>
                <button className="back" onClick={handleBack}>Back</button>
            </div>
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="labFullName">Lab Full Name</label>
                    <input
                        type="text"
                        id="labFullName"
                        name="labFullName"
                        placeholder="Lab Full Name"
                        value={labData.labFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labAuthName">Lab Auth Name</label>
                    <input
                        type="text"
                        id="labAuthName"
                        name="labAuthName"
                        placeholder="Lab Auth Name"
                        value={labData.labAuthName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labShortName">Lab Short Name</label>
                    <input
                        type="text"
                        id="labShortName"
                        name="labShortName"
                        placeholder="Lab Short Name"
                        value={labData.labShortName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labCategoryShortName">Lab Category Short Name</label>
                    <input
                        type="text"
                        id="labCategoryShortName"
                        name="labCategoryShortName"
                        placeholder="Lab Category Short Name"
                        value={labData.labCategoryShortName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labCategoryFullName">Lab Category Full Name</label>
                    <input
                        type="text"
                        id="labCategoryFullName"
                        name="labCategoryFullName"
                        placeholder="Lab Category Full Name"
                        value={labData.labCategoryFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labClusterShortName">Lab Cluster Short Name</label>
                    <input
                        type="text"
                        id="labClusterShortName"
                        name="labClusterShortName"
                        placeholder="Lab Cluster Short Name"
                        value={labData.labClusterShortName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labClusterFullName">Lab Cluster Full Name</label>
                    <input
                        type="text"
                        id="labClusterFullName"
                        name="labClusterFullName"
                        placeholder="Lab Cluster Full Name"
                        value={labData.labClusterFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labCityFullName">Lab City Full Name</label>
                    <input
                        type="text"
                        id="labCityFullName"
                        name="labCityFullName"
                        placeholder="Lab City Full Name"
                        value={labData.labCityFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="otherGroup">Other Group</label>
                    <input
                        type="text"
                        id="otherGroup"
                        name="otherGroup"
                        placeholder="Other Group"
                        value={labData.otherGroup}
                        readOnly
                    />
                </div>
            </div>

            <div className="form-fields">

                <div className="form-group">
                    <label htmlFor="labAddressLine1">Lab Address Line 1</label>
                    <input
                        type="text"
                        id="labAddressLine1"
                        name="labAddressLine1"
                        placeholder="Lab Address Line 1"
                        value={labData.labAddressLine1}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labAddressLine2">Lab Address Line 2</label>
                    <input
                        type="text"
                        id="labAddressLine2"
                        name="labAddressLine2"
                        placeholder="Lab Address Line 2"
                        value={labData.labAddressLine2}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labAddressLine3">Lab Address Line 3</label>
                    <input
                        type="text"
                        id="labAddressLine3"
                        name="labAddressLine3"
                        placeholder="Lab Address Line 3"
                        value={labData.labAddressLine3}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cityFullName">City Full Name</label>
                    <input
                        type="text"
                        id="cityFullName"
                        name="cityFullName"
                        placeholder="City Full Name"
                        value={labData.cityFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labZipcode">Lab Zipcode</label>
                    <input
                        type="text"
                        id="labZipcode"
                        name="labZipcode"
                        placeholder="Lab Zipcode"
                        value={labData.labZipcode}
                        readOnly
                    />
                </div>
            </div>
        </div>

    );
};

export default LabDetails;