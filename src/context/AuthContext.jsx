import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await api.verifyToken();
                setUser(response.user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Token verification failed:', error);
                localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, []);

    const signup = async (userData) => {
        try {
            const response = await api.signup(userData);
            localStorage.setItem('token', response.token);
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const signin = async (credentials) => {
        try {
            const response = await api.signin(credentials);
            localStorage.setItem('token', response.token);
            setUser(response.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updatePassword = async (passwordData) => {
        try {
            await api.updatePassword(passwordData);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        signup,
        signin,
        logout,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
