import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // Update with your backend base URL
    withCredentials: true // Include cookies with each request
});

// Add a request interceptor to automatically attach the access token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Try refreshing the token
            try {
                await axios.post('/auth/refresh', {}, { withCredentials: true });
                return api(originalRequest); // Retry the original request with the new access token
            } catch (refreshError) {
                // Handle refresh token failure (redirect to login or show an error)
                console.error('Token refresh failed:', refreshError);
                // Redirect to login or notify the user
            }
        }
        return Promise.reject(error);
    }
);

export default api;
