import axios from 'axios';

const baseURL = "http://localhost:8080/emp";

const empMasterURL = `${baseURL}/em`;
const empDesignationURL = `${baseURL}/ed`;


const searchEmpMasterURL = `${empMasterURL}/search`;
const searchEmpDesignationURL = `${empDesignationURL}/search`;


export const getEmpList = async (pageNo, sizeNo) => {

    try{
        const response = await axios.get(empMasterURL,{
                params: {page: pageNo, size: sizeNo }
            }
        );
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}

export const getEmpDesignation = async (pageNo, sizeNo) => {
    try{ 
        const response = await axios.get(empDesignationURL, {
            params: {page: pageNo, size: sizeNo }
        });
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}

export const searchEmpMaster = async (searchTerm, pageNo, sizeNo) => {
    try{
        const response = await axios.get(searchEmpMasterURL,{
            params:{query : searchTerm, page : pageNo, size : sizeNo}
        });
        return response.data;
        
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const searchEmpDesignation = async (searchTerm, pageNo, sizeNo) => {
    try{
        const response = await axios.get(searchEmpDesignationURL, {
            params:{query : searchTerm, page : pageNo, size : sizeNo}
        });
        return response.data;
    }catch(error){
        throw error;
    }
}
