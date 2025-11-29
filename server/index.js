import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Employee } from './models/Employee.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB using environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('ERROR: MONGODB_URI environment variable is not set!');
    console.error('Please set MONGODB_URI in your Vercel environment variables.');
} else {
    mongoose.connect(MONGODB_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.error('MongoDB connection error:', err);
            console.error('Make sure MONGODB_URI is correctly configured in Vercel.');
        });
}

// Routes

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new employee
app.post('/api/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add task to employee
app.post('/api/employees/:id/tasks', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        employee.tasks.push(req.body);
        const updatedEmployee = await employee.save();
        res.status(201).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update task status
app.patch('/api/employees/:employeeId/tasks/:taskId', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });

        const task = employee.tasks.id(req.params.taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (req.body.status) task.status = req.body.status;
        task.updatedAt = new Date();

        await employee.save();
        res.json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Seed database with initial data
app.post('/api/seed', async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        if (count === 0) {
            const employeesData = req.body; // Expecting array of employees
            if (Array.isArray(employeesData) && employeesData.length > 0) {
                await Employee.insertMany(employeesData);
                res.json({ message: 'Database seeded successfully' });
            } else {
                res.status(400).json({ message: 'Invalid seed data' });
            }
        } else {
            res.json({ message: 'Database already has data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
