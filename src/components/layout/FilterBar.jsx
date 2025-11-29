import { motion } from 'framer-motion';

/**
 * FilterBar component for filtering tasks by status
 */
const FilterBar = ({ activeFilter, onFilterChange, taskCounts }) => {
    const filters = [
        { label: 'All', value: 'All', count: taskCounts.all },
        { label: 'Pending', value: 'Pending', count: taskCounts.pending },
        { label: 'In Progress', value: 'In Progress', count: taskCounts.inProgress },
        { label: 'Completed', value: 'Completed', count: taskCounts.completed },
    ];

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-md p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    Filter Tasks
                </h2>
            </div>

            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <motion.button
                        key={filter.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onFilterChange(filter.value)}
                        className={`
              relative px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${activeFilter === filter.value
                                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                                : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600'
                            }
            `}
                        aria-label={`Filter by ${filter.label}`}
                        aria-pressed={activeFilter === filter.value}
                    >
                        <span className="flex items-center gap-2">
                            {filter.label}
                            <span className={`
                text-xs px-2 py-0.5 rounded-full
                ${activeFilter === filter.value
                                    ? 'bg-white/20 text-white'
                                    : 'bg-secondary-200 dark:bg-secondary-600 text-secondary-700 dark:text-secondary-300'
                                }
              `}>
                                {filter.count}
                            </span>
                        </span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
