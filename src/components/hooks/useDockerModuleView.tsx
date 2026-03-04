// src/hooks/useDockerModuleView.tsx

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// FIX: Import the Docker specific data
import { DOCKER_COURSE_MODULES, ModuleProgress, ModuleDefinition, DetailedSubmodule, QUIZ_QUESTIONS } from '@/components/data/DockerCourseData'; 

// --- TYPES for Backend Progress Data (Reused) ---
interface CourseProgress {
    id: number; 
    course_name: string;
    total_modules: number;
    completed_modules: number[]; // Array of module IDs (numbers) that are fully completed (read + quiz)
}

// --- DEFENSIVE FALLBACK MODULE DEFINITION ---
const DEFAULT_MODULE: ModuleDefinition = {
    id: 'm-default', 
    title: 'Content Loading Error', 
    submodules: [], 
    quizId: 'none', 
    nextModuleId: null
};

// --- Progress Helper Functions (Shared Logic) ---

// Parses 'm-d101' into the number 101 or 201.
const moduleToBackendId = (moduleId: string): number => {
    // Regex matches the number at the end of the string, ignoring the 'm-d' prefix.
    const match = moduleId.match(/(\d+)$/); 
    
    if (match && match[0]) {
        const backendId = parseInt(match[0], 10);
        return isNaN(backendId) ? 0 : backendId;
    }
    return 0;
}

// Check if a module is completed based on the raw progress data
const isModuleFullyCompleted = (moduleId: string, completedModuleIds: number[]): boolean => {
    const backendId = moduleToBackendId(moduleId);
    return completedModuleIds.includes(backendId);
};


// --- Hook Definition ---
export const useDockerModuleView = (
    initialModuleId: string, 
    onBack: () => void,
    rawBackendProgress: CourseProgress[], // The full array of course progress
    currentCourseId: number // The ID of the course being viewed (e.g., 4)
) => {
    const navigate = useNavigate();

    const initialCourseData = rawBackendProgress.find(c => c.id === currentCourseId);
    
    // Initialize completed modules from backend data
    const [currentCompletedModules, setCurrentCompletedModules] = useState<number[]>(
        initialCourseData?.completed_modules || []
    );
    
    // Initialize local read progress, setting 100% for modules already completed via the backend.
    const [localReadProgress, setLocalReadProgress] = useState<Record<string, number>>(() => {
        const initialProgress: Record<string, number> = {};
        const completedIds = initialCourseData?.completed_modules || [];
        
        DOCKER_COURSE_MODULES.forEach(mod => {
            const backendId = moduleToBackendId(mod.id);
            if (completedIds.includes(backendId)) {
                initialProgress[mod.id] = 100;
            }
        });
        return initialProgress;
    });


    const [currentModuleId, setCurrentModuleId] = useState<string>(initialModuleId);
    
    // Use the Docker modules data
    const currentModule = DOCKER_COURSE_MODULES.find(m => m.id === currentModuleId) || DEFAULT_MODULE;
    
    const currentSubmodules = currentModule.submodules; 
    const LAST_SUBMODULE_ID = currentSubmodules.length > 0 ? currentSubmodules[currentSubmodules.length - 1].id : "";
    
    const initialSubmodule = currentSubmodules[0]?.id || "";
    const [activeSection, setActiveSection] = useState<string>(initialSubmodule);
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [quizAttemptFailed, setQuizAttemptFailed] = useState(false);
    
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Module progress derived from local state and backend state
    const moduleProgress: ModuleProgress = useMemo(() => {
        const isQuizCompleted = isModuleFullyCompleted(currentModuleId, currentCompletedModules);
        
        // If completed by quiz (backend truth), always show 100% read progress.
        const readProgressValue = isQuizCompleted ? 100 : (localReadProgress[currentModuleId] || 0); 

        return { 
            readProgress: readProgressValue, 
            isCompleted: readProgressValue === 100, // Reading completion 
            isQuizCompleted: isQuizCompleted // Quiz/Module completion (Backend truth)
        };
    }, [currentModuleId, localReadProgress, currentCompletedModules]);

    // --- QUIZ COMPLETION HANDLER ---
    const handleQuizComplete = useCallback((success: boolean) => {
        if (success) {
            setQuizAttemptFailed(false);

            // Optimistically update local state for full module completion
            const backendId = moduleToBackendId(currentModuleId);
            setCurrentCompletedModules(prev => {
                if (!prev.includes(backendId)) {
                    console.log(`SIMULATING BACKEND: Marking module ${currentModuleId} (ID: ${backendId}) as completed.`);
                    return [...prev, backendId];
                }
                return prev;
            });
            
            // Ensure local read progress is 100%
            setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 100 }));
            
            setIsQuizActive(false);
            setTimeout(() => {
                const nextModule = DOCKER_COURSE_MODULES.find(m => m.id === currentModule.nextModuleId);
                const nextModuleTitle = nextModule?.title;
                alert(`Quiz passed! ${nextModuleTitle ? nextModuleTitle + ' is unlocked.' : 'Congratulations! You finished the course.'}`);
            }, 200);
        } else {
            setQuizAttemptFailed(true);
            alert("Quiz attempt failed. Please review the answers below before attempting again.");
        }
    }, [currentModuleId, currentModule.nextModuleId]);

    // --- SCROLL/READING TRACKING LOGIC (Same as previous hooks) ---
    const updateScrollProgress = useCallback(() => {
        if (isQuizActive || currentSubmodules.length === 0) return;
        const contentDiv = contentRef.current;
        if (!contentDiv) return;
        
        const { scrollTop, scrollHeight, clientHeight } = contentDiv;
        const scrollableHeight = scrollHeight - clientHeight;
        
        const currentReadProgress = localReadProgress[currentModuleId] || 0;

        if (scrollableHeight <= 0) {
             const isReadCompleted = activeSection === LAST_SUBMODULE_ID;
             if (isReadCompleted && currentReadProgress !== 100) {
                 setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 100 }));
             }
             return;
        }

        const calculatedProgress = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));

        if (calculatedProgress !== currentReadProgress) {
            const isReadCompleted = calculatedProgress >= 95 && activeSection === LAST_SUBMODULE_ID;
            
            if (calculatedProgress > currentReadProgress || isReadCompleted) {
                setLocalReadProgress(prev => ({ 
                    ...prev, 
                    [currentModuleId]: isReadCompleted ? 100 : calculatedProgress
                }));
            }
        }
    }, [isQuizActive, activeSection, currentModuleId, LAST_SUBMODULE_ID, localReadProgress, currentSubmodules.length]);

    useEffect(() => {
        const contentDiv = contentRef.current;
        if (contentDiv) contentDiv.addEventListener("scroll", updateScrollProgress);
        updateScrollProgress(); 
        return () => {
        if (contentDiv) contentDiv.removeEventListener("scroll", updateScrollProgress);
        };
    }, [updateScrollProgress]);

    // Reset scroll and state when module changes
    useEffect(() => {
        setIsQuizActive(false); 
        setQuizAttemptFailed(false);
        if (contentRef.current) contentRef.current.scrollTo(0, 0);
        
        // When module changes, ensure the first submodule is active
        const newSubmodule = currentModule.submodules[0]?.id || "";
        setActiveSection(newSubmodule);
        
        // Ensure uncompleted modules default to 0 on first view/switch.
        if (!localReadProgress.hasOwnProperty(currentModuleId)) {
             setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 0 }));
        }

    }, [currentModuleId]); 


    // --- NAVIGATION HANDLER ---
    const handleSectionChange = (id: string) => {
        const submodule = currentSubmodules.find((m) => m.id === id);
        if (submodule) {
            setActiveSection(id);
            setIsQuizActive(false); 
            setQuizAttemptFailed(false);
            if (contentRef.current) contentRef.current.scrollTo(0, 0);
        } 
        // Handle full module change
        else if (DOCKER_COURSE_MODULES.some(m => m.id === id)) { 
            const targetModule = DOCKER_COURSE_MODULES.find(m => m.id === id);
            
            if (targetModule && targetModule.id !== currentModuleId) {
                
                // Allow navigation if the target module is ALREADY completed
                const isTargetCompleted = isModuleFullyCompleted(targetModule.id, currentCompletedModules);
                if (isTargetCompleted) {
                    setCurrentModuleId(targetModule.id);
                    if (targetModule.submodules.length > 0) {
                        setActiveSection(targetModule.submodules[0].id);
                    } else {
                        setActiveSection(''); 
                    }
                    return; 
                }
                
                // Prerequisite check
                const targetIndex = DOCKER_COURSE_MODULES.findIndex(m => m.id === targetModule.id);
                const prerequisiteModule = DOCKER_COURSE_MODULES[targetIndex - 1];

                if (prerequisiteModule) {
                    const prerequisiteBackendId = moduleToBackendId(prerequisiteModule.id);
                    if (!currentCompletedModules.includes(prerequisiteBackendId)) {
                        alert(`You must complete the previous module (${prerequisiteModule.id}) and pass its quiz before starting ${targetModule.id}!`);
                        return;
                    }
                }

                // If prerequisites are met or is the first module, change to the target module
                setCurrentModuleId(targetModule.id);
                if (targetModule.submodules.length > 0) {
                    setActiveSection(targetModule.submodules[0].id);
                } else {
                    setActiveSection(''); 
                    alert(`Module ${targetModule.id} is a placeholder and has no content yet!`);
                }
            }
        } 
        else if (id === "final-project") {
            alert("Final Project is locked until all prerequisites are met!");
        }
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    // Handler to launch the quiz
    const handleLaunchQuiz = () => {
        if (moduleProgress.readProgress < 100) { 
            alert(`Please finish all reading sections in ${currentModuleId} before attempting the quiz. Your current read progress is ${moduleProgress.readProgress}%.`);
            return;
        }
        if (!QUIZ_QUESTIONS[currentModule.quizId] || QUIZ_QUESTIONS[currentModule.quizId].length === 0) {
             alert(`Quiz for ${currentModuleId} is not yet available.`);
             return;
        }

        setQuizAttemptFailed(false);
        setIsQuizActive(true);
        if (contentRef.current) contentRef.current.scrollTo(0, 0);
    };
    
    // Handler to go back to content from quiz
    const handleBackToContent = () => {
        setIsQuizActive(false);
        setQuizAttemptFailed(false);
    };

    // Defensive lookup for current submodule content
    const currentSubmodule =
        currentSubmodules.find((m) => m.id === activeSection) ||
        currentSubmodules[0] ||
        {
            id: 'default',
            title: 'Content Loading...',
            content: <p>Please select a valid section from the sidebar or reload the page.</p>,
            estimatedReadingTime: '0 min',
            moduleId: currentModule.id
        };
    
    // Derived from the moduleProgress useMemo
    const isModuleFullyComplete = moduleProgress.isCompleted && moduleProgress.isQuizCompleted;
    
    // --- Helper for the sidebar to determine if other modules are unlocked/completed ---
    const getModuleProgress = useCallback((moduleId: string): ModuleProgress => {
        const isQuizCompleted = isModuleFullyCompleted(moduleId, currentCompletedModules);
        
        return { 
            readProgress: isQuizCompleted ? 100 : 0, 
            isCompleted: isQuizCompleted, 
            isQuizCompleted: isQuizCompleted 
        };
    }, [currentCompletedModules]);


    return {
        // Module Data
        currentModule,
        currentSubmodule,
        currentSubmodules,
        currentModuleId,
        moduleProgress,
        isModuleFullyComplete,
        
        // UI State
        activeSection,
        isSidebarOpen,
        setIsSidebarOpen,
        isQuizActive,
        quizAttemptFailed,
        contentRef,
        
        // Handlers & Progress
        getModuleProgress, 
        handleSectionChange,
        handleLaunchQuiz,
        handleBackToContent,
        handleQuizComplete,
        onBack,
    };
};