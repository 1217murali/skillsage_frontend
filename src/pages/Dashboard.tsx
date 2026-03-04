import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    MessageSquare,
    GraduationCap,
    Award,
    Clock,
    Target,
    Brain,
    Zap, // Added Zap icon for Points
    Loader2,
    Video,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Link } from 'react-router-dom';

// --- CONFIG ---
const API_URL = "http://127.0.0.1:8000/dashboard/";
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// --- INITIAL DATA STRUCTURE (UPDATED) ---
const initialDashboardData = {
    user: { name: 'Loading User...' },
    quickStats: {
        lastInterview: { title: 'N/A', date: 'Not yet started!' },
        lastLearningCourse: { title: 'N/A', progress: 0, date: 'Not yet started!' },
        resumePerformance: null,
        learningDaysStreak: 0,
        totalPoints: 0, // ADDED: New field for points
    },
    activityPerformanceData: MONTHS.map(month => ({ month, activeDays: 0, interviews: 0 })),
    knowledgePoints: [],
    recentActivities: [],
};

// --- Helper Functions ---
const getFullYearPerformance = (performanceData) => {
    const dataMap = new Map(performanceData.map(item => [item.month, item]));
    return MONTHS.map(month => ({
        month,
        activeDays: dataMap.get(month)?.activeDays || 0,
        interviews: dataMap.get(month)?.interviews || 0,
    }));
};

// --- CORRECTED EMOJIS ---
const getResumePerformance = (performance) => {
    switch (performance?.toLowerCase()) {
        case 'poor':
            return { text: 'Poor 🙁', color: 'bg-red-500/20 text-red-600 border border-red-500' };
        case 'average':
            return { text: 'Average 😐', color: 'bg-yellow-500/20 text-yellow-600 border border-yellow-500' };
        case 'good':
            return { text: 'Good! 👍', color: 'bg-green-500/20 text-green-600 border border-green-500' };
        default:
            return { text: 'Not yet started!', color: 'bg-gray-500/20 text-gray-600 border border-gray-500' };
    }
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const activeDays = payload.find(p => p.dataKey === 'activeDays');
        const interviews = payload.find(p => p.dataKey === 'interviews');
        return (
            <div className="p-2 bg-card border border-border rounded-md shadow-md text-xs sm:text-sm">
                <p className="font-bold text-base mb-1">{label}</p>
                <p style={{ color: activeDays?.stroke }}>
                    Active Days: <span className="font-semibold">{activeDays?.value || 0}</span>
                </p>
                <p style={{ color: interviews?.stroke }}>
                    Interviews: <span className="font-semibold">{interviews?.value || 0}</span>
                </p>
            </div>
        );
    }
    return null;
};

// --- Dashboard Component ---
export function Dashboard() {
    const [data, setData] = useState(initialDashboardData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError("Authentication token not found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(API_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API Status ${response.status}: ${errorText.substring(0, 100)}...`);
                }

                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(`Failed to load dashboard data. ${err.message || 'Check your network connection.'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const { quickStats, activityPerformanceData, knowledgePoints, recentActivities, user } = data;
    const performanceChartData = getFullYearPerformance(activityPerformanceData);
    const resumeStatus = getResumePerformance(quickStats.resumePerformance);
    const lastInterview = quickStats.lastInterview;
    const lastCourse = quickStats.lastLearningCourse;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <span className="text-lg font-semibold text-muted-foreground">Loading Dashboard...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 sm:p-10 text-center bg-red-50 border border-red-200 rounded-lg m-4 sm:m-10">
                <h2 className="text-lg sm:text-xl font-bold text-red-600 mb-2">Error Loading Data</h2>
                <p className="text-red-500 font-mono text-xs sm:text-sm break-all">{error}</p>
                <p className="text-xs sm:text-sm text-red-400 mt-3">
                    Check your API server (http://127.0.0.1:8000) and token.
                </p>
                <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                    Welcome back, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Here's your career development overview
                </p>
            </motion.div>

            {/* Quick Stats (MODIFIED GRID) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                // CHANGED: From lg:grid-cols-4 to lg:grid-cols-5 to accommodate the new points card in one row
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6"
            >
                {/* 1. Last Interview Card (unchanged) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm sm:text-base font-medium">Last Interview</CardTitle>
                        <MessageSquare className="h-4 w-4 text-accent-blue" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-xl font-bold truncate">{lastInterview.title}</div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {lastInterview.date ? `Completed: ${lastInterview.date}` : 'Not yet started!'}
                        </p>
                    </CardContent>
                </Card>

                {/* 2. Resume Performance Card (unchanged, but now uses corrected emojis) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm sm:text-base font-medium">Resume Performance</CardTitle>
                        <FileText className="h-4 w-4 text-accent-green" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-2xl font-bold">
                            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-semibold ${resumeStatus.color}`}>
                                {resumeStatus.text}
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {quickStats.resumePerformance ? 'After last analysis' : 'Upload your resume!'}
                        </p>
                    </CardContent>
                </Card>

                {/* 3. Last Learning Course Card (unchanged) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm sm:text-base font-medium">Last Learning Course</CardTitle>
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-xl font-bold truncate">{lastCourse.title}</div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {lastCourse.progress !== undefined ? `Progress: ${lastCourse.progress}%` : 'Not yet started!'}
                        </p>
                    </CardContent>
                </Card>

                {/* 4. Total Points Card (NEW CARD) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm sm:text-base font-medium">Total Points</CardTitle>
                        <Zap className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-2xl font-bold">{quickStats.totalPoints || '0'} pts</div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            Earned from activity
                        </p>
                    </CardContent>
                </Card>

                {/* 5. Learning Days Card (Original 4th card, now 5th) */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm sm:text-base font-medium">Learning Days</CardTitle>
                        <Award className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg sm:text-2xl font-bold">{quickStats.learningDaysStreak || '0'} days</div>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {quickStats.learningDaysStreak > 0 ? 'Keep up the momentum!' : 'Start your streak today!'}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Charts and Knowledge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Activity Performance</CardTitle>
                            <CardDescription>Active Days & Interviews (Monthly)</CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 sm:p-4">
                            <div className="w-full h-64 sm:h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={performanceChartData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="month" />
                                        <YAxis allowDecimals={false} domain={[0, 'auto']} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ paddingTop: 8 }} />
                                        <Line type="monotone" dataKey="activeDays" stroke="#1E90FF" strokeWidth={2} dot={{ r: 3 }} />
                                        <Line type="monotone" dataKey="interviews" stroke="#FF8C00" strokeWidth={2} dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="h-full flex flex-col">
                        <CardHeader>
                            <CardTitle>Knowledge Points</CardTitle>
                            <CardDescription>Insights to boost your career</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3 overflow-y-auto max-h-72 sm:max-h-96">
                            {knowledgePoints.length > 0 ? (
                                knowledgePoints.map((point, index) => {
                                    const Icon = index === 0 ? Brain : Target;
                                    return (
                                        <div key={index} className="flex items-start space-x-3 p-2 sm:p-3 rounded-lg border border-dashed hover:bg-muted/10">
                                            <Icon className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-sm">{point.title}</p>
                                                <p className="text-xs text-muted-foreground">{point.content}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center p-6 sm:p-10 text-muted-foreground">
                                    <Zap className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                    <p>No knowledge points available.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Recent Activities + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activities</CardTitle>
                            <CardDescription>Your latest updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 sm:space-y-4">
                                {recentActivities.length > 0 ? (
                                    recentActivities.map((activity, index) => {
                                        const IconMap = { FileText, MessageSquare, GraduationCap };
                                        const ActivityIcon = IconMap[activity.icon] || Clock;
                                        return (
                                            <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-muted/20 border">
                                                <div className="flex items-center space-x-3 sm:space-x-4">
                                                    <div className="p-2 rounded-full bg-primary/10">
                                                        <ActivityIcon className={`h-5 w-5 ${activity.color}`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm sm:text-base">{activity.title}</p>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                                            {activity.type === 'interview' ? 'Activity Completed' : activity.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end space-x-2 mt-2 sm:mt-0">
                                                    {activity.type === 'course' && (
                                                        <div className="w-20">
                                                            <Progress value={activity.progress} className="h-2" />
                                                        </div>
                                                    )}
                                                    {activity.type === 'resume' && (
                                                        <div className="inline-flex items-center rounded-full px-2 sm:px-3 py-1 text-xs font-bold text-blue-600 bg-blue-500/20">
                                                            {activity.detail.split(': ')[1]}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{activity.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center p-6 sm:p-10 text-muted-foreground">
                                        <p>No recent activities found.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Start your next step</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4">
                            <Link to="/interview">
                                <Button className="w-full justify-start text-sm sm:text-base" variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4 text-accent-blue" />
                                    Start Interview
                                </Button>
                            </Link>
                            <Link to="/resume">
                                <Button className="w-full justify-start text-sm sm:text-base" variant="outline">
                                    <FileText className="mr-2 h-4 w-4 text-accent-green" />
                                    Analyze Resume
                                </Button>
                            </Link>
                            <Link to="/learning">
                                <Button className="w-full justify-start text-sm sm:text-base" variant="outline">
                                    <GraduationCap className="mr-2 h-4 w-4 text-purple-500" />
                                    Continue Learning
                                </Button>
                            </Link>
                            <Link to="/p2p-interview">
                                <Button className="w-full justify-start text-sm sm:text-base" variant="outline">
                                    <Video className="mr-2 h-4 w-4 text-blue-500" />
                                    P2P Mock Interview
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </div >
        </div >
    );
}