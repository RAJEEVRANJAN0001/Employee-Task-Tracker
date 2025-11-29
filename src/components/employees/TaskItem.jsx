import { motion } from 'framer-motion';
import { Calendar, MousePointerClick } from 'lucide-react';
import { getStatusBadgeClasses, getNextStatus } from '../../utils/statusColors';
import { formatRelativeTime } from '../../utils/dateFormatter';

/**
 * TaskItem component displaying individual task
 */
const TaskItem = ({ task, employeeId, index, onTaskStatusChange, isHighlighted }) => {
    const handleStatusClick = () => {
        const nextStatus = getNextStatus(task.status);
        onTaskStatusChange(employeeId, task.id, nextStatus);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{
                opacity: 1,
                x: 0,
                scale: isHighlighted ? [1, 1.05, 1] : 1,
            }}
            transition={{
                delay: index * 0.05,
                scale: { duration: 0.5, repeat: isHighlighted ? 3 : 0 }
            }}
            className={`
        p-3 rounded-lg bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700
        hover:shadow-md transition-all duration-200 group
        ${isHighlighted ? 'ring-2 ring-primary-500 shadow-lg shadow-primary-500/20' : ''}
      `}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-secondary-900 dark:text-secondary-100 mb-1 line-clamp-1">
                        {task.title}
                    </h4>
                    {task.description && (
                        <p className="text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-2">
                            {task.description}
                        </p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-secondary-500 dark:text-secondary-400">
                        <Calendar className="w-3 h-3" />
                        <span>{formatRelativeTime(task.createdAt)}</span>
                    </div>
                </div>

                {/* Status Badge (Clickable) */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStatusClick}
                    className={`
            badge ${getStatusBadgeClasses(task.status)} 
            cursor-pointer relative group/badge
            transition-all duration-200
          `}
                    title={`Click to change status (current: ${task.status})`}
                    aria-label={`Change task status from ${task.status}`}
                >
                    {task.status}
                    <MousePointerClick className="w-3 h-3 ml-1 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default TaskItem;
