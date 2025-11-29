import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Employee } from '../server/models/Employee.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGODB_URI = 'mongodb+srv://ARC-RESUME:69O52bQXpzSHroMS@clusterarc.kxpp16z.mongodb.net/employee-tracker?retryWrites=true&w=majority';

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Read data
        const dataPath = path.join(__dirname, '../src/data/employees.json');
        const employeesData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Clear existing data
        await Employee.deleteMany({});
        console.log('Cleared existing employees');

        // Insert new data
        // Remove 'id' field as MongoDB uses '_id'
        const employeesToInsert = employeesData.map(emp => {
            const { id, ...rest } = emp;
            return rest;
        });

        await Employee.insertMany(employeesToInsert);
        console.log(`Seeded ${employeesToInsert.length} employees`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
