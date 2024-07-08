import config from '../components/Config/config';
import api from './login';
import { handleHttpError } from '../components/Config/HandleError';


// Helper function to build query strings from filters
const buildQueryString = (filters, pageNo, sizeNo, searchTerm = '') => {
    const filtersQueryString = Object.entries(filters)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    const searchQueryString = searchTerm ? `query=${encodeURIComponent(searchTerm)}&` : '';
    return `${searchQueryString}${filtersQueryString}&page=${encodeURIComponent(pageNo)}&size=${encodeURIComponent(sizeNo)}`;
};

// GET Employee Master
export const getEmpList = async (filters, pageNo, sizeNo) => {
    try {
        const queryString = buildQueryString(filters, pageNo, sizeNo);
        const response = await api.get(`${config.empMasterURL}?${queryString}`);
        
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        handleHttpError(error.response.status);
    }
};

// GET Employee Designation
export const getEmpDesignation = async (pageNo, sizeNo) => {
    try {
        const response = await api.get(config.empDesignationURL, { params: { page: pageNo, size: sizeNo } });
        
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching employee designation:', error);
        throw error;
    }
};

// GET Lab Master
export const getLabList = async (filters, pageNo, sizeNo) => {
    try {
        const queryString = buildQueryString(filters, pageNo, sizeNo);
        const response = await api.get(`${config.labMasterURL}?${queryString}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching lab list:', error);
        throw error;
    }
};

// Search Employee Master
export const searchEmpMaster = async (searchTerm, filters, pageNo, sizeNo) => {
    try {
        const queryString = buildQueryString(filters, pageNo, sizeNo, searchTerm);
        const response = await api.get(`${config.empMasterSearchURL}?${queryString}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error searching employee master:', error);
        throw error;
    }
};

// Search Employee Designation
export const searchEmpDesignation = async (searchTerm, pageNo, sizeNo) => {
    try {
        const response = await api.get(config.empDesignationSearchURL, { params: { query: searchTerm, page: pageNo, size: sizeNo } });
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error searching employee designation:', error);
        throw error;
    }
};

// Search Lab Master
export const searchLabMaster = async (searchTerm, filters, pageNo, sizeNo) => {
    try {
        const queryString = buildQueryString(filters, pageNo, sizeNo, searchTerm);
        const response = await api.get(`${config.labMasterSearchURL}?${queryString}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error searching lab master:', error);
        throw error;
    }
};
// Create Employee Master
export const createEmpMaster = async (empMaster, empTelephoneMasterDTOs, empMailMasterDTOs, empResidentialAddressDTO) => {
    
    try {
        const response = await api.post(config.createEmpMasterURL, {
            empMaster: empMaster,
            empTelephoneMasterDTOs: empTelephoneMasterDTOs,
            empMailMasterDTOs: empMailMasterDTOs,
            empResidentialAddressDTO: empResidentialAddressDTO
        });
        if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error creating employee master:', error);
        throw error;
    }
};

export const createLabMaster = async (labData) => {
    try {
        const response = await api.post(config.createLabMasterURL, labData);
        if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error creating lab master:', error);
        throw error;
    }
};

export const dropdownSearch = async (url, searchTerm) => {
    try {
        const response = await api.get(url, {
            params: { query: searchTerm },
        });
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data.content;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        handleHttpError(error.response.status);
    }
};

export const getDropdownDisplay = async (displayURL, initialValue) => {
    try {
        const response = await api.get(`${displayURL}/${initialValue}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error("Error fetching display value:", error);
        throw error;
    }

}

export const getEmployeeDetails = async (id) => {
    try {
        const response = await api.get(`${config.empDetailsURL}/${id}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching employee details:', error);
        throw error;
    }
}
export const getEmployeeEditDetails = async (id) => {
    try {
        const response = await api.get(`${config.getEmpDetailsURL}/${id}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching employee edit details:', error);
        throw error;
    }
}

export const getEmployeeAddress = async (id) => {
    try {
        const response = await api.get(`${config.getEmpAddressURL}/${id}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching employee address:', error);
        throw error;
    }
}

export const getEmployeeTelephone = async (id) => {
    try {
        const response = await api.get(`${config.getEmpTelephoneURL}/${id}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching employee telephone:', error);
        throw error;
    }
}
export const getEmployeeMail = async (id) => {
    try {
        const response = await api.get(`${config.getEmpMailURL}/${id}`);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error fetching employee mail:', error);
        throw error;
    }
}

// Edit Employee Master
export const editEmpMaster = async (id, employeeData) => {
    try {
        const response = await api.put(`${config.editEmpMasterURL}/${id}`, employeeData);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error editing employee master:', error);
        throw error;
    }
}

// Edit Employee Address

export const editEmpAddress = async (id, addressData) => {
    try {
        const response = await api.put(`${config.editEmpAddressURL}/${id}`, addressData);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error editing employee address:', error);
        throw error;
    }
}

// Edit Employee Telephone
export const editEmpTelephone = async (id, telephoneData) => {
    try {
        const response = await api.put(`${config.editEmpTelephoneURL}/${id}`, telephoneData);
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        console.error('Error editing employee telephone:', error);
        throw error;
    }
}




