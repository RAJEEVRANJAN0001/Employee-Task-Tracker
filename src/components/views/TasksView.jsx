import { motion } from 'framer-motion';
import { Search, Filter, Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import TaskItem from '../employees/TaskItem';
import { getStatusBadgeClasses } from '../../utils/statusColors';

/**
 * Tasks View - Dedicated page for all tasks
 */
const TasksView = ({ employees, onTaskStatusChange, onAddTask, highlightedTaskId }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    // Get all tasks from all employees
    const allTasks = useMemo(() => {
        return employees.flatMap(employee =>
            employee.tasks.map(task => ({
                ...task,
                employeeId: employee.id,
                employeeName: employee.name,
                employeeRole: employee.role,
            }))
        );
    }, [employees]);

    // Filter and sort tasks
    const filteredTasks = useMemo(() => {
        let tasks = allTasks;

        // Filter by status
        if (statusFilter !== 'All') {
            tasks = tasks.filter(task => task.status === statusFilter);
        }

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            tasks = tasks.filter(task =>
                task.title.toLowerCase().includes(query) ||
                task.description?.toLowerCase().includes(query) ||
                task.employeeName.toLowerCase().includes(query)
            );
        }

        // Sort tasks
        tasks.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'status') {
                const statusOrder = { 'Pending': 0, 'In Progress': 1, 'Completed': 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        return tasks;
    }, [allTasks, statusFilter, searchQuery, sortBy]);

    // Task counts
    const taskCounts = useMemo(() => ({
        all: allTasks.length,
        pending: allTasks.filter(t => t.status === 'Pending').length,
        inProgress: allTasks.filter(t => t.status === 'In Progress').length,
        completed: allTasks.filter(t => t.status === 'Completed').length,
    }), [allTasks]);

    const statusFilters = [
        { id: 'All', label: 'All Tasks', count: taskCounts.all, icon: Filter },
        { id: 'Pending', label: 'Pending', count: taskCounts.pending, icon: AlertCircle },
        { id: 'In Progress', label: 'In Progress', count: taskCounts.inProgress, icon: Clock },
        { id: 'Completed', label: 'Completed', count: taskCounts.completed, icon: CheckCircle2 },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">All Tasks</h1>
                    <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                        Manage and track all tasks across your team
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAddTask}
                    className="px-6 py-3 bg-gradient-to-r from-gray-700 to-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add New Task
                </motion.button>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                    <option value="date">Sort by Date</option>
                    <option value="status">Sort by Status</option>
                    <option value="title">Sort by Title</option>
                </select>
            </div>

            {/* Status Filters */}
            <div className="flex flex-wrap gap-3">
                {statusFilters.map((filter) => (
                    <motion.button
                        key={filter.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStatusFilter(filter.id)}
                        className={`
              px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2
              ${statusFilter === filter.id
                                ? 'bg-gradient-to-r from-gray-700 to-black text-white shadow-lg'
                                : 'bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-700 hover:border-primary-500'
                            }
            `}
                    >
                        <filter.icon className="w-4 h-4" />
                        {filter.label}
                        <span className={`
              px-2 py-0.5 rounded-full text-xs font-semibold
              ${statusFilter === filter.id
                                ? 'bg-white/20 text-white'
                                : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300'
                            }
            `}>
                            {filter.count}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task, index) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-xl border border-white/20 dark:border-secondary-700/50 p-4 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">
                                            {task.title}
                                        </h3>
                                        <button
                                            onClick={() => onTaskStatusChange(task.employeeId, task.id, task.status)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(task.status)} hover:opacity-80 transition-opacity`}
                                        >
                                            {task.status}
                                        </button>
                                    </div>
                                    {task.description && (
                                        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 text-xs text-secondary-500">
                                        <span className="flex items-center gap-1">
                                            👤 {task.employeeName}
                                        </span>
                                        <span>•</span>
                                        <span>{task.employeeRole}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                            No tasks found
                        </h3>
                        <p className="text-secondary-500 dark:text-secondary-400">
                            Try adjusting your search or filter criteria
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TasksView;
