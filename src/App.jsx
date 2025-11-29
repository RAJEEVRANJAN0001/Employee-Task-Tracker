import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AddTaskModal from './components/modals/AddTaskModal';
import AddMemberModal from './components/modals/AddMemberModal';
import Toast from './components/ui/Toast';
import LandingPage from './components/landing/LandingPage';
import Confetti from './components/ui/Confetti';

// Views
import DashboardView from './components/views/DashboardView';
import EmployeesView from './components/views/EmployeesView';
import TasksView from './components/views/TasksView';
import SettingsView from './components/views/SettingsView';

// Hooks and Utils
import { useTheme } from './hooks/useTheme';
import { getCurrentISODate } from './utils/dateFormatter';
import { api } from './api/client';

// Data
import employeesData from './data/employees.json';

function App() {
    // Theme management
    const { theme, toggleTheme } = useTheme();

    // State management
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [highlightedTaskId, setHighlightedTaskId] = useState(null);
    const [showLanding, setShowLanding] = useState(true);
    const [activeView, setActiveView] = useState('dashboard');
    const [confettiTrigger, setConfettiTrigger] = useState(0);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [editingMember, setEditingMember] = useState(null);

    // Load employees from API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // Try to seed first (idempotent on server)
                await api.seedDatabase(employeesData);

                // Fetch data
                const data = await api.getEmployees();
                setEmployees(data);
            } catch (error) {
                console.error('Error loading data:', error);
                showToast('Failed to connect to server. Please ensure backend is running.', 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Filter and search employees
    const filteredEmployees = useMemo(() => {
        return employees
            .map(employee => {
                // Filter tasks by status
                let filteredTasks = employee.tasks || [];
                if (activeFilter !== 'All') {
                    filteredTasks = filteredTasks.filter(task => task.status === activeFilter);
                }

                // Filter by search query
                if (searchQuery.trim()) {
                    const query = searchQuery.toLowerCase();
                    const employeeMatches = employee.name.toLowerCase().includes(query) ||
                        employee.role.toLowerCase().includes(query);

                    if (employeeMatches) {
                        // If employee matches, show all filtered tasks
                        return { ...employee, tasks: filteredTasks };
                    } else {
                        // Otherwise, filter tasks by title or description
                        filteredTasks = filteredTasks.filter(task =>
                            task.title.toLowerCase().includes(query) ||
                            (task.description && task.description.toLowerCase().includes(query))
                        );
                    }
                }

                return { ...employee, tasks: filteredTasks };
            })
            .filter(employee => employee.tasks && employee.tasks.length > 0); // Only show employees with matching tasks
    }, [employees, activeFilter, searchQuery]);

    // Calculate statistics
    const stats = useMemo(() => {
        const allTasks = employees.flatMap(emp => emp.tasks || []);
        const completedTasks = allTasks.filter(task => task.status === 'Completed').length;
        const inProgressTasks = allTasks.filter(task => task.status === 'In Progress').length;
        const pendingTasks = allTasks.filter(task => task.status === 'Pending').length;
        const totalTasks = allTasks.length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        const productivity = employees.length > 0 ? (totalTasks / employees.length).toFixed(1) : '0.0';

        return {
            totalTasks,
            completedTasks,
            inProgressTasks,
            pendingTasks,
            totalEmployees: employees.length,
            completionRate,
            productivity,
        };
    }, [employees]);

    // Calculate task counts for filter bar
    const taskCounts = useMemo(() => {
        const allTasks = employees.flatMap(emp => emp.tasks || []);
        return {
            all: allTasks.length,
            pending: allTasks.filter(task => task.status === 'Pending').length,
            inProgress: allTasks.filter(task => task.status === 'In Progress').length,
            completed: allTasks.filter(task => task.status === 'Completed').length,
        };
    }, [employees]);

    // Handle task status change
    const handleTaskStatusChange = async (employeeId, taskId, newStatus) => {
        try {
            // Optimistic update
            setEmployees(prevEmployees =>
                prevEmployees.map(employee => {
                    if (employee.id === employeeId) {
                        return {
                            ...employee,
                            tasks: employee.tasks.map(task =>
                                task.id === taskId
                                    ? { ...task, status: newStatus, updatedAt: getCurrentISODate() }
                                    : task
                            ),
                        };
                    }
                    return employee;
                })
            );

            await api.updateTaskStatus(employeeId, taskId, newStatus);
            showToast(`Task status updated to "${newStatus}"`, 'success');
        } catch (error) {
            console.error('Error updating task:', error);
            showToast('Failed to update task status', 'error');
            // Revert optimistic update (could be improved by refetching)
            const data = await api.getEmployees();
            setEmployees(data);
        }
    };

    // Handle add new task
    const handleAddTask = async (formData) => {
        try {
            const newTaskData = {
                title: formData.title,
                description: formData.description,
                status: formData.status,
            };

            const updatedEmployee = await api.addTask(formData.employeeId, newTaskData);

            // Update state with the updated employee returned from server
            setEmployees(prevEmployees =>
                prevEmployees.map(employee =>
                    employee.id === updatedEmployee.id ? updatedEmployee : employee
                )
            );

            // Find the new task ID (it will be the last one)
            const newTaskId = updatedEmployee.tasks[updatedEmployee.tasks.length - 1].id;

            // Highlight the new task
            setHighlightedTaskId(newTaskId);
            setTimeout(() => setHighlightedTaskId(null), 2000);

            showToast('Task added successfully!', 'success');
        } catch (error) {
            console.error('Error adding task:', error);
            showToast('Failed to add task', 'error');
        }
    };

    // Handle add new member
    const handleAddMember = async (formData) => {
        try {
            const newMemberData = {
                name: formData.name,
                role: formData.role,
                department: formData.department,
                email: formData.email,
                age: formData.age,
                gender: formData.gender,
                bio: formData.bio,
                avatar: formData.avatar || `https://randomuser.me/api/portraits/${formData.gender === 'Female' ? 'women' : formData.gender === 'Male' ? 'men' : Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 99)}.jpg`,
                tasks: []
            };

            const savedMember = await api.addEmployee(newMemberData);

            setEmployees(prevEmployees => [...prevEmployees, savedMember]);
            showToast('Team member added successfully!', 'success');
            return true;
        } catch (error) {
            console.error('Error adding member:', error);
            showToast('Failed to add team member', 'error');
            return false;
        }
    };

    const handleUpdateMember = async (id, formData) => {
        try {
            const updatedMember = await api.updateEmployee(id, formData);
            setEmployees(prevEmployees =>
                prevEmployees.map(emp => emp.id === id ? updatedMember : emp)
            );
            showToast('Team member updated successfully!', 'success');
            setEditingMember(null);
            return true;
        } catch (error) {
            console.error('Error updating member:', error);
            showToast('Failed to update team member', 'error');
            return false;
        }
    };

    const handleDeleteMember = async (id) => {
        if (window.confirm('Are you sure you want to delete this team member?')) {
            try {
                await api.deleteEmployee(id);
                setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
                showToast('Team member deleted successfully!', 'success');
            } catch (error) {
                console.error('Error deleting member:', error);
                showToast('Failed to delete team member', 'error');
            }
        }
    };

    const openEditModal = (member) => {
        setEditingMember(member);
        setIsAddMemberModalOpen(true);
    };

    // Show toast notification
    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
    };

    // Close toast
    const closeToast = () => {
        setToast(prev => ({ ...prev, isVisible: false }));
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Show landing page if enabled
    if (showLanding) {
        return <LandingPage onGetStarted={() => setShowLanding(false)} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
            {/* Sidebar Navigation */}
            <Sidebar
                activeView={activeView}
                onViewChange={setActiveView}
                onBackToLanding={() => setShowLanding(true)}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                employeeCount={stats.totalEmployees}
                taskCount={stats.totalTasks}
            />

            {/* Main Content with Dynamic Sidebar Offset */}
            <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-20' : 'ml-72'}`}>
                <Header
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    isSidebarCollapsed={isSidebarCollapsed}
                />

                <main className="min-h-screen pt-24 px-6 pb-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeView === 'dashboard' && (
                                <DashboardView
                                    employees={employees}
                                    filteredEmployees={filteredEmployees}
                                    stats={stats}
                                    taskCounts={taskCounts}
                                    activeFilter={activeFilter}
                                    onFilterChange={setActiveFilter}
                                    onTaskStatusChange={handleTaskStatusChange}
                                    highlightedTaskId={highlightedTaskId}
                                    onEditMember={openEditModal}
                                    onDeleteMember={handleDeleteMember}
                                    onAddMember={() => {
                                        setEditingMember(null);
                                        setIsAddMemberModalOpen(true);
                                    }}
                                    onAddTask={() => setIsModalOpen(true)}
                                />
                            )}
                            {activeView === 'employees' && (
                                <EmployeesView
                                    employees={employees}
                                    onTaskStatusChange={handleTaskStatusChange}
                                    highlightedTaskId={highlightedTaskId}
                                    onEditMember={openEditModal}
                                    onDeleteMember={handleDeleteMember}
                                    onAddMember={() => {
                                        setEditingMember(null);
                                        setIsAddMemberModalOpen(true);
                                    }}
                                    onAddTask={() => setIsModalOpen(true)}
                                />
                            )}
                            {activeView === 'tasks' && (
                                <TasksView
                                    employees={employees}
                                    onTaskStatusChange={handleTaskStatusChange}
                                    onAddTask={() => setIsModalOpen(true)}
                                    highlightedTaskId={highlightedTaskId}
                                />
                            )}
                            {activeView === 'settings' && (
                                <SettingsView
                                    theme={theme}
                                    onToggleTheme={toggleTheme}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Add Task Modal */}
            <AddTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                employees={employees}
                onAddTask={handleAddTask}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            {/* Add Member Modal */}
            <AddMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => {
                    setIsAddMemberModalOpen(false);
                    setEditingMember(null);
                }}
                onAddMember={handleAddMember}
                onUpdateMember={handleUpdateMember}
                initialData={editingMember}
                isSidebarCollapsed={isSidebarCollapsed}
            />

            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={closeToast}
            />

            {/* Confetti Animation */}
            <Confetti trigger={confettiTrigger} />
        </div>
    );
}

export default App;
