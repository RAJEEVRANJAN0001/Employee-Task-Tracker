/**
 * Status color mapping utilities
 */

export const STATUS_COLORS = {
    Completed: {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-800 dark:text-gray-200',
        border: 'border-gray-500',
        hex: '#374151',
    },
    'In Progress': {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-800 dark:text-gray-200',
        border: 'border-gray-500',
        hex: '#374151',
    },
    Pending: {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-800 dark:text-gray-200',
        border: 'border-gray-500',
        hex: '#374151',
    },
};

/**
 * Get badge classes for a task status
 * @param {string} status - Task status
 * @returns {string} Tailwind CSS classes
 */
export const getStatusBadgeClasses = (status) => {
    const colors = STATUS_COLORS[status] || STATUS_COLORS.Pending;
    return `${colors.bg} ${colors.text}`;
};

/**
 * Get hex color for a status
 * @param {string} status - Task status
 * @returns {string} Hex color code
 */
export const getStatusColor = (status) => {
    return STATUS_COLORS[status]?.hex || STATUS_COLORS.Pending.hex;
};

/**
 * Get next status in the cycle
 * @param {string} currentStatus - Current task status
 * @returns {string} Next status
 */
export const getNextStatus = (currentStatus) => {
    const statusCycle = ['Pending', 'In Progress', 'Completed'];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    return statusCycle[nextIndex];
};

/**
 * Get all available statuses
 * @returns {Array<string>} Array of status strings
 */
export const getAllStatuses = () => {
    return Object.keys(STATUS_COLORS);
};
