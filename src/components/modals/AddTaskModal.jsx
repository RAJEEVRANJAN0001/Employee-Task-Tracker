import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getAllStatuses } from '../../utils/statusColors';

/**
 * AddTaskModal component for creating new tasks
 */
const AddTaskModal = ({ isOpen, onClose, employees, onAddTask, isSidebarCollapsed }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        employeeId: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }
        if (!formData.employeeId) {
            newErrors.employeeId = 'Please select an employee';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onAddTask(formData);

        // Reset form
        setFormData({
            title: '',
            description: '',
            status: 'Pending',
            employeeId: '',
        });
        setErrors({});
        onClose();
    };

    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            status: 'Pending',
            employeeId: '',
        });
        setErrors({});
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="modal-backdrop"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
                        transition={{ type: 'spring', duration: 0.3 }}
                        className="fixed left-1/2 top-1/2 w-full max-w-lg p-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold gradient-text">
                                Add New Task
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleClose}
                                className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                            </motion.button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Task Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                    Task Title <span className="text-gray-900 dark:text-gray-100">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={`input ${errors.title ? 'border-gray-900 focus:ring-gray-900' : ''}`}
                                    placeholder="Enter task title"
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{errors.title}</p>
                                )}
                            </div>

                            {/* Task Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                    Description (Optional)
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="input resize-none"
                                    placeholder="Enter task description"
                                />
                            </div>

                            {/* Task Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                    Status <span className="text-gray-900 dark:text-gray-100">*</span>
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    {getAllStatuses().map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Assign Employee */}
                            <div>
                                <label htmlFor="employeeId" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                    Assign to Employee <span className="text-gray-900 dark:text-gray-100">*</span>
                                </label>
                                <select
                                    id="employeeId"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    className={`input ${errors.employeeId ? 'border-gray-900 focus:ring-gray-900' : ''}`}
                                >
                                    <option value="">Select an employee</option>
                                    {employees.map(employee => (
                                        <option key={employee.id} value={employee.id}>
                                            {employee.name} - {employee.role}
                                        </option>
                                    ))}
                                </select>
                                {errors.employeeId && (
                                    <p className="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{errors.employeeId}</p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="flex-1 btn btn-primary"
                                >
                                    Add Task
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 btn btn-secondary"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddTaskModal;
