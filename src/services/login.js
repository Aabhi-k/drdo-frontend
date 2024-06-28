import axios from "axios";
import config, { baseSpringURL } from "../components/Config/config";

// Function to login the user and return the JWT token
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(config.loginUserURL, userData);
        const token = response.data.accessToken;

        localStorage.setItem('token', token);
    } catch (error) {
        throw error;
    }
};

const api = axios.create({
    baseURL: baseSpringURL, 
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const checkTokenExpiration = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() >= expirationTime;
};

const refreshToken = async () => {
    try {
        const response = await axios.post(config.refreshTokenURL, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const newToken = response.data.accessToken;
        localStorage.setItem('token', newToken);
        return newToken;
    } catch (error) {
        console.error('Failed to refresh token', error);
        throw error;
    }
};
api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = localStorage.getItem('token');
        if (token && checkTokenExpiration(token)) {
          try {
            const newToken = await refreshToken(); // Assuming refreshToken returns a new token
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure, e.g., redirect to login page
            console.error('Refresh token failed:', refreshError);
            // Optionally handle logout or redirect to login page
          }
        }
      }
      // Return the original error if conditions are not met
      return Promise.reject(error);
    }
  );
  
  

export default api;
