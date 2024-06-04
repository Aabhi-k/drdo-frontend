import axios from 'axios';

const baseURL = "http://localhost:8080/emp";

const empMasterURL = `${baseURL}/em`;
const empDesignationURL = `${baseURL}/ed`;
const searchURL = `${baseURL}/search`;

export const getEmpList = async () => {

    try{
        const response = await axios.get(empMasterURL);
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}

export const getEmpDesignation = async () => {
    try{ 
        const response = await axios.get(empDesignationURL);
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}

export const searchEmp = async (searchTerm) => {
    try{
        const response = await axios.get(searchURL,{
            params:{query : searchTerm}
        });
        return response.data;
        
    }catch(error){
        console.error(error);
        throw error;
    }
}
