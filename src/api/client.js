const API_BASE_URL = 'http://localhost:5001/api';

export const api = {
    getEmployees: async () => {
        const response = await fetch(`${API_BASE_URL}/employees`);
        if (!response.ok) throw new Error('Failed to fetch employees');
        return response.json();
    },

    addEmployee: async (employeeData) => {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to add employee');
        return response.json();
    },

    updateEmployee: async (id, employeeData) => {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to update employee');
        return response.json();
    },

    deleteEmployee: async (id) => {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete employee');
        return response.json();
    },

    addTask: async (employeeId, taskData) => {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Failed to add task');
        return response.json();
    },

    updateTaskStatus: async (employeeId, taskId, status) => {
        const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
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
