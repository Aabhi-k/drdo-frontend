import axios from "axios";
import config, { baseSpringURL } from "../components/Config/config";
import { jwtDecode } from "jwt-decode";

// Function to login the user and return the JWT token
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(config.loginUserURL, userData);
        const { accessToken, username } = response.data;

        console.log(username);
        localStorage.setItem('username', username);
        localStorage.setItem('token', accessToken);
        setAuthToken(localStorage.getItem("token"));
    } catch (error) {
        throw error;
    }
};

const api = axios.create({
    baseURL: baseSpringURL,
});
api.defaults.headers['Content-Type'] = 'application/json'; // Default header for all api requests

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const checkTokenExpiration = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() >= expirationTime;
};

export const getRoleFromToken = () => {
    const token = localStorage.getItem("token");

    if(!token){
        console.log("no token");
        return;
    }
    const decodedToken = jwtDecode(token);
    const roles = decodedToken.roles;
    return roles;
}

// Request Interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && !checkTokenExpiration(token)) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
        // Perform actions like redirecting to login page
        console.log('Token expired. Please login again.');
        // Optionally, clear token from storage
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
export default api;
