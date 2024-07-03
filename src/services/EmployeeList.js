import axios from 'axios';
import config from '../components/Config/config';
import { baseSpringURL } from '../components/Config/config';
import api from './login';

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
        return response.data;
    } catch (error) {
        console.error('Error fetching employee list:', error);
        throw error;
    }
};

// GET Employee Designation
export const getEmpDesignation = async (pageNo, sizeNo) => {
    try {
        const response = await api.get(config.empDesignationURL, { params: { page: pageNo, size: sizeNo } });
        return response.data;
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
        return response.data;
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
        return response.data;
    } catch (error) {
        console.error('Error searching employee master:', error);
        throw error;
    }
};

// Search Employee Designation
export const searchEmpDesignation = async (searchTerm, pageNo, sizeNo) => {
    try {
        const response = await api.get(config.empDesignationSearchURL, { params: { query: searchTerm, page: pageNo, size: sizeNo } });
        return response.data;
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
        return response.data;
    } catch (error) {
        console.error('Error searching lab master:', error);
        throw error;
    }
};

// Create Employee Master
export const createEmpMaster = async (employeeData) => {
    try {
        const response = await api.post(config.createEmpMasterURL, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error creating employee master:', error);
        throw error;
    }
};

export const createLabMaster = async (labData) => {
    try {
        const response = await api.post(config.createLabMasterURL, labData);
        return response.data;
    } catch (error) {
        console.error('Error creating lab master:', error);
        throw error;
    }
};

export const createLabAddress = async (addressData) => {
    try {
        const response = await api.post(config.createLabAddressURL, addressData);
        return response.data;
    } catch (error) {
        console.error('Error creating lab address:', error);
        throw error;
    }
}


// Create Employee Address
export const createEmpAddress = async (addressData) => {
    try {
        const response = await api.post(config.createEmpAddressURL, addressData);
        return response.data;
    } catch (error) {
        console.error('Error creating employee address:', error);
        throw error;
    }
};

export const dropdownSearch = async (url, searchTerm) => {
    try {
        const response = await api.get(url, {
            params: { query: searchTerm },
        });
        return response.data.content;
    } catch (error) {
        console.error("Error fetching options:", error);
        throw error;
    }
};


export const getEmployeeDetails = async (id) => {
    try {
        const response = await api.get(`${config.empDetailsURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching employee details:', error);
        throw error;
    }
}

