import axios from 'axios';
import config from '../components/Config/config';

// GET Emp Master 
export const getEmpList = async (pageNo, sizeNo) => {

    try{
        const response = await axios.get(config.empMasterURL,{
                params: {page: pageNo, size: sizeNo }
            }
        );
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}
// GET Emp Designation
export const getEmpDesignation = async (pageNo, sizeNo) => {
    try{ 
        const response = await axios.get(config.empDesignationURL, {
            params: {page: pageNo, size: sizeNo }
        });
        return response.data;

    }catch(error){
        console.error(error);
        throw error;
    }
}



// Search Emp Master
export const searchEmpMaster = async (searchTerm, pageNo, sizeNo) => {
    try{
        const response = await axios.get(config.empMasterSearchURL,{
            params:{query : searchTerm, page : pageNo, size : sizeNo}
        });
        return response.data;
        
    }catch(error){
        console.error(error);
        throw error;
    }
}
// Search Emp Designation
export const searchEmpDesignation = async (searchTerm, pageNo, sizeNo) => {
    try{
        const response = await axios.get(config.empDesignationSearchURL, {
            params:{query : searchTerm, page : pageNo, size : sizeNo}
        });
        return response.data;
    }catch(error){
        throw error;
    }
}




