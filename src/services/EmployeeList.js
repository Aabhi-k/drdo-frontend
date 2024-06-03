import axios from 'axios';

const empMasterURL = "http://localhost:8080/emp/em";
const empDesignationURL = "http://localhost:8080/emp/ed";

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
