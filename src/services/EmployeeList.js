import axios from 'axios';

const baseURL = "http://localhost:8080/emp";

const empMasterURL = `${baseURL}/em`;
const empDesignationURL = `${baseURL}/ed`;
const searchEmpURL = `${baseURL}/ed/search`;

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

export const searchEmp = async (searchTerm, pageNo, sizeNo) => {
    try{
        const response = await axios.get(searchEmpURL,{
            params:{query : searchTerm, page : pageNo, size : sizeNo}
        });
        return response.data;
        
    }catch(error){
        console.error(error);
        throw error;
    }
}
