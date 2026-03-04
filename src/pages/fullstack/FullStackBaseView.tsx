// src/pages/fullstack/FullStackBaseView.tsx

import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    CheckCircle, Play, ArrowLeft, Share2, Edit, Target, Menu, X, Clock, HelpCircle, Server,
} from "lucide-react";

// --- CORE LOGIC HOOK ---
import { useFullStackModuleView } from "@/components/hooks/useFullStackModuleView";
import { FULLSTACK_COURSE_MODULES, QUIZ_QUESTIONS } from "@/components/data/FullStackCourseData";
import { ModuleQuizDsa } from "@/components/ModuleQuizDsa";
import { ContentVisualizer } from "@/components/visualizer/ContentVisualizer";

/* -------------------- API CONFIG AND HELPERS -------------------- */

// CRITICAL: Ensure these URLs match your Django project's urls.py
const API_BASE_URL = 'http://127.0.0.1:8000/';
const START_API_ENDPOINT = `${API_BASE_URL}start_course/`;
const ADD_MODULE_API_ENDPOINT = `${API_BASE_URL}add_module/`; // Uses POST method

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

/**
 * Handles communication with the course progress APIs (start and add_module).
 */
const updateCourseProgress = async (
    action: 'start' | 'add_module',
    courseName: string,
    moduleId?: number
) => {
    const token = getAccessToken();
    if (!token) {
        console.warn(`[${action.toUpperCase()}] Authentication token missing. Skipping API call.`);
        return;
    }

    let url = action === 'start' ? START_API_ENDPOINT : ADD_MODULE_API_ENDPOINT;
    let method = action === 'start' ? 'PATCH' : 'POST';
    let body = { course_name: courseName } as any;

    if (action === 'add_module') {
        if (moduleId === undefined) {
            console.error("[ADD_MODULE] Module ID is required but missing.");
            return;
        }
        body.module_id = moduleId;

        // --- CRITICAL: LOCAL STORAGE CHECK & OPTIMISTIC UPDATE ---
        try {
            const rawProgressJson = localStorage.getItem('rawBackendProgress');
            const rawProgress: any[] = rawProgressJson ? JSON.parse(rawProgressJson) : [];
            const courseToUpdate = rawProgress.find(c => c.course_name === courseName);

            if (courseToUpdate) {
                let completedModules = courseToUpdate.completed_modules || [];

                // CHECK: If the module is already in local storage, skip API call.
                if (completedModules.includes(moduleId)) {
                    console.log(`[ADD_MODULE] Module ${moduleId} already completed locally. Skipping API call.`);
                    return; // <-- EARLY EXIT
                }

                // Module is NOT completed, so proceed with local optimistic update
                completedModules.push(moduleId);
                courseToUpdate.completed_modules = completedModules;

                const total = courseToUpdate.total_modules;
                const completedCount = completedModules.length;
                courseToUpdate.progress_percent = (completedCount / total) * 100;
                courseToUpdate.is_completed = completedCount >= total;

                localStorage.setItem('rawBackendProgress', JSON.stringify(rawProgress));
                console.log(`[ADD_MODULE] LocalStorage updated immediately for module ${moduleId}.`);
            }
        } catch (e) {
            console.error("Failed to check or update local 'rawBackendProgress'. Proceeding with API call as backup.", e);
        }
    }
    // ----------------------------------------------------------------------

    // API Call 
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(`[${action.toUpperCase()}] API Success:`, data.message);
            return data;
        } else {
            console.error(`[${action.toUpperCase()}] API Error:`, data.message || `Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`[${action.toUpperCase()}] Fetch failed:`, error);
    }
}


// --- INTERFACES & MOCK UI COMPONENTS ---

interface CourseProgress {
    id: number;
    course_name: string;
    total_modules: number;
    completed_modules: number[];
    progress_percent: number;
    started: boolean;
    is_completed: boolean;
    last_updated: string;
}

// 🛑 FIX 1: Correct the MOCK data name to match the Django expectation exactly.
const MOCK_RAW_PROGRESS: CourseProgress[] = [
    { id: 1, course_name: "Full Stack Developer Path", total_modules: 12, completed_modules: [101, 102], progress_percent: 16.67, started: true, is_completed: false, last_updated: "" },
    { id: 3, course_name: "Algorithm Interview Prep", total_modules: 16, completed_modules: [], progress_percent: 0, started: false, is_completed: false, last_updated: "" },
];


interface BaseCourseViewProps {
    onBack: () => void;
    planTitle: string;
    initialModuleId: string;
}

// ... (Button and Progress Components remain unchanged for brevity)

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "default" | "icon";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onClick, children, className, variant = "default", size = "default", disabled = false,
}) => {
    let baseStyle = "px-4 py-2 font-semibold rounded-lg transition-colors shadow-md flex items-center justify-center";
    if (variant === "default") baseStyle += " bg-blue-600 hover:bg-blue-700 text-white";
    if (variant === "outline") baseStyle += " bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700";
    if (size === "icon") baseStyle = "p-2 rounded-full " + baseStyle;
    if (disabled) baseStyle = baseStyle.replace(/hover:bg-\w+-\d+/, "bg-gray-400 cursor-not-allowed");
    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${className || ""}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

interface ProgressProps {
    value: number;
    className?: string;
}

const Progress: React.FC<ProgressProps> = ({ value, className = "" }) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    return (
        <div
            className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}
        >
            <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${clampedValue}%` }}
            ></div>
        </div>
    );
};

// --- PULSE VARIANT FOR ANIMATION ---
const pulseVariant = {
    pulse: {
        scale: [1, 1.01, 1],
        boxShadow: [
            "0 0 0 0 rgba(59,130,246,0.4)",
            "0 0 0 4px rgba(59,130,246,0)",
        ],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};


// --- MAIN COMPONENT ---
export const FullStackBaseView: React.FC<BaseCourseViewProps> = ({
    onBack,
    planTitle,
    initialModuleId,
}) => {

    // 🛑 FIX 2: Define the exact string the API must receive, bypassing the potentially stale prop.
    const API_COURSE_NAME = "Full Stack Developer Path";

    // --- Derive the necessary external data to pass to the hook ---
    const rawBackendProgress: CourseProgress[] = JSON.parse(localStorage.getItem('rawBackendProgress') || '[]') || MOCK_RAW_PROGRESS;

    // NOTE: Use the correct API_COURSE_NAME to ensure local lookups are also correct.
    const courseData = rawBackendProgress.find(c => c.course_name === API_COURSE_NAME);
    const currentCourseId = courseData?.id || 1;

    // --- Call the Full Stack Hook ---
    const {
        currentModule,
        currentSubmodule,
        currentSubmodules,
        currentModuleId,
        moduleProgress,
        isModuleFullyComplete,
        isSidebarOpen,
        setIsSidebarOpen,
        isQuizActive,
        quizAttemptFailed,
        contentRef,
        getModuleProgress,
        handleSectionChange,
        handleLaunchQuiz,
        handleBackToContent,
        handleQuizComplete,
    } = useFullStackModuleView(initialModuleId, onBack, rawBackendProgress, currentCourseId);


    // 1. --- WRAPPER: Handle Quiz Complete and Call 'add_module' API ---
    const handleModuleQuizCompleteAPI = useCallback((passed: boolean) => {

        // Find the numerical module ID (e.g., m-101 -> 101)
        const numericalModuleIdMatch = currentModuleId.match(/(\d+)$/);

        // Parse the number extracted by the regex, which should be the correct backend ID.
        const numericalModuleId = numericalModuleIdMatch ? parseInt(numericalModuleIdMatch[0], 10) : undefined;

        if (passed && numericalModuleId) {
            // 🛑 FIX 3: Force the API call to use the known, correct string (API_COURSE_NAME).
            updateCourseProgress('add_module', API_COURSE_NAME, numericalModuleId);
            console.log(`Module ${numericalModuleId} API update triggered (POST), conditional on local progress.`);
        }

        // CRITICAL: Call the original hook function to update component state 
        handleQuizComplete(passed);

    }, [handleQuizComplete, currentModuleId]); // Removed planTitle from dependencies since we use API_COURSE_NAME 

    // FIX: Redefined sidebarContent as an IIFE to ensure the map returns correctly and handles logic cleanly.
    const sidebarContent = (() => (
        <div className="w-full bg-white dark:bg-gray-900 p-4 space-y-2 h-full overflow-y-auto">
            <Button variant="outline" onClick={onBack} className="w-full mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Button>

            <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <h4 className="text-sm font-semibold mb-2">
                    {currentModule.id} Read Progress: {moduleProgress.readProgress ?? 0}%
                </h4>
                <Progress value={moduleProgress.readProgress ?? 0} className="h-2 mb-2" />
                {moduleProgress.isQuizCompleted && (
                    <div className="text-xs text-green-600 font-medium mt-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> Quiz Passed!
                    </div>
                )}
                {!moduleProgress.isQuizCompleted && moduleProgress.isCompleted && (
                    <div className="text-xs text-yellow-600 font-medium mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Reading Done, Take Quiz!
                    </div>
                )}
                {isModuleFullyComplete && (
                    <div className="text-xs text-green-600 font-medium mt-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" /> {currentModule.id} Module Fully Completed!
                    </div>
                )}
            </div>

            <h3 className="text-lg font-bold mb-3 mt-4">Course Navigation</h3>
            <ul className="space-y-1">
                {FULLSTACK_COURSE_MODULES.map((mod) => { // FIX: Use FULLSTACK_COURSE_MODULES
                    const index = FULLSTACK_COURSE_MODULES.findIndex((m) => m.id === mod.id);
                    const prereqId = index > 0 ? FULLSTACK_COURSE_MODULES[index - 1].id : null;

                    // --- Use the new getModuleProgress function from the hook ---
                    const prereqProgress = prereqId ? getModuleProgress(prereqId) : null;
                    // Module is unlocked if it's the first module OR if the previous module's quiz is completed
                    const isPrereqMet = prereqId === null || prereqProgress?.isQuizCompleted;
                    const isCompleted = getModuleProgress(mod.id)?.isQuizCompleted; // Checks if THIS module is fully done
                    // ------------------------------------------------

                    const isCurrent = mod.id === currentModuleId;
                    const isClickable = isPrereqMet || isCompleted || isCurrent;

                    return (
                        <React.Fragment key={mod.id}>
                            <motion.li
                                onClick={() => isClickable && handleSectionChange(mod.id)}
                                className={`flex items-center justify-between p-3 rounded-lg transition-colors text-sm font-bold mt-2 
                                ${isCurrent ? "bg-blue-600 text-white hover:bg-blue-700" :
                                        isCompleted ? "text-green-600 hover:bg-green-50/50 dark:hover:bg-green-900/50" :
                                            isPrereqMet ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white" :
                                                "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                    }`}
                                variants={isCurrent && isModuleFullyComplete && currentModule.nextModuleId ? pulseVariant : undefined}
                                animate={isCurrent && isModuleFullyComplete && currentModule.nextModuleId ? "pulse" : undefined}
                            >
                                <span>{mod.title}</span>
                                {isCompleted && <CheckCircle className="h-4 w-4 text-green-300" />}
                            </motion.li>

                            {/* Display submodules if the current module is active */}
                            {isCurrent && mod.submodules.length > 0 && mod.submodules.map((section) => (
                                <li
                                    key={section.id}
                                    onClick={() => handleSectionChange(section.id)}
                                    className={`flex items-center justify-between pl-6 pr-3 py-2 rounded-lg cursor-pointer transition-colors text-sm
                                    ${section.id === currentSubmodule?.id && !isQuizActive
                                            ? "bg-blue-100 dark:bg-blue-800/50 font-semibold text-blue-800 dark:text-blue-200"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    <span>{section.title}</span>
                                </li>
                            ))}
                            {isCurrent && mod.submodules.length === 0 && (
                                <li className="flex items-center pl-6 pr-3 py-2 text-sm text-red-500">
                                    (Content Pending)
                                </li>
                            )}
                        </React.Fragment>
                    );
                })}

                <li className="flex items-center p-3 rounded-lg text-sm text-gray-400 dark:text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>Final Project</span>
                </li>
            </ul>
        </div>
    ))();

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900 relative"
        >
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 border-r dark:border-gray-800 h-screen sticky top-0">
                {sidebarContent}
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden bg-black/50"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 top-0 w-64 h-full bg-white dark:bg-gray-900 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end p-4">
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        {/* Render sidebar content inside the mobile panel */}
                        {sidebarContent}
                    </motion.div>
                </div>
            )}

            {/* Main Content Area - Conditionally Renders Quiz or Submodule Content */}
            <div
                ref={contentRef}
                className="flex-1 p-4 md:p-10 overflow-y-scroll max-h-screen"
            >
                <div className="max-w-4xl mx-auto">
                    {!isQuizActive && (
                        <header className="flex justify-between items-start mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentModule.title}</h1>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </header>
                    )}

                    {isQuizActive ? (
                        // --- QUIZ VIEW (Using the reusable ModuleQuizDsa component) ---
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <header className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
                                <h1 className="text-3xl font-bold text-blue-600">{currentModule.id} Final Assessment</h1>
                            </header>
                            <ModuleQuizDsa // <-- USE THE IMPORTED QUIZ COMPONENT
                                questions={QUIZ_QUESTIONS[currentModule.quizId] || []}
                                onComplete={handleModuleQuizCompleteAPI} // <--- USING THE WRAPPER FUNCTION
                                onBackToContent={handleBackToContent}
                                isPassed={moduleProgress.isQuizCompleted}
                                showAnswers={quizAttemptFailed || moduleProgress.isQuizCompleted}
                            />
                        </motion.div>
                    ) : (
                        // --- READING VIEW (Shown when isQuizActive is FALSE) ---
                        <React.Fragment>
                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{currentSubmodule?.title || "Select a submodule from the sidebar."}</h2>
                            <div className="flex items-center text-sm text-gray-500 my-4 space-x-4">
                                <span>Reading Time: {currentSubmodule?.estimatedReadingTime || "0 min"}</span>
                                <Share2 className="h-4 w-4 cursor-pointer" />
                                <Edit className="h-4 w-4 cursor-pointer" />
                                <Server className="h-4 w-4 cursor-pointer" />
                            </div>
                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                {currentSubmodule?.content || <p className="text-lg mt-8 text-gray-500">This module content is currently being drafted. Please check back soon!</p>}
                            </div>

                            {/* AI Visualization Section */}
                            {currentSubmodule?.content && (
                                <ContentVisualizer
                                    content={typeof currentSubmodule.content === 'string'
                                        ? currentSubmodule.content
                                        : `Generate a comprehensive technical diagram explaining the concept of "${currentSubmodule.title}". Include key components, relationships, and processes involved.`}
                                    title={`Visualize: ${currentSubmodule.title}`}
                                />
                            )}
                        </React.Fragment>
                    )}

                    {/* === ACTION BUTTON (Always visible if quiz isn't active) === */}
                    {!isQuizActive && (
                        <div className="mt-10 pt-6 border-t dark:border-gray-700">
                            {isModuleFullyComplete ? (
                                currentModule.nextModuleId ? (
                                    <motion.div
                                        variants={pulseVariant}
                                        animate="pulse"
                                        className="rounded-md overflow-hidden"
                                    >
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                                            variant="default"
                                            onClick={() => handleSectionChange(currentModule.nextModuleId!)}
                                        >
                                            <Play className="mr-2 h-4 w-4" /> Go to Next Module: {FULLSTACK_COURSE_MODULES.find(m => m.id === currentModule.nextModuleId)?.title}
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled>
                                        <CheckCircle className="mr-2 h-4 w-4" /> All Modules Complete! Start Final Project!
                                    </Button>
                                )
                            ) : (
                                <Button
                                    className="w-full"
                                    variant="default"
                                    onClick={handleLaunchQuiz}
                                    disabled={!moduleProgress.isCompleted || currentSubmodules.length === 0}
                                >
                                    <HelpCircle className="mr-2 h-4 w-4" /> Start {currentModule.id} Final Quiz
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};