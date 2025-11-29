// Automatically detect environment
const API_BASE_URL = import.meta.env.PROD
    ? '/api'  // Production: use relative path (Vercel will route to serverless function)
    : 'http://localhost:5001/api';  // Development: use local server

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

export const api = {
    // Authentication APIs
    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to sign up');
        }
        return response.json();
    },

    signin: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to sign in');
        }
        return response.json();
    },

    verifyToken: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to verify token');
        }
        return response.json();
    },

    updatePassword: async (passwordData) => {
        const response = await fetch(`${API_BASE_URL}/auth/update-password`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(passwordData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update password');
        }
        return response.json();
    },

    // Employee APIs (protected)
    getEmployees: async () => {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch employees');
        return response.json();
    },

    addEmployee: async (employeeData) => {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to add employee');
        return response.json();
    },

    updateEmployee: async (id, employeeData) => {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to update employee');
        return response.json();
    },

    deleteEmployee: async (id) => {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete employee');
        return response.json();
    },

    addTask: async (employeeId, taskData) => {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/tasks`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Failed to add task');
        return response.json();
    },

    updateTaskStatus: async (employeeId, taskId, status) => {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Failed to update task status');
        return response.json();
    },

    seedDatabase: async (data) => {
        const response = await fetch(`${API_BASE_URL}/seed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
