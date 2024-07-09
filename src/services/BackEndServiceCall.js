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
// Updated catch blocks to use handleHttpError and return []

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
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
    }
};

export const createLabMaster = async (labMasterDTO, labAddressDTO, labEpabxDTO, labFaxMasterDTO, labTelephoneMasterDTO) => {
    try {
        const response = await api.post(config.createLabMasterURL, labMasterDTO);
        if(response.status === 200) {
            return response.data;
        }
        else {
            handleHttpError(response.status);
        }
    } catch (error) {
        handleHttpError(error.response.status);
        return [];
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
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
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
        handleHttpError(error.response.status);
        return [];
    }
}

// Get lab Details

export const getLabDetails = async (id) => {
    try {
        const response = await api.get(`${config.labDetailsURL}/${id}`);
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
        return [];
    }
}