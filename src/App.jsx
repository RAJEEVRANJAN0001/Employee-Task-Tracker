import { useState } from 'react';
import { useAuth } from './context/AuthContext';

// Landing Page
import LandingPage from './components/landing/LandingPage';

// Auth Components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

// Main Dashboard Component
import Dashboard from './Dashboard';

function App() {
    const { isAuthenticated, isLoading } = useAuth();
    const [showLanding, setShowLanding] = useState(true);
    const [showSignUp, setShowSignUp] = useState(false);

    // Show loading state while checking authentication
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

    // If not authenticated
    if (!isAuthenticated) {
        // Show landing page first
        if (showLanding) {
            return <LandingPage onGetStarted={() => setShowLanding(false)} />;
        }

        // Then show auth pages
        return showSignUp ? (
            <SignUp onSwitchToSignIn={() => setShowSignUp(false)} />
        ) : (
            <SignIn onSwitchToSignUp={() => setShowSignUp(true)} />
        );
    }

    // If authenticated, show the dashboard
    return <Dashboard />;
}

export default App;
