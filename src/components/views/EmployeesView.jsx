import { motion } from 'framer-motion';
import { Search, UserPlus, Plus } from 'lucide-react';
import { useState, useMemo } from 'react';
import EmployeeList from '../employees/EmployeeList';

/**
 * Employees View - Dedicated page for team management
 */
const EmployeesView = ({ employees, onTaskStatusChange, highlightedTaskId, onAddTask, onAddMember, onEditMember, onDeleteMember }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [departmentFilter, setDepartmentFilter] = useState('All');

    // Get unique roles
    const roles = useMemo(() => {
        const uniqueRoles = [...new Set(employees.map(emp => emp.role))];
        return ['All', ...uniqueRoles];
    }, [employees]);

    // Get unique departments
    const departments = useMemo(() => {
        const uniqueDepartments = [...new Set(employees.map(emp => emp.department).filter(Boolean))];
        return ['All', ...uniqueDepartments];
    }, [employees]);

    // Filter employees
    const filteredEmployees = useMemo(() => {
        let filtered = employees;

        // Filter by role
        if (roleFilter !== 'All') {
            filtered = filtered.filter(emp => emp.role === roleFilter);
        }

        // Filter by department
        if (departmentFilter !== 'All') {
            filtered = filtered.filter(emp => emp.department === departmentFilter);
        }

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(emp =>
                emp.name.toLowerCase().includes(query) ||
                emp.role.toLowerCase().includes(query) ||
                (emp.department && emp.department.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [employees, roleFilter, departmentFilter, searchQuery]);

    // Calculate stats
    const stats = useMemo(() => ({
        total: employees.length,
        active: filteredEmployees.length,
        totalTasks: employees.reduce((sum, emp) => sum + emp.tasks.length, 0),
        avgTasksPerEmployee: (employees.reduce((sum, emp) => sum + emp.tasks.length, 0) / employees.length).toFixed(1),
    }), [employees, filteredEmployees]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Team Members</h1>
                    <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                        Manage your team and track individual performance
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAddMember}
                        className="px-6 py-3 bg-gradient-to-r from-gray-700 to-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                        <UserPlus className="w-5 h-5" />
                        Add Team Member
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAddTask}
                        className="px-6 py-3 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white border border-secondary-200 dark:border-secondary-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Task
                    </motion.button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Members', value: stats.total, icon: '👥' },
                    { label: 'Showing', value: stats.active, icon: '👤' },
                    { label: 'Total Tasks', value: stats.totalTasks, icon: '📋' },
                    { label: 'Avg Tasks/Member', value: stats.avgTasksPerEmployee, icon: '📊' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/70 dark:bg-secondary-800/70 backdrop-blur-xl rounded-xl border border-white/20 dark:border-secondary-700/50 shadow-lg p-4"
                    >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                            {stat.value}
                        </div>
                        <div className="text-sm text-secondary-600 dark:text-secondary-400">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                {/* Department Filter */}
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                    {departments.map(dept => (
                        <option key={dept} value={dept}>
                            {dept === 'All' ? 'All Departments' : dept}
                        </option>
                    ))}
                </select>

                {/* Role Filter */}
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                    {roles.map(role => (
                        <option key={role} value={role}>
                            {role === 'All' ? 'All Roles' : role}
                        </option>
                    ))}
                </select>
            </div>

            {/* Employee List */}
            {filteredEmployees.length > 0 ? (
                <EmployeeList
                    employees={filteredEmployees}
                    onTaskStatusChange={onTaskStatusChange}
                    highlightedTaskId={highlightedTaskId}
                    onEditMember={onEditMember}
                    onDeleteMember={onDeleteMember}
                />
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="text-6xl mb-4">👥</div>
                    <h3 className="text-xl font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                        No team members found
                    </h3>
                    <p className="text-secondary-500 dark:text-secondary-400">
                        Try adjusting your search or filter criteria
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default EmployeesView;
