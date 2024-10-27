import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
