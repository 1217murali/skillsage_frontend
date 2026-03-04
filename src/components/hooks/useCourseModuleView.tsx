import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
// NOTE: Assuming this file points to System Design data files
import { 
    ALL_COURSE_MODULES, 
    ModuleProgress, 
    ModuleDefinition, 
    DetailedSubmodule, 
    QUIZ_QUESTIONS 
} from '@/components/data/SystemDesignCourseData'; 

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
const moduleToBackendId = (moduleId: string): number => {
    const match = moduleId.match(/(\d+)$/); 
    if (match && match[0]) {
        const backendId = parseInt(match[0], 10);
        return isNaN(backendId) ? 0 : backendId;
    }
    return 0;
}

const isModuleFullyCompleted = (moduleId: string, completedModuleIds: number[]): boolean => {
    const backendId = moduleToBackendId(moduleId);
    return completedModuleIds.includes(backendId);
};


// --- Hook Definition ---
export const useCourseModuleView = (
    initialModuleId: string, 
    onBack: () => void,
    rawBackendProgress: CourseProgress[], // The full array of course progress
    currentCourseId: number // The ID of the course being viewed (e.g., 4)
) => {
    const navigate = useNavigate();

    // Find the current course progress data from props
    const initialCourseData = rawBackendProgress.find(c => c.id === currentCourseId);
    
    // MEMOIZATION FIX: We extract the completed modules array from the props and memoize it.
    // This array is the source of truth from the backend, and we use it to initialize and update state.
    const initialCompletedModules = useMemo(() => {
        return initialCourseData?.completed_modules || [];
    }, [initialCourseData]); // Only re-calculate if the entire initialCourseData object changes

    
    // localReadProgress tracks in-progress scroll percentage (local/session state only)
    const [localReadProgress, setLocalReadProgress] = useState<Record<string, number>>({});
    
    // The source of truth for quiz completion comes from the memoized initial data and local updates.
    // We initialize the state with the memoized value.
    const [currentCompletedModules, setCurrentCompletedModules] = useState<number[]>(
        initialCompletedModules
    );

    const [currentModuleId, setCurrentModuleId] = useState<string>(initialModuleId);
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
        
        // If the quiz is completed, local reading progress must be 100 for the UI to show completion.
        const readProgressValue = isQuizCompleted ? 100 : (localReadProgress[currentModuleId] || 0);

        return { 
            readProgress: readProgressValue, 
            isCompleted: readProgressValue === 100, // Reading completion
            isQuizCompleted: isQuizCompleted // Quiz/Module completion (Backend truth)
        };
    }, [currentModuleId, localReadProgress, currentCompletedModules]);

    // --- EFFECT 1: Sync initial/prop data to local state ---
    useEffect(() => {
        // This effect ensures that if the parent component re-fetches the rawBackendProgress 
        // and it results in a different completed modules array, we sync that change to 
        // our internal state and initialize reading progress correctly.
        
        // 1. Sync the completed modules array from props
        setCurrentCompletedModules(initialCompletedModules);

        // 2. Initialize local read progress
        if (!localReadProgress.hasOwnProperty(currentModuleId)) {
            const isQuizCompletedOnInit = isModuleFullyCompleted(currentModuleId, initialCompletedModules);

            setLocalReadProgress(prev => ({ 
                ...prev, 
                [currentModuleId]: isQuizCompletedOnInit ? 100 : 0
            }));
        }
        
    }, [initialCompletedModules, currentModuleId]); // Depend on stable initialCompletedModules array

    // --- EFFECT 2: Reset UI state upon module change ---
    useEffect(() => {
        setIsQuizActive(false); 
        setQuizAttemptFailed(false);
        if (contentRef.current) contentRef.current.scrollTo(0, 0);
    }, [currentModuleId]);


    // --- QUIZ COMPLETION HANDLER ---
    const handleQuizComplete = useCallback((success: boolean) => {
        if (success) {
            setQuizAttemptFailed(false);

            // 1. Optimistically update local state to reflect module completion (Backend truth)
            const backendId = moduleToBackendId(currentModuleId);
            setCurrentCompletedModules(prev => {
                if (!prev.includes(backendId)) {
                    // This update immediately drives the UI
                    return [...prev, backendId];
                }
                return prev;
            });
            
            // 2. Set local reading progress to 100% since the module is now fully complete
            setLocalReadProgress(prev => ({ ...prev, [currentModuleId]: 100 }));
            
            setIsQuizActive(false);
            
            // UI Feedback
            setTimeout(() => {
                const nextModule = ALL_COURSE_MODULES.find(m => m.id === currentModule.nextModuleId);
                const nextModuleTitle = nextModule?.title;
                // NOTE: Using a custom alert for better UI compatibility, though alert() is used here for simplicity
                alert(`Quiz passed! ${nextModuleTitle ? nextModuleTitle + ' is unlocked.' : 'Congratulations! You finished the course.'}`);
            }, 200);
            
        } else {
            setQuizAttemptFailed(true);
            alert("Quiz attempt failed. Please review the answers below before attempting again.");
        }
    }, [currentModuleId, currentModule.nextModuleId]);

    // --- SCROLL/READING TRACKING LOGIC ---
    const updateScrollProgress = useCallback(() => {
        if (isQuizActive || currentSubmodules.length === 0) return;
        const contentDiv = contentRef.current;
        if (!contentDiv) return;
        
        const { scrollTop, scrollHeight, clientHeight } = contentDiv;
        const scrollableHeight = scrollHeight - clientHeight;
        
        if (scrollableHeight <= 0) {
             const isReadCompleted = activeSection === LAST_SUBMODULE_ID;
             setLocalReadProgress(prev => {
                const currentReadProgress = prev[currentModuleId] || 0;
                if (isReadCompleted && currentReadProgress !== 100) {
                    return { ...prev, [currentModuleId]: 100 };
                }
                return prev;
             });
             return;
        }

        const calculatedProgress = Math.min(100, Math.round((scrollTop / scrollableHeight) * 100));

        setLocalReadProgress(prev => {
            const currentReadProgress = prev[currentModuleId] || 0;
            if (calculatedProgress !== currentReadProgress) {
                
                let newProgressValue = calculatedProgress;
                
                // If scrolled to the end of the final section, lock it at 100%
                const isReadCompleted = calculatedProgress >= 95 && activeSection === LAST_SUBMODULE_ID;
                if (isReadCompleted) {
                    newProgressValue = 100;
                }
                
                return { 
                    ...prev, 
                    [currentModuleId]: newProgressValue
                };
            }
            return prev;
        });

    }, [isQuizActive, activeSection, currentModuleId, LAST_SUBMODULE_ID, currentSubmodules.length]); // Dependencies are clean

    useEffect(() => {
        const contentDiv = contentRef.current;
        if (contentDiv) contentDiv.addEventListener("scroll", updateScrollProgress);
        updateScrollProgress(); 
        return () => {
            if (contentDiv) contentDiv.removeEventListener("scroll", updateScrollProgress);
        };
    }, [updateScrollProgress]); 

    
    // --- NAVIGATION HANDLER ---
    const handleSectionChange = (id: string) => {
        const submodule = currentSubmodules.find((m) => m.id === id);
        if (submodule) {
            setActiveSection(id);
            setIsQuizActive(false); 
            setQuizAttemptFailed(false);
            if (contentRef.current) contentRef.current.scrollTo(0, 0);
        } 
        else if (ALL_COURSE_MODULES.some(m => m.id === id)) { 
            const targetModule = ALL_COURSE_MODULES.find(m => m.id === id);
            
            if (targetModule && targetModule.id !== currentModuleId) {
                
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
                const targetIndex = ALL_COURSE_MODULES.findIndex(m => m.id === targetModule.id);
                const prerequisiteModule = ALL_COURSE_MODULES[targetIndex - 1];

                if (prerequisiteModule) {
                    const prerequisiteBackendId = moduleToBackendId(prerequisiteModule.id);
                    if (!currentCompletedModules.includes(prerequisiteBackendId)) {
                        alert(`You must complete the previous module (${prerequisiteModule.id}) and pass its quiz before starting ${targetModule.id}!`);
                        return;
                    }
                }

                // Passed checks, navigate to new module
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
