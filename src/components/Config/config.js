// SPRING API URLS
export const baseSpringURL = "http://localhost:8080/api";
const baseDropdownURL = `${baseSpringURL}/dropdown`;
const baseDisplayURL = `${baseSpringURL}/dropdown/get`;

// Getting data
// Employee's URL
const empMasterURL = "/emp/list";
const empDetailsURL = `${empMasterURL}/details`;
const empAddressDetailsURL = `${baseSpringURL}/address/details`;
const empDesignationURL = "/emp/designation";


const getEmpDetailsURL = `${empMasterURL}`;
const getEmpAddressURL = `${baseSpringURL}/address`;
const getEmpTelephoneURL = `${baseSpringURL}/emp/telephone`;
// Lab's URL
const labMasterURL = "/lab";

// Searching
// Employee's URL
const empMasterSearchURL = `${empMasterURL}/search`;
const empDesignationSearchURL = `${empDesignationURL}/search`;

// Lab's URL
const labMasterSearchURL = `${labMasterURL}/search`;

// DropDown Menu URL
// Searching
export const labMasterDropDownSearchURL = `${baseDropdownURL}/lab/list/search`;
export const labCategoryDropDownSearchURL = `${baseDropdownURL}/lab/category/search`;
export const labClusterDropDownSearchURL = `${baseDropdownURL}/lab/cluster/search`;
export const cityDropDownSearchURL = `${baseDropdownURL}/city/search`;
export const empDesignationDropDownSearchURL = `${baseDropdownURL}/emp/designation/search`;
export const empRoleDropDownSearchURL = `${baseDropdownURL}/emp/role/search`;
export const zipcodeDropDownSearchURL = `${baseDropdownURL}/zipcode/search`;
export const telephoneCategoryDropDownSearchURL = `${baseDropdownURL}/telephone/category/search`;
// Display
export const empDesignationDisplayURL = `${baseDisplayURL}/designation`;
export const empRoleDisplayURL = `${baseDisplayURL}/role`;
export const labMasterDisplayURL = `${baseDisplayURL}/lab`;
export const cityDisplayURL = `${baseDisplayURL}/city`;
export const zipcodeDisplayURL = `${baseDisplayURL}/zipcode`;
export const telephoneCategoryDisplayURL = `${baseDisplayURL}/telephone/category`;

// Insertion
// Employee's URL
const createEmpMasterURL = `${empMasterURL}`;
const createEmpDesignationURL = `${empDesignationURL}`;
const createEmpAddressURL = `${baseSpringURL}/address`;
const createEmpTelephoneURL = `${baseSpringURL}/emp/telephone`;
// Lab's URL
const createLabMasterURL = `${labMasterURL}`;
const createLabAddressURL = `${baseSpringURL}/address`; // update

// Editing
// Employee's URL
const editEmpMasterURL = `${empMasterURL}/edit`;
const editEmpTelephoneURL = `${baseSpringURL}/emp/telephone/edit`;
const editEmpAddressURL = `${baseSpringURL}/address/edit`;
// Lab's URL



// Login
const loginUserURL = `${baseSpringURL}/auth/login`;

export default {
    empMasterURL,
    empDetailsURL,
    getEmpDetailsURL,
    getEmpAddressURL,
    getEmpTelephoneURL,
    empDesignationURL,
    empAddressDetailsURL,
    labMasterURL,
    empMasterSearchURL,
    empDesignationSearchURL,
    empDesignationDropDownSearchURL,
    labMasterSearchURL,
    createEmpMasterURL,
    createEmpDesignationURL,
    createLabMasterURL,
    loginUserURL,
    createEmpAddressURL,
    createLabAddressURL,
    createEmpTelephoneURL,
    editEmpMasterURL,
    editEmpTelephoneURL,
    editEmpAddressURL,
};
