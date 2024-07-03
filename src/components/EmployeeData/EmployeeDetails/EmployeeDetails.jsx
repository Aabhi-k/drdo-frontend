import React, { useEffect, useState } from 'react';
import './EmployeeDetails.css';
import Heading from '../../Heading/Heading';
import { useParams } from 'react-router-dom';
import { getEmployeeDetails } from '../../../services/EmployeeList';

const empDetails = {
    empTitle: '',
    empFirstName: '',
    empMiddleName: '',
    empLastName: '',
    designShortName: '',
    officeRoomNo: '',
    labFullName: '',
    addlDesign: '',
}
const addressDetails = {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    cityId: '',
    zipcodeId: '',
    empId: '',
}
const EmployeeDetails = () => {
    const [employee, setEmployee] = useState(empDetails);
    const { id } = useParams(); // Move useParams here

    useEffect(() => {
        fetchEmployeeDetails(id); // Pass id as an argument

    }, [id]); // Add id as a dependency

    const fetchEmployeeDetails = async (employeeId) => {
        console.log(employeeId);
        // Call the API to fetch employee details
        const result = await getEmployeeDetails(employeeId);
        setEmployee(result);

    }
    return (
        <div className='emp-details'>
            <Heading name="Details" />
            <div className='emp-details-content'>
                <div className="form-group">
                    <label htmlFor="empFirstName">First Name</label>
                    <input
                        type="text"
                        id="empFirstName"
                        name="empFirstName"
                        placeholder="Enter First Name"
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
                        placeholder="Enter Middle Name"
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
                        placeholder="Enter Last Name"
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
                        placeholder="Enter Title"
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
                        placeholder="Enter Designation"
                        value={employee.designShortName}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="officeRoomNo">Office Room</label>
                    <input
                        type="text"
                        id="officeRoomNo"
                        name="officeRoomNo"
                        placeholder="Enter Office Room"
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
                        placeholder="Enter Lab Name"
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
        </div>
    );
};

export default EmployeeDetails;