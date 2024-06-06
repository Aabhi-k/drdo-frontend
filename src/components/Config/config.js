
// WEBPAGE URLS

const baseReactURL = "http://localhost:3000/";

// Employees's URL 



//SPRING API URLS
const baseSpringURL = "http://localhost:8080/";

// Getting data
    //Employee's URL
    const empMasterURL = `${baseSpringURL}/emp/em`;
    const empDesignationURL = `${baseSpringURL}/emp/ed`;

    // Lab's URL
    const labMasterURL = `${baseSpringURL}/lab` ;

// Searching

    //Employee's URL
    const empMasterSearchURL = `${empMasterURL}/search`;
    const empDesignationSearchURL = `${empDesignationURL}/search`;

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
    labMasterURL,
    empMasterSearchURL,
    empDesignationSearchURL,
    labMasterSearchURL,
    createEmpMasterURL,
    createEmpDesignationURL,
    createLabMasterURL
}