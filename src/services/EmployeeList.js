import axios from 'axios';
import config from '../components/Config/config';

// GET Emp Master 
export const getEmpList = async (filters, pageNo, sizeNo) => {
    try {
        const filtersQueryString = Object.entries(filters)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const url = `${config.empMasterURL}?${filtersQueryString}&page=${encodeURIComponent(pageNo)}&size=${encodeURIComponent(sizeNo)}`;

        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// GET Emp Designation
export const getEmpDesignation = async (pageNo, sizeNo) => {
    try {
        const response = await axios.get(config.empDesignationURL, {
            params: { page: pageNo, size: sizeNo }
        });
        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// GET lab master
export const getLabList = async (filters, pageNo, sizeNo) => {
    try {
        const filtersQueryString = Object.entries(filters)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const url = `${config.labMasterURL}?${filtersQueryString}&page=${encodeURIComponent(pageNo)}&size=${encodeURIComponent(sizeNo)}`;

        const response = await axios.get(url);
        return response.data;

    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

// Search Emp Master
export const searchEmpMaster = async (searchTerm, filters, pageNo, sizeNo) => {
    try {
        const filtersQueryString = Object.entries(filters)
            .map(([key, value]) => `${encodeURIComponent(`${key}`)}=${encodeURIComponent(value)}`)
            .join('&');

        // Construct the full URL with encoded parameters
        const url = `${config.empMasterSearchURL}?query=${encodeURIComponent(searchTerm)}&${filtersQueryString}&page=${encodeURIComponent(pageNo)}&size=${encodeURIComponent(sizeNo)}`;
        const response = await axios.get(url);

        return response.data;

    } catch (error) {
        console.error(error);
        throw error;
    }
}
// Search Emp Designation
export const searchEmpDesignation = async (searchTerm, pageNo, sizeNo) => {
    try {
        const response = await axios.get(config.empDesignationSearchURL, {
            params: { query: searchTerm, page: pageNo, size: sizeNo }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Search Lab Master
export const searchLabMaster = async (searchTerm, filters, pageNo, sizeNo) => {
    try {
        const filtersQueryString = Object.entries(filters)
            .map(([key, value]) => `${encodeURIComponent(`${key}`)}=${encodeURIComponent(value)}`)
            .join('&');

        const url = `${config.labMasterSearchURL}?query=${encodeURIComponent(searchTerm)}&${filtersQueryString}&page=${encodeURIComponent(pageNo)}&size=${encodeURIComponent(sizeNo)}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Create Emp Master
export const createEmpMaster = async (employeeData) =>{
    try{
        const response = axios.post(config.createEmpMasterURL, employeeData);
        return response.data;

    }catch (error){
        console.error(error);
        throw error;
    }

}




