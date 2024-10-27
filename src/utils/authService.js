import api from './axiosConfig';

// Register user
export const registerUser = async (userData) => {
    return await api.post('/auth/register', userData);
};

// Login user
export const loginUser = async (credentials) => {
    return await api.post('/auth/login', credentials);
};

// Logout user
export const logoutUser = async () => {
    return await api.post('/auth/logout');
};

// Get current user info
export const getCurrentUser = async () => {
    return await api.get('/auth/profile');
};

// Get active sessions
export const getUserSessions = async () => {
    return await api.get('/auth/sessions');
};

// Delete a specific session
export const deleteSession = async (sessionId) => {
    return await api.delete(`/auth/sessions/${sessionId}`);
};

// Delete all sessions
export const deleteAllSessions = async () => {
    return await api.delete('/auth/sessions');
};
