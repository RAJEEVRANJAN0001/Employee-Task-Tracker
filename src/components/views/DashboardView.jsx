import StatsOverview from '../dashboard/StatsOverview';
import FilterBar from '../layout/FilterBar';
import EmployeeList from '../employees/EmployeeList';
import { motion } from 'framer-motion';

/**
 * Dashboard View - Main overview page
 */
const DashboardView = ({
    stats,
    taskCounts,
    activeFilter,
    onFilterChange,
    filteredEmployees,
    onTaskStatusChange,
    highlightedTaskId,
    employees,
    onEditMember,
    onDeleteMember
}) => {
    return (
        <div className="space-y-6">
            {/* Dashboard Header */}
            <div>
                <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                    Overview of your team's tasks and productivity
                </p>
            </div>

            {/* Dashboard Stats */}
            <StatsOverview stats={stats} />

            {/* Filter Bar */}
            <FilterBar
                activeFilter={activeFilter}
                onFilterChange={onFilterChange}
                taskCounts={taskCounts}
            />

            {/* Employee List */}
            <EmployeeList
                employees={filteredEmployees}
                onTaskStatusChange={onTaskStatusChange}
                highlightedTaskId={highlightedTaskId}
                onEditMember={onEditMember}
                onDeleteMember={onDeleteMember}
            />

            {/* Empty State for No Results */}
            {filteredEmployees.length === 0 && employees.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                        No results found
                    </h3>
                    <p className="text-secondary-500 dark:text-secondary-400">
                        Try adjusting your search or filter criteria
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default DashboardView;
