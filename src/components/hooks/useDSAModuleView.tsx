// src/hooks/useDSAModuleView.tsx

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ALL_COURSE_MODULES, ModuleProgress, ModuleDefinition, DetailedSubmodule, QUIZ_QUESTIONS } from '@/components/data/DSACourseData'; 

// --- TYPES for Backend Progress Data ---
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

// --- Progress Helper Functions (Based on Raw Backend Data) ---

// FIX: This function correctly parses 'm-101' (or 'M-201') into the number 101 or 201.
const moduleToBackendId = (moduleId: string): number => {
    // Regex matches the number at the end of the string, ignoring the 'm-' prefix.
    const match = moduleId.match(/(\d+)$/); 
    
    if (match && match[0]) {
        const backendId = parseInt(match[0], 10);
        // Return the number if it's a valid integer (non-NaN)
        return isNaN(backendId) ? 0 : backendId;
    }
    
    // Fallback logic for module IDs that don't end in numbers (e.g., 'm-default')
    return 0;
}

// Check if a module is completed based on the raw progress data
const isModuleFullyCompleted = (moduleId: string, completedModuleIds: number[]): boolean => {
    const backendId = moduleToBackendId(moduleId);
    return completedModuleIds.includes(backendId);
};


// --- Hook Definition ---
export const useDSAModuleView = (
    initialModuleId: string, 
    onBack: () => void,
    rawBackendProgress: CourseProgress[], // The full array of course progress
    currentCourseId: number // The ID of the course being viewed (e.g., 3)
) => {
    const navigate = useNavigate();

    // Find the current course progress
    const initialCourseData = rawBackendProgress.find(c => c.id === currentCourseId);
    
    // NOTE: localReadProgress is needed to track in-progress scroll percentage (e.g., 50%) 
    // which is not provided by the simplified rawBackendProgress (which only tracks final completion).
    const [localReadProgress, setLocalReadProgress] = useState<Record<string, number>>({});
    
    // We'll treat the completed_modules array as the source of truth for completion.
    const [currentCompletedModules, setCurrentCompletedModules] = useState<number[]>(
        initialCourseData?.completed_modules || []
    );


    const [currentModuleId, setCurrentModuleId] = useState<string>(initialModuleId);
    
    // NOTE: ALL_COURSE_MODULES must now use string IDs like "101"
    const currentModule = ALL_COURSE_MODULES.find(m => m.id === currentModuleId) || DEFAULT_MODULE;
    
    const currentSubmodules = currentModule.submodules; 
    const LAST_SUBMODULE_ID = currentSubmodules.length > 0 ? currentSubmodules[currentSubmodules.length - 1].id : "";
    
    const initialSubmodule = currentSubmodules[0]?.id || "";
    const [activeSection, setActiveSection] = useState<string>(initialSubmodule);
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [quizAttemptFailed, setQuizAttemptFailed] = useState(false);
    
    const contentRef = useRef<HTMLDivElement>(null);
    
    // Module progress derived from local state (for reading) and backend state (for completion)
    const moduleProgress: ModuleProgress = useMemo(() => {
        const isQuizCompleted = isModuleFullyCompleted(currentModuleId, currentCompletedModules);
        
        // FIX: If the quiz is completed, local reading progress must be 100 for the UI to show completion.
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

            // 1. Simulate "backend" update for full module completion
            const backendId = moduleToBackendId(currentModuleId);
            setCurrentCompletedModules(prev => {
                if (!prev.includes(backendId)) {
                    // *** REAL WORLD: CALL BACKEND API TO UPDATE COURSE PROGRESS ***
                    console.log(`SIMULATING BACKEND: Marking module ${currentModuleId} (ID: ${backendId}) as completed.`);
                    return [...prev, backendId];
                }
                return prev;
            });
            
            // FIX: Set local reading progress to 100% since the module is now fully complete (reading + quiz)
            setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 100 }));
            
            setIsQuizActive(false);
            setTimeout(() => {
                const nextModule = ALL_COURSE_MODULES.find(m => m.id === currentModule.nextModuleId);
                const nextModuleTitle = nextModule?.title;
                alert(`Quiz passed! ${nextModuleTitle ? nextModuleTitle + ' is unlocked.' : 'Congratulations! You finished the course.'}`);
            }, 200);
        } else {
            setQuizAttemptFailed(true);
            alert("Quiz attempt failed. Please review the answers below before attempting again.");
        }
    }, [currentModuleId, currentModule.nextModuleId, currentModule.id]);

    // --- SCROLL/READING TRACKING LOGIC ---
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
                 // Mark local reading progress as 100%
                 setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 100 }));
                 // NOTE: Reading progress (100%) is now local state, not saved to 'backend' via an intermediate save function
             }
             return;
        }

        const calculatedProgress = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));

        if (calculatedProgress !== currentReadProgress) {
            const isReadCompleted = calculatedProgress >= 95 && activeSection === LAST_SUBMODULE_ID;
            
            // Only update local reading progress state
            setLocalReadProgress(prev => ({ 
                ...prev, 
                [currentModuleId]: calculatedProgress
            }));

            if (isReadCompleted && calculatedProgress === 100) {
                // Ensure local state is definitively 100 if the conditions are met
                setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 100 }));
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

    // Reset scroll and quiz state when module changes
    useEffect(() => {
        setIsQuizActive(false); 
        setQuizAttemptFailed(false);
        if (contentRef.current) contentRef.current.scrollTo(0, 0);
        
        // FIX: Initialize local read progress to 100 if the module is already quiz-completed
        if (!localReadProgress.hasOwnProperty(currentModuleId)) {
            const isQuizCompletedOnInit = isModuleFullyCompleted(currentModuleId, currentCompletedModules);

            setLocalReadProgress(prev => ({ 
                ...prev, 
                [currentModuleId]: isQuizCompletedOnInit ? 100 : 0
            }));
        }
    }, [currentModuleId, currentCompletedModules]); // ADD currentCompletedModules to dependency array


    // --- NAVIGATION HANDLER ---
    const handleSectionChange = (id: string) => {
        // NOTE: Submodule IDs should ideally be different from Module IDs to prevent conflicts. 
        // Assuming submodule IDs don't look like number strings (e.g., they might be 'section-1-1').
        const submodule = currentSubmodules.find((m) => m.id === id);
        if (submodule) {
            setActiveSection(id);
            setIsQuizActive(false); 
            setQuizAttemptFailed(false);
            if (contentRef.current) contentRef.current.scrollTo(0, 0);
        } 
        // Check if the ID is a module ID (now a string of a number, e.g., "101")
        else if (ALL_COURSE_MODULES.some(m => m.id === id)) { // Simplified module ID check
            const targetModule = ALL_COURSE_MODULES.find(m => m.id === id);
            
            if (targetModule && targetModule.id !== currentModuleId) {
                
                // FIX: If the target module is ALREADY completed, allow navigation directly.
                const isTargetCompleted = isModuleFullyCompleted(targetModule.id, currentCompletedModules);
                if (isTargetCompleted) {
                    setCurrentModuleId(targetModule.id);
                    if (targetModule.submodules.length > 0) {
                        setActiveSection(targetModule.submodules[0].id);
                    } else {
                        setActiveSection(''); 
                        alert(`Module ${targetModule.id} is a placeholder and has no content yet!`);
                    }
                    return; // Exit if already completed
                }
                
                // If not completed, perform the prerequisite check
                const targetIndex = ALL_COURSE_MODULES.findIndex(m => m.id === targetModule.id);
                const prerequisiteModule = ALL_COURSE_MODULES[targetIndex - 1];

                // Prerequisite check: Check if the previous module is in the 'currentCompletedModules' array
                if (prerequisiteModule) {
                    const prerequisiteBackendId = moduleToBackendId(prerequisiteModule.id);
                    if (!currentCompletedModules.includes(prerequisiteBackendId)) {
                        alert(`You must complete the previous module (${prerequisiteModule.id}) and pass its quiz before starting ${targetModule.id}!`);
                        return;
                    }
                }

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
        // Now checks the 'isCompleted' from the moduleProgress useMemo result
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
        // If the quiz is completed, the read progress is implicitly 100.
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
        getModuleProgress, // Function for checking other modules' completion status
        handleSectionChange,
        handleLaunchQuiz,
        handleBackToContent,
        handleQuizComplete,
        onBack,
    };
};