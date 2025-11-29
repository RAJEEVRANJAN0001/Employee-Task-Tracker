import { motion } from 'framer-motion';
import EmployeeCard from './EmployeeCard';

/**
 * EmployeeList component displaying all employee cards
 */
const EmployeeList = ({ employees, onTaskStatusChange, highlightedTaskId, onEditMember, onDeleteMember }) => {
    if (employees.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
            >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                    No employees found
                </h3>
                <p className="text-secondary-500 dark:text-secondary-400">
                    Try adjusting your search or filter criteria
                </p>
            </motion.div>
        );
    }

    return (
        <div>
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-4"
            >
                Team Members
                <span className="text-sm font-normal text-secondary-500 dark:text-secondary-400 ml-2">
                    ({employees.length} {employees.length === 1 ? 'employee' : 'employees'})
                </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((employee, index) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        index={index}
                        onTaskStatusChange={onTaskStatusChange}
                        highlightedTaskId={highlightedTaskId}
                        onEdit={onEditMember}
                        onDelete={onDeleteMember}
                    />
                ))}
            </div>
        </div>
    );
};

export default EmployeeList;
