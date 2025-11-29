import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Briefcase, Mail, Calendar, Users, FileText, Upload } from 'lucide-react';

/**
 * AddMemberModal component for adding new team members
 */
const AddMemberModal = ({ isOpen, onClose, onAddMember, onUpdateMember, initialData = null, isSidebarCollapsed }) => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        department: '',
        email: '',
        age: '',
        gender: '',
        bio: '',
        avatar: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    // Populate form when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                role: initialData.role || '',
                department: initialData.department || '',
                email: initialData.email || '',
                age: initialData.age || '',
                gender: initialData.gender || '',
                bio: initialData.bio || '',
                avatar: initialData.avatar || ''
            });
        } else {
            // Reset form for adding new member
            setFormData({
                name: '',
                role: '',
                department: '',
                email: '',
                age: '',
                gender: '',
                bio: '',
                avatar: ''
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
                if (errors.avatar) {
                    setErrors(prev => ({ ...prev, avatar: '' }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.role.trim()) newErrors.role = 'Role is required';
        if (!formData.department.trim()) newErrors.department = 'Department is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || formData.age < 18 || formData.age > 100) {
            newErrors.age = 'Age must be between 18 and 100';
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            let success = false;
            if (initialData) {
                success = await onUpdateMember(initialData.id, formData);
            } else {
                success = await onAddMember(formData);
            }

            if (success) {
                onClose();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
                        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
                        className="fixed left-1/2 top-1/2 w-full max-w-md bg-white dark:bg-secondary-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700 flex justify-between items-center bg-secondary-50 dark:bg-secondary-800/50">
                            <div>
                                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                                    {initialData ? 'Edit Team Member' : 'Add Team Member'}
                                </h2>
                                <p className="text-secondary-500 dark:text-secondary-400 text-sm mt-1">
                                    {initialData ? 'Update the details of the team member' : 'Enter the details of the new team member'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-secondary-200 dark:hover:bg-secondary-700 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-secondary-500" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-6">
                                {/* Profile Photo Upload */}
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative w-24 h-24 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-secondary-300 dark:border-secondary-600 hover:border-primary-500 transition-colors group"
                                    >
                                        {formData.avatar ? (
                                            <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <Upload className="w-8 h-8 text-secondary-400 group-hover:text-primary-500 transition-colors" />
                                        )}
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-xs font-medium">Change</span>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <p className="text-xs text-secondary-500">
                                        Click to upload photo (Optional)
                                    </p>
                                    {errors.avatar && <p className="text-red-500 text-xs">{errors.avatar}</p>}
                                </div>

                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. John Doe"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-secondary-300 dark:border-secondary-600'
                                                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>

                                {/* Role */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        Role *
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior Developer"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.role ? 'border-red-500' : 'border-secondary-300 dark:border-secondary-600'
                                                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                                        />
                                    </div>
                                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                                </div>

                                {/* Department */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        Department *
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.department ? 'border-red-500' : 'border-secondary-300 dark:border-secondary-600'
                                                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none`}
                                        >
                                            <option value="">Select Department</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Design">Design</option>
                                            <option value="Product">Product</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Sales">Sales</option>
                                            <option value="HR">HR</option>
                                            <option value="Operations">Operations</option>
                                        </select>
                                    </div>
                                    {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john.doe@example.com"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-secondary-300 dark:border-secondary-600'
                                                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>

                                {/* Age */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        Age *
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="e.g. 28"
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-secondary-300 dark:border-secondary-600'
                                                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                                        />
                                    </div>
                                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                        Gender *
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.gender ? 'border-red-500' : 'border-secondary-300 dark:border-secondary-600'
                                                } bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Non-binary">Non-binary</option>
                                        </select>
                                    </div>
                                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                                    Short Bio
                                </label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-4 w-5 h-5 text-secondary-400" />
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell us a bit about yourself..."
                                        rows="3"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2.5 text-secondary-600 dark:text-secondary-400 font-medium hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-black text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        initialData ? 'Save Changes' : 'Add Member'
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AddMemberModal;
