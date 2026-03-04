import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Corrected relative imports for components and pages
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import Interview from './pages/Interview';
import { Resume } from './pages/Resume';
import { Learning } from './pages/Learning';
import { Profile } from './pages/Profile';
import { ForgotPassword } from './pages/ForgotPassword';
import VoiceApp from "./pages/VoiceApp";
import StartInterview from "./pages/StartInterview";
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import PrivateRoute from './pages/PrivateRoute';
import GoogleAuth from './pages/GoogleAuth';
import AIInterviewSession from './pages/AIInterviewSession';
import CurrentUser from './pages/CurrentUser';
import VoiceRecorder from "./pages/VoiceRecorder";
import Logout from "./pages/Logout";

import InterviewRoom from './pages/InterviewRoom';
import P2PInterview from './pages/P2PInterview';
import ChatIcon from './components/ChatIcon';

// Course View Imports
import { DSABaseView } from './pages/dsa/DSABaseView';
import { BaseCourseView } from './pages/systemDesign/BaseCourseView'; // System Design Course View
import { FullStackBaseView } from './pages/fullstack/FullStackBaseView';
import { DockerBaseView } from './pages/doc/DockerBaseView'; // 🛑 DOCKER IMPORT

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    // Define where to show the chat icon
    const showChatOn = ['/dashboard', '/resume', '/profile'];

    // Helper function for DSA to navigate back to the learning dashboard
    const handleDSABack = () => {
        navigate('/learning');
    };

    // Helper function for System Design to navigate back to the learning dashboard
    const handleSystemDesignBack = () => {
        navigate('/learning');
    };

    // Helper function for Full Stack Navigation
    const handleFullStackBack = () => {
        navigate('/learning');
    };

    // 🛑 NEW HELPER FUNCTION FOR DOCKER NAVIGATION
    const handleDockerBack = () => {
        navigate('/learning');
    };

    return (
        <ThemeProvider defaultTheme="dark" storageKey="skillsage-theme">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/voicew" element={<VoiceRecorder />} />
                    <Route path="/me" element={<CurrentUser />} />
                    <Route path="/google-auth" element={<GoogleAuth />} />
                    <Route path="/ai" element={<AIInterviewSession />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/voice" element={<VoiceApp />} />
                    <Route path="interview" element={<PrivateRoute><Interview /></PrivateRoute>} />
                    <Route path="startinterview" element={<PrivateRoute><StartInterview /></PrivateRoute>} />
                    <Route path="interview-room/:topic" element={<PrivateRoute><InterviewRoom /></PrivateRoute>} />
                    <Route path="interview-room" element={<Navigate to="/dashboard" />} />
                    <Route path="p2p-interview" element={<PrivateRoute><P2PInterview /></PrivateRoute>} />
                    <Route path="resume" element={<PrivateRoute><Resume /></PrivateRoute>} />
                    <Route path="learning" element={<PrivateRoute><Learning /></PrivateRoute>} />
                    <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                    {/* DEDICATED DSA COURSE ROUTE */}
                    <Route
                        path="/learning/dsa"
                        element={
                            <PrivateRoute>
                                <DSABaseView
                                    onBack={handleDSABack}
                                    planTitle="Algorithm Interview Prep"
                                    initialModuleId="m-101"
                                />
                            </PrivateRoute>
                        }
                    />

                    {/* DEDICATED SYSTEM DESIGN COURSE ROUTE */}
                    <Route
                        path="/learning/system-design"
                        element={
                            <PrivateRoute>
                                <BaseCourseView
                                    onBack={handleSystemDesignBack}
                                    planTitle="System Design Mastery"
                                    initialModuleId="m-101"
                                />
                            </PrivateRoute>
                        }
                    />

                    {/* DEDICATED FULL STACK COURSE ROUTE */}
                    <Route
                        path="/learning/fullstack"
                        element={
                            <PrivateRoute>
                                <FullStackBaseView
                                    onBack={handleFullStackBack}
                                    planTitle="Full Stack Web Development"
                                    initialModuleId="m-101"
                                />
                            </PrivateRoute>
                        }
                    />

                    {/* 🛑 NEW DEDICATED DOCKER/KUBERNETES COURSE ROUTE */}
                    <Route
                        path="/learning/docker-kubernetes"
                        element={
                            <PrivateRoute>
                                <DockerBaseView
                                    onBack={handleDockerBack} // Navigate back to /learning
                                    // CRITICAL: Must match the API_COURSE_NAME in DockerBaseView.tsx
                                    planTitle="Docker and Kubernetes Deep Dive"
                                    initialModuleId="m-d101" // Starts at the first Docker module
                                />
                            </PrivateRoute>
                        }
                    />

                </Route>
            </Routes>

            {/* Conditionally show Chat Icon */}
            {showChatOn.includes(location.pathname) && <ChatIcon />}
        </ThemeProvider>
    );
}

export default () => (
    <Router>
        <App />
    </Router>
);
