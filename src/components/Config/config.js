
//SPRING API URLS
const baseSpringURL = "http://localhost:8080";

// Getting data
    //Employee's URL
    const empMasterURL = `${baseSpringURL}/emp/em`;
    const empDesignationURL = `${baseSpringURL}/emp/ed`;

    export const empDesignationDropDownURL = `${empDesignationURL}/dropdown`;

    // Lab's URL
    const labMasterURL = `${baseSpringURL}/lab` ;

// Searching

    //Employee's URL
    const empMasterSearchURL = `${empMasterURL}/search`;
    const empDesignationSearchURL = `${empDesignationURL}/search`;

    export const empDesignationDropDownSearchURL = `${empDesignationDropDownURL}/search`;

    //Lab's URL
    const labMasterSearchURL = `${labMasterURL}/search`;

//Insertion
    //Employee's URL
    const createEmpMasterURL = `${empMasterURL}`;
    const createEmpDesignationURL = `${empDesignationURL}`;

    //Lab's URL
    const createLabMasterURL = `${labMasterURL}`;

export default{
    empMasterURL,
    empDesignationURL,
    empDesignationDropDownURL,
    labMasterURL,
    empMasterSearchURL,
    empDesignationSearchURL,
    empDesignationDropDownSearchURL,
    labMasterSearchURL,
    createEmpMasterURL,
    createEmpDesignationURL,
    createLabMasterURL
}