import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import TaskItem from './TaskItem';

/**
 * TaskList component displaying tasks for an employee
 */
const TaskList = ({ tasks, employeeId, onTaskStatusChange, highlightedTaskId }) => {
    const [sortBy, setSortBy] = useState('status'); // 'status', 'date', 'title'

    const sortedTasks = [...tasks].sort((a, b) => {
        switch (sortBy) {
            case 'status':
                const statusOrder = { 'Pending': 0, 'In Progress': 1, 'Completed': 2 };
                return statusOrder[a.status] - statusOrder[b.status];
            case 'date':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    return (
        <div className="p-4 bg-secondary-50 dark:bg-secondary-900/50">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Tasks ({tasks.length})
                </span>
                <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-secondary-500" />
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-xs px-2 py-1 rounded border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        aria-label="Sort tasks by"
                    >
                        <option value="status">Sort by Status</option>
                        <option value="date">Sort by Date</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>
            </div>

            {/* Task Items */}
            <div className="space-y-2">
                {sortedTasks.length === 0 ? (
                    <p className="text-center text-sm text-secondary-500 dark:text-secondary-400 py-4">
                        No tasks assigned
                    </p>
                ) : (
                    sortedTasks.map((task, index) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            employeeId={employeeId}
                            index={index}
                            onTaskStatusChange={onTaskStatusChange}
                            isHighlighted={task.id === highlightedTaskId}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
