import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AvatarDisplay } from '@/components/gamification/AvatarDisplay';
import { SkillMap } from '@/components/gamification/SkillMap';

// --- Interfaces ---

interface Resource {
    id: number; type: 'video' | 'article' | 'practice'; title: string; description: string; duration: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; completed: boolean; rating: number; category: string; url?: string;
}

interface LearningPlan {
    id: number; // The DB ID for the progress record
    type: 'path'; title: string; description: string; progress: number; totalItems: number; completedItems: number; estimatedTime: string; category: string; duration: string; difficulty: 'All' | 'Beginner' | 'Intermediate' | 'Advanced'; completed: boolean; rating: number;
    started: boolean; ended: boolean; // Dynamic status fields
    completedModuleIds: number[];
}

interface GamificationProfile {
    level: number;
    xp: number;
    next_level_xp: number;
    inventory: any[];
    avatar?: string;
}

type LearningItem = Resource | LearningPlan

// --- Backend/Utility Helper Functions ---

const API_ENDPOINT_BASE = 'http://127.0.0.1:8000';
const GET_COURSES_URL = `${API_ENDPOINT_BASE}/get_or_create_courses/`;
const START_COURSE_ENDPOINT = `${API_ENDPOINT_BASE}/start_course/`;
const GAMIFICATION_PROFILE_URL = `${API_ENDPOINT_BASE}/gamification_profile/`;

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

// --- STATIC COURSE DEFINITION ---
const INITIAL_LEARNING_PLANS: LearningPlan[] = [
    { id: 1, type: 'path', title: 'Full Stack Developer Path', description: 'Complete path from frontend to backend development', progress: 0, totalItems: 12, completedItems: 0, estimatedTime: '8 weeks', category: 'Full Stack', duration: '8 weeks', difficulty: 'Beginner', completed: false, rating: 4.8, started: false, ended: false, completedModuleIds: [] },
    { id: 2, type: 'path', title: 'System Design Mastery', description: 'Learn to design scalable and reliable systems', progress: 0, totalItems: 10, completedItems: 0, estimatedTime: '6 weeks', category: 'System Design', duration: '6 weeks', difficulty: 'Intermediate', completed: false, rating: 4.7, started: false, ended: false, completedModuleIds: [] },
    { id: 3, type: 'path', title: 'Algorithm Interview Prep', description: 'Master data structures and algorithms for interviews', progress: 0, totalItems: 16, completedItems: 0, estimatedTime: '4 weeks', category: 'Algorithms', duration: '4 weeks', difficulty: 'Intermediate', completed: false, rating: 4.9, started: false, ended: false, completedModuleIds: [] },
    { id: 4, type: 'path', title: 'Docker and Kubernetes Deep Dive', description: 'From Dockerfile to production-ready Kubernetes deployments.', progress: 0, totalItems: 8, completedItems: 0, estimatedTime: '5 weeks', category: 'DevOps', duration: '5 weeks', difficulty: 'Intermediate', completed: false, rating: 4.7, started: false, ended: false, completedModuleIds: [] },
];


/**
 * Fetches course progress from the backend and defensively merges it with static plan data.
 */
const fetchCourseProgress = async (setLoading: Function, setPlans: Function, staticPlans: LearningPlan[]) => {
    // setLoading(true); // Handled by parent or separate loading state if needed
    const token = getAccessToken();

    if (!token) {
        console.warn("Authentication token not found. Cannot sync data.");
        const localData = localStorage.getItem('localCourseProgress');
        if (localData) setPlans(JSON.parse(localData));
        else setPlans(staticPlans);
        return;
    }

    try {
        const response = await fetch(GET_COURSES_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP fetch failed with status: ${response.status}. Check token or server logs.`);
        }

        const data = await response.json();
        const fetchedProgress = data.data || [];

        // --- DEFENSIVE MERGE: Ensures all static plans have a base entry in fetchedProgress ---
        const safeFetchedProgress = [...fetchedProgress];
        staticPlans.forEach(staticPlan => {
            const dynamicData = fetchedProgress.find((d: any) => d.course_name === staticPlan.title);
            if (!dynamicData) {
                // If the course isn't found, create a zero-progress placeholder.
                safeFetchedProgress.push({
                    id: staticPlan.id,
                    course_name: staticPlan.title,
                    progress_percent: 0,
                    is_completed: false,
                    started: false,
                    ended: false,
                    total_modules: staticPlan.totalItems,
                    completed_modules: [],
                });
            }
        });
        // ----------------------------------------------------------------------------------

        localStorage.setItem('rawBackendProgress', JSON.stringify(safeFetchedProgress)); // Store the complete list

        const mergedPlans: LearningPlan[] = staticPlans.map(staticPlan => {
            // This lookup now uses the correct 'Full Stack Developer Path' string.
            const dynamicData = safeFetchedProgress.find((d: any) => d.course_name === staticPlan.title);

            if (dynamicData) {
                return {
                    ...staticPlan,
                    id: dynamicData.id,
                    progress: Math.round(dynamicData.progress_percent),
                    completed: dynamicData.is_completed,
                    started: dynamicData.started,
                    ended: dynamicData.ended,
                    completedItems: dynamicData.completed_modules.length,
                    totalItems: dynamicData.total_modules,
                    completedModuleIds: dynamicData.completed_modules || []
                } as LearningPlan;
            }
            return staticPlan;
        });

        setPlans(mergedPlans);
        localStorage.setItem('localCourseProgress', JSON.stringify(mergedPlans));
        console.log("Successfully merged and stored course progress.");


    } catch (error) {
        console.error("Fetch Error - Data not stored:", error);
        const localData = localStorage.getItem('localCourseProgress');
        if (localData) {
            setPlans(JSON.parse(localData));
        }
    }
};

const fetchGamificationProfile = async (setProfile: Function) => {
    const token = getAccessToken();
    if (!token) return;

    try {
        const response = await fetch(GAMIFICATION_PROFILE_URL, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            setProfile(data);
        }
    } catch (e) {
        console.error("Failed to load gamification profile", e);
    }

};


export function Learning() {

    const [loading, setLoading] = useState(true);
    const [learningPlans, setLearningPlans] = useState<LearningPlan[]>(INITIAL_LEARNING_PLANS);
    const [profile, setProfile] = useState<GamificationProfile | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([
                fetchCourseProgress(setLoading, setLearningPlans, INITIAL_LEARNING_PLANS),
                fetchGamificationProfile(setProfile)
            ]);
            setLoading(false);
        };
        init();
    }, []);


    // --- Navigation Handlers ---
    const handleViewCourse = async (planId: number) => {
        const plan = learningPlans.find(p => p.id === planId);
        if (!plan) return;

        // 1. If not started, call backend to set started=true (API call logic retained)
        if (!plan.started) {
            const token = getAccessToken();
            if (token) {
                try {
                    console.log(`Marking course ${plan.title} as started.`);

                    await fetch(START_COURSE_ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            course_name: plan.title
                        })
                    });

                    // Optimistically update local state BEFORE navigating
                    setLearningPlans(prev => prev.map(p => p.id === planId ? { ...p, started: true } : p));
                } catch (error) {
                    console.error("Failed to mark course as started:", error);
                }
            }
        }

        // 2. Navigate to the course view (using external routes)
        if (planId === 1) {
            navigate('/learning/fullstack'); // Full Stack route
        }

        else if (planId === 2) {
            navigate('/learning/system-design'); // System Design route
        }

        else if (planId === 3) {
            navigate('/learning/dsa'); // DSA route
        }
        // 🛑 FIX: Docker course now navigates to the external route.
        else if (planId === 4) {
            navigate('/learning/docker-kubernetes'); // Docker/Kubernetes route
        }
    }


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-gray-300 dark:border-gray-700"></div>
                        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-t-indigo-600 dark:border-t-indigo-400 animate-spin"></div>
                    </div>
                    <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                        Loading Skill Tree...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center">
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-slate-950/80 fixed pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative max-w-6xl mx-auto space-y-8 z-10"
            >
                {/* 1. Avatar Status Section */}
                {profile && (
                    <section>
                        <AvatarDisplay
                            level={profile.level}
                            xp={profile.xp}
                            nextLevelXp={profile.next_level_xp}
                            inventory={profile.inventory}
                            avatarUrl={profile.avatar}
                        />
                    </section>
                )}

                {/* 2. Skill Map Section */}
                <section>
                    <SkillMap
                        plans={learningPlans}
                        onNodeClick={handleViewCourse}
                    />
                </section>

                {/* Legend or Tips */}
                <section className="bg-slate-900/60 backdrop-blur-sm p-4 rounded-lg border border-slate-800 text-sm text-slate-400 flex gap-4 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div> Completed
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div> In Progress
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-500"></div> Locked
                    </div>
                </section>
            </motion.div>
        </div>
    )
}
