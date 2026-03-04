import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Save, Camera, Award, MessageSquare, GraduationCap, Zap,LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// --- Types for new data ---
interface QuickStats {
    interviewsCompleted: number;
    learningStreak: number;
    skillsImproved: number;
}

interface Achievement {
    type: 'interview' | 'course';
    title: string;
    detail: string;
    points: number;
    date: string;
    icon: string;
    color: string;
}

const STATS_API_URL = "http://127.0.0.1:8000/profile_stats/";
const PROFILE_API_URL = "http://127.0.0.1:8000/profile/";
const PROFILE_IMAGE_UPLOAD_URL = "http://127.0.0.1:8000/upload-profile-picture/";

const initialStats: QuickStats = {
    interviewsCompleted: 0,
    learningStreak: 0,
    skillsImproved: 0,
};

// --- Profile Component ---
export function Profile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        experience: '',
    });
    const [profileImage, setProfileImage] = useState<string>('');
    const [quickStats, setQuickStats] = useState<QuickStats>(initialStats);
    const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true); // Single loader for all data

    // Fetch current profile and dynamic stats
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error("Authentication token not found.");
            setLoading(false);
            return;
        }

        const headers = { 'Authorization': `Bearer ${token}` };

        // 1. Fetch Profile Details
        const fetchProfile = fetch(PROFILE_API_URL, { headers })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch profile details.");
                return res.json();
            })
            .then(data => {
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    location: data.location || '',
                    title: data.title || '',
                    experience: data.experience || '',
                });
                if (data.profile_image) setProfileImage(data.profile_image);
            })
            .catch(err => console.error('Error fetching profile details:', err));

        // 2. Fetch Dynamic Stats and Achievements
        const fetchStats = fetch(STATS_API_URL, { headers })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch profile stats.");
                return res.json();
            })
            .then(data => {
                setQuickStats(data.quickStats);
                setRecentAchievements(data.recentPointsAchieved);
            })
            .catch(err => console.error('Error fetching profile stats:', err));

        // Wait for both fetches to complete
        Promise.all([fetchProfile, fetchStats])
            .finally(() => setLoading(false));

    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(PROFILE_API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Profile updated:', data);
        })
        .catch((err) => console.error('Error updating profile:', err));
    };
const handleLogout = async () => {
    const access_token = localStorage.getItem('access_token'); // <-- Retrieve Access Token
    const refresh_token = localStorage.getItem('refresh_token');
    const LOGOUT_URL = 'http://127.0.0.1:8000/logout/';

    if (!refresh_token) {
       
        localStorage.removeItem('access_token');
        window.location.reload();
        return;
    }

    // Prepare Authorization header
    const authHeader = access_token ? { 'Authorization': `Bearer ${access_token}` } : {};

    try {
        const response = await fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeader, // <-- INCLUDE THE ACCESS TOKEN HERE
            },
            body: JSON.stringify({ refresh: refresh_token }),
        });

        if (response.status === 205) {
            console.log("Backend logout successful (Token blacklisted).");
            alert('Logout successful. Redirecting...');
            
            // Clear tokens ONLY on success
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.reload();

        } else {
            const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
            console.error("Backend logout failed:", errorData.detail || `Status ${response.status}`);
            alert(`Logout failed on server: ${errorData.detail || 'Please try again.'}`);
        }
    } catch (error) {
        console.error("Network error during logout request:", error);
        alert('Network error. Could not connect to the server for secure logout.');
    }
}

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(PROFILE_IMAGE_UPLOAD_URL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to upload image");

            const data = await res.json();
            if (data.profile_image) {
                setProfileImage(data.profile_image); // update state immediately
            }
        } catch (err) {
            console.error("Error uploading image:", err);
        }
    };

    const achievementIconMap = {
        'MessageSquare': MessageSquare,
        'GraduationCap': GraduationCap,
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Zap className="h-10 w-10 animate-pulse text-primary mb-3" />
                    <span className="text-xl font-semibold text-muted-foreground">Loading Profile Data...</span>
                </motion.div>
            </div>
        );
    }


    return (
        <div className="min-h-screen p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto space-y-8"
            >
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your account settings and preferences</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                disabled // read-only
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="location">Location</Label>
                                            <Input
                                                id="location"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Job Title</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="experience">Experience Level</Label>
                                            <Select
                                                value={formData.experience}
                                                onValueChange={(value) => setFormData({ ...formData, experience: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="0-1 years">0-1 years</SelectItem>
                                                    <SelectItem value="2-3 years">2-3 years</SelectItem>
                                                    <SelectItem value="4-5 years">4-5 years</SelectItem>
                                                    <SelectItem value="5+ years">5+ years</SelectItem>
                                                    <SelectItem value="10+ years">10+ years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <Button type="submit" variant="gradient">
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Quick Stats (UPDATED) */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Points Achieved</CardTitle>
                                <CardDescription>Your last 3 point-earning activities</CardDescription>
                                <CardDescription>*Note: Reflects your current total points each learning course milestones</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {recentAchievements.length > 0 ? (
                                    recentAchievements.map((achievement, index) => {
                                        const Icon = achievementIconMap[achievement.icon] || Award;
                                        return (
                                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/20">
                                                <div className="p-2 bg-primary/10 rounded-full">
                                                    <Icon className={`h-4 w-4 ${achievement.color}`} />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-medium text-sm">{achievement.title}</p>
                                                    <p className="text-xs text-muted-foreground">{achievement.detail}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <span className="font-bold text-sm text-green-600 flex items-center">
                                                        <Zap className="h-3 w-3 mr-1" />
                                                        +{achievement.points}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center p-4 text-muted-foreground">
                                        <Zap className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm">No points achieved yet.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Picture (unchanged) */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Picture</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center space-y-4">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-32 h-32 mx-auto rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                        <User className="h-16 w-16 text-white" />
                                    </div>
                                )}

                                <Button variant="outline" size="sm" onClick={() => document.getElementById("profileImageInput")?.click()}>
                                    <Camera className="mr-2 h-4 w-4" />
                                    Change Photo
                                </Button>
                                <input
                                    id="profileImageInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </CardContent>
                        </Card>


                        {/* Recent Points Achieved (UPDATED) */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                                
                            </CardHeader>
                            <CardContent className="space-y-10">
                                <div className="flex justify-between">
                                    <span className="text-sm">Interviews Completed</span>
                                    <span className="font-medium text-primary">{quickStats.interviewsCompleted}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Learning Days</span>
                                    <span className="font-medium text-primary">{quickStats.learningStreak} days</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm">Skills Improved (Courses Completed)</span>
                                    <span className="font-medium text-primary">{quickStats.skillsImproved}</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-gradient-400">
              <CardContent className="pt-6">
                <Button onClick={handleLogout} variant="gradient" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">Securely sign out of your account.</p>
              </CardContent>
            </Card>


                    </div>
                </div>
            </motion.div>
        </div>
    )
}