import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, Calendar, Edit2, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import TaskList from './TaskList';

/**
 * EmployeeCard component displaying employee info and tasks
 */
const EmployeeCard = ({ employee, index, onTaskStatusChange, highlightedTaskId, onEdit, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // New state for hover

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
    const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
        setIsHovered(true); // Set hovered state
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false); // Reset hovered state
    };

    const completedTasks = employee.tasks?.filter(t => t.status === 'Completed').length || 0;
    const totalTasks = employee.tasks?.length || 0;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-100 dark:border-secondary-700 overflow-hidden"
        >
            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(employee);
                    }}
                    className="p-2 bg-white dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 rounded-lg shadow-sm hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    title="Edit Employee"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(employee.id);
                    }}
                    className="p-2 bg-white dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    title="Delete Employee"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-secondary-800 dark:to-secondary-900 opacity-50" />

            {/* Shimmer effect on hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.6 }}
            />

            {/* Animated gradient border on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />

            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-300/5 to-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Floating badge with pulse animation */}
            <motion.div
                animate={{
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-4 right-4 z-20"
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-sky-300 rounded-full blur-md opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-r from-sky-300 to-sky-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {employee.tasks.length}
                    </div>
                </div>
            </motion.div>

            {/* Employee Header */}
            <div className="p-6 relative z-10">
                <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-300 to-sky-400 p-0.5">
                            <img
                                src={employee.avatar}
                                alt={employee.name}
                                className="w-full h-full rounded-full bg-white dark:bg-secondary-800"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-700 rounded-full border-2 border-white dark:border-secondary-800 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{totalTasks}</span>
                        </div>
                    </div>

                    {/* Role & Department */}
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">
                            {employee.name}
                        </h3>
                        <p className="text-sm text-secondary-500 dark:text-secondary-400 font-medium">
                            {employee.role}
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-secondary-400">
                            <span className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 rounded-full">
                                {employee.department}
                            </span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="text-center mb-6">
                        <a href={`mailto:${employee.email}`} className="text-sm text-secondary-500 hover:text-primary-500 transition-colors">
                            {employee.email}
                        </a>
                    </div>
                </div>

                {/* Task Stats */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary-600 dark:text-secondary-400">Progress</span>
                        <span className="font-semibold text-secondary-900 dark:text-secondary-100">
                            {completedTasks}/{totalTasks} tasks
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"
                        />
                    </div>

                    <div className="text-xs text-secondary-500 dark:text-secondary-400 text-right">
                        {progress}% complete
                    </div>
                </div>

                {/* Expand Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full mt-4 btn btn-secondary flex items-center justify-center gap-2"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Hide' : 'Show'} tasks for ${employee.name}`}
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            Hide Tasks
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            View Tasks
                        </>
                    )}
                </motion.button>
            </div>

            {/* Task List (Expandable) */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-secondary-200 dark:border-secondary-700"
                    >
                        <TaskList
                            tasks={employee.tasks}
                            employeeId={employee.id}
                            onTaskStatusChange={onTaskStatusChange}
                            highlightedTaskId={highlightedTaskId}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EmployeeCard;
