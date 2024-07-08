import React, { useEffect, useState } from 'react';
import './EmployeeDetails.css';
import Heading from '../../Heading/Heading';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeDetails } from '../../../services/EmployeeList';


// NEEDS UPDATION TO HANDLE ARRAY VALUES

const empDetails = {
    empTitle: '',
    empFirstName: '',
    empMiddleName: '',
    empLastName: '',
    empDesignation: '',
    officeRoomNo: '',
    labFullName: '',
    addlDesign: '',
    telephone: [{
        telephoneNumber: '',
        telephoneCategory: '',
    }],

    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    cityFullName: '',
    zipcode: '',
    mail: [{
        mailCategory: '',
        email: '',
    }]
}
const EmployeeDetails = () => {
    const [employee, setEmployee] = useState(empDetails);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployeeDetails(id);
    }, [id]);

    const fetchEmployeeDetails = async (employeeId) => {
        const empResult = await getEmployeeDetails(employeeId);
        setEmployee({ ...empDetails, ...empResult });
    }
    const editEmployee = () => navigate(`/employee/edit/${id}`);
    const back = () => navigate('/employee');

    return (
        <div className='emp-details'>
            <Heading name="Details" />
            <div className="btn-row">
                <button className='edit-btn' onClick={editEmployee}>Edit</button>
                <button className="back" onClick={back}>Back</button>
            </div>
            <div className='emp-details-content'>
                <div className="form-group">
                    <label htmlFor="empFirstName">First Name</label>
                    <input
                        type="text"
                        id="empFirstName"
                        name="empFirstName"
                        placeholder="First Name"
                        value={employee.empFirstName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="empMiddleName">Middle Name</label>
                    <input
                        type="text"
                        id="empMiddleName"
                        name="empMiddleName"
                        placeholder="Middle Name"
                        value={employee.empMiddleName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="empLastName">Last Name</label>
                    <input
                        type="text"
                        id="empLastName"
                        name="empLastName"
                        placeholder="Last Name"
                        value={employee.empLastName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="empTitle">Title</label>
                    <input
                        type="text"
                        id="empTitle"
                        name="empTitle"
                        placeholder="Title"
                        value={employee.empTitle}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="empDesignId">Designation</label>
                    <input
                        type="text"
                        id="empDesignId"
                        name="empDesignId"
                        placeholder="Designation"
                        value={employee.empDesignation}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="officeRoomNo">Office Room</label>
                    <input
                        type="text"
                        id="officeRoomNo"
                        name="officeRoomNo"
                        placeholder="Office Room"
                        value={employee.officeRoomNo}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="labId">Lab Name</label>
                    <input
                        type="text"
                        id="labId"
                        name="labId"
                        placeholder="Lab Name"
                        value={employee.labFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="addlDesign">Additional Designation</label>
                    <input
                        type="text"
                        id="addlDesign"
                        name="addlDesign"
                        placeholder="Additional Designation"
                        value={employee.addlDesign}
                        readOnly
                    />
                </div>
            </div>


            {employee.telephone.map((tel, index) => (
                <div className="emp-details-content" key={index}>
                    <div className="form-group">
                        <label htmlFor={`telephoneNumber-${index}`}>Telephone Number</label>
                        <input
                            type="text"
                            id={`telephoneNumber-${index}`}
                            name="telephoneNumber"
                            placeholder="Telephone Number"
                            value={tel.telephoneNumber}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`telephoneCategory-${index}`}>Telephone Category</label>
                        <input
                            type="text"
                            id={`telephoneCategory-${index}`}
                            name="telephoneCategory"
                            placeholder="Telephone Category"
                            value={tel.telephoneCategory}
                            readOnly
                        />
                    </div>
                </div>
            ))}
            {employee.mail.map((mail, index) => (
                <div className="emp-details-content" key={index}>
                    <div className="form-group">
                        <label htmlFor={`email-${index}`}>Email</label>
                        <input
                            type="text"
                            id={`email-${index}`}
                            name="email"
                            placeholder="Email"
                            value={mail.email}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={`mailCategory-${index}`}>Mail Category</label>
                        <input
                            type="text"
                            id={`mailCategory-${index}`}
                            name="mailCategory"
                            placeholder="Mail Category"
                            value={mail.mailCategory}
                            readOnly
                        />
                    </div>
                </div>
            ))}

            <div className="emp-details-content">

                <div className="form-group">
                    <label htmlFor="addressLine1">Address Line 1</label>
                    <input
                        type="text"
                        id="addressLine1"
                        name="addressLine1"
                        placeholder="Address Line 1"
                        value={employee.addressLine1}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine2">Address Line 2</label>
                    <input
                        type="text"
                        id="addressLine2"
                        name="addressLine2"
                        placeholder="Address Line 2"
                        value={employee.addressLine2}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="addressLine3">Address Line 3</label>
                    <input
                        type="text"
                        id="addressLine3"
                        name="addressLine3"
                        placeholder="Address Line 3"
                        value={employee.addressLine3}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cityId">City</label>
                    <input
                        type="text"
                        id="cityId"
                        name="cityId"
                        placeholder="City"
                        value={employee.cityFullName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zipcodeId">Zipcode</label>
                    <input
                        type="text"
                        id="zipcodeId"
                        name="zipcodeId"
                        placeholder="Zipcode"
                        value={employee.zipcode}
                        readOnly
                    />
                </div>
            </div>

        </div>
    );
};

export default EmployeeDetails;