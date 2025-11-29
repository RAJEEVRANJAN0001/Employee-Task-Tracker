import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bio: { type: String },
    avatar: String,
    tasks: [taskSchema]
}, { timestamps: true });

// Transform _id to id for frontend compatibility
employeeSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        if (ret.tasks) {
            ret.tasks.forEach(task => {
                task.id = task._id;
                delete task._id;
            });
        }
    }
});

export const Employee = mongoose.model('Employee', employeeSchema);
