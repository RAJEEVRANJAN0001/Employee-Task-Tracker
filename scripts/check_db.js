import mongoose from 'mongoose';
import { Employee } from '../server/models/Employee.js';

const MONGODB_URI = 'mongodb+srv://ARC-RESUME:69O52bQXpzSHroMS@clusterarc.kxpp16z.mongodb.net/employee-tracker?retryWrites=true&w=majority';

const checkDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const count = await Employee.countDocuments();
        console.log(`Total employees in DB: ${count}`);

        if (count > 0) {
            const first = await Employee.findOne();
            console.log('First employee:', JSON.stringify(first, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking database:', error);
        process.exit(1);
    }
};

checkDb();
