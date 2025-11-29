import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

/**
 * AddTaskButton - Floating action button to open add task modal
 */
const AddTaskButton = ({ onClick }) => {
    return (
        <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className="fixed bottom-8 right-8 z-30 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg shadow-primary-500/50 hover:shadow-xl hover:shadow-primary-500/60 flex items-center justify-center group transition-all duration-300"
            aria-label="Add new task"
        >
            <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />

            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20" />
        </motion.button>
    );
};

export default AddTaskButton;
