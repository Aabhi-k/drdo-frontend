// SPRING API URLS
export const baseSpringURL = "http://localhost:8080/api";
const baseDropdownURL = `${baseSpringURL}/dropdown`;

// Getting data
// Employee's URL
const empMasterURL = "/emp/list";
const empDetailsURL = `${empMasterURL}/details`;

const empDesignationURL = "/emp/designation";

// Lab's URL
const labMasterURL = "/lab";

// Searching
// Employee's URL
const empMasterSearchURL = `${empMasterURL}/search`;
const empDesignationSearchURL = `${empDesignationURL}/search`;

// Lab's URL
const labMasterSearchURL = `${labMasterURL}/search`;

// DropDown Menu URL
export const labMasterDropDownSearchURL = `${baseDropdownURL}/lab/list/search`;
export const labCategoryDropDownSearchURL = `${baseDropdownURL}/lab/category/search`;
export const labClusterDropDownSearchURL = `${baseDropdownURL}/lab/cluster/search`;
export const cityDropDownSearchURL = `${baseDropdownURL}/city/search`;
export const empDesignationDropDownSearchURL = `${baseDropdownURL}/emp/designation/search`;
export const empRoleDropDownSearchURL = `${baseDropdownURL}/emp/role/search`;
export const zipcodeDropDownSearchURL = `${baseDropdownURL}/zipcode/search`;

// Insertion
// Employee's URL
const createEmpMasterURL = `${empMasterURL}`;
const createEmpDesignationURL = `${empDesignationURL}`;
const createEmpAddressURL = `${baseSpringURL}/address`;
// Lab's URL
const createLabMasterURL = `${labMasterURL}`;
const createLabAddressURL = `${baseSpringURL}/address`;

// Login
const loginUserURL = `${baseSpringURL}/auth/login`;

export default {
    empMasterURL,
    empDetailsURL,
    empDesignationURL,
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
};
