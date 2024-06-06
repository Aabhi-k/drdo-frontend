import React, { useState } from "react";

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

    return (

        <form onSubmit={handleCreateEmployee} className="create-emp">
            <input type="text" placeholder="Title" value={newEmployeeData.empTitle}
                onChange={(e) => setNewEmployeeData({ ...newEmployeeData, empTitle: e.target.value })} />

            <input type="text" placeholder="First Name " onChange={(e) => setNewEmployeeData({ ...newEmployeeData, empFirstName: e.target.value })}  />
            <input type="text" placeholder="Middle Name" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, empMiddleName: e.target.value })}  />
            <input type="text" placeholder="Last Name" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, empLastName: e.target.value })}  />
            {/* vvvv */}
            <input type="text" placeholder="Designation" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, empDesignId: e.target.value })}  />

            <input type="text" placeholder="Office Room" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, officeRoomNo: e.target.value })}  />
            {/* vvvv */}
            <input type="text" placeholder="Lab Name" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, labId: e.target.value })}  />
            {/* vvvv */}
            <input type="text" placeholder="Employee Role" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, addlDesign: e.target.value })}  />
            
            <input type="text" placeholder="Additional Designation" onChange={(e) => setNewEmployeeData({ ...newEmployeeData, empRoleId: e.target.value })}  />

            <button className="submit-btn" type="submit"> Create Employee</button>
        </form>
    );

}

export default CreateEmpList;