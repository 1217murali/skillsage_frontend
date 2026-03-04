import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle, ArrowRight, Layout, Server, Database, BookOpen } from 'lucide-react';

/* -------------------- INTERFACES -------------------- */
interface SkillNodeProps {
    id: number;
    title: string;
    description?: string;
    status: 'locked' | 'unlocked' | 'completed' | 'in-progress';
    progress: number;
    icon?: React.ReactNode;
    onClick: (id: number) => void;
}

/* -------------------- COURSE CARD COMPONENT -------------------- */
const CourseCard: React.FC<SkillNodeProps> = ({ id, title, description, status, progress, icon, onClick }) => {
    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';
    const isInProgress = status === 'in-progress';

    // Status Colors
    const statusColor = isCompleted ? 'text-emerald-500' : isInProgress ? 'text-blue-500' : isLocked ? 'text-slate-400' : 'text-indigo-500';
    const bgColor = isLocked ? 'bg-slate-50 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-800';
    const borderColor = isLocked ? 'border-slate-200 dark:border-slate-700' : isInProgress ? 'border-blue-200 dark:border-blue-900' : 'border-slate-200 dark:border-slate-700';

    return (
        <motion.div
            className={`
                relative flex flex-col p-6 rounded-2xl border ${borderColor} ${bgColor}
                shadow-sm hover:shadow-md transition-all duration-300 w-full
                ${!isLocked && 'cursor-pointer hover:-translate-y-1'}
            `}
            onClick={() => !isLocked && onClick(id)}
        >
            {/* Header: Icon & Status */}
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${isLocked ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}>
                    {icon || <BookOpen size={24} />}
                </div>
                {isCompleted && <CheckCircle className="text-emerald-500" size={24} />}
                {isLocked && <Lock className="text-slate-400" size={20} />}
            </div>

            {/* Content: Title & Desc */}
            <div className="mb-6 flex-grow">
                <h3 className={`text-lg font-bold mb-2 ${isLocked ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                    {title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {description || "Master these skills to advance your career."}
                </p>
            </div>

            {/* Footer: Progress & Action */}
            <div className="mt-auto">
                {!isLocked ? (
                    <>
                        <div className="flex justify-between text-xs font-semibold mb-2">
                            <span className={statusColor}>
                                {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Start Course'}
                            </span>
                            <span className="text-slate-400">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                                className={`h-full ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1 }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex items-center text-sm text-slate-400 font-medium">
                        <Lock size={16} className="mr-2" />
                        <span>Locked</span>
                    </div>
                )}

                {/* Hover Action Hint */}
                {!isLocked && (
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="p-2 bg-indigo-600 rounded-full text-white shadow-lg">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

/* -------------------- MAIN GRID COMPONENT -------------------- */
interface SkillMapProps {
    plans: any[];
    onNodeClick: (id: number) => void;
}

export const SkillMap: React.FC<SkillMapProps> = ({ plans, onNodeClick }) => {
    const getPlan = (id: number) => plans.find(p => p.id === id) || { id, title: 'Unknown', progress: 0, completed: false, started: false };

    // Define courses with metadata
    const courses = [
        { ...getPlan(1), icon: <Layout />, description: "Frontend & Backend development. React, Node, SQL." },
        { ...getPlan(2), icon: <Server />, description: "Scalable architecture. Load balancing, Caching, Databases." },
        { ...getPlan(3), icon: <BookOpen />, description: "Data Structures & Algorithms. Arrays, Graphs, DP." },
        { ...getPlan(4), icon: <Database />, description: "Containerization. Docker basics & Kubernetes orchestration." },
    ];

    const getStatus = (course: any) => {
        if (course.completed) return 'completed';
        if (course.started || course.progress > 0) return 'in-progress';
        // Logic for unlocking: Typically sequential, but for simplicity here we can leave them open or check previous
        // For now, let's keep them unlocked or check id-1.
        return 'unlocked';
    };

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Courses</h2>
                <p className="text-slate-500 dark:text-slate-400">Continue where you left off or start a new track.</p>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        description={course.description}
                        status={getStatus(course)}
                        progress={course.progress}
                        icon={course.icon}
                        onClick={onNodeClick}
                    />
                ))}
            </div>
        </div>
    );
};
