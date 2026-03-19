import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Search, AlertCircle, School, Building, Trophy, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Prediction {
    rank: number;
    college_name: string;
    branch_code: string;
    category: string;
    actual_cutoff_2025: number;
    actual_cutoff_2024: number;
    estimated_cutoff_2026: number;
    gender: string;
    is_eligible?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function EAPCETPredictor() {
    const [rank, setRank] = useState<number | ''>('');
    const [category, setCategory] = useState<string>('OC'); // Default OC
    const [branch, setBranch] = useState<string>('');
    const [gender, setGender] = useState<string>('M'); // Default Boys/General
    const [collegeName, setCollegeName] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [metadata, setMetadata] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);
    
    // For custom dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Initial load: can we get metadata? Let's just rely on static lists for now
    // or we can fetch a dummy prediction to get metadata, but static is easier:
    const categories = ['OC', 'BC_A', 'BC_B', 'BC_C', 'BC_D', 'BC_E', 'SC', 'ST'];
    const popularBranches = ['CSE', 'ECE', 'EEE', 'IT', 'MEC', 'CIV', 'CSM', 'CSD', 'INF'];
    const genders = [{ value: 'M', label: 'Boys / General' }, { value: 'F', label: 'Girls Only' }];

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/predict_eapcet/`);
                const data = await response.json();
                if (data.metadata) {
                    setMetadata(data.metadata);
                }
            } catch (err) {
                console.error("Failed to load predictor metadata", err);
            }
        };
        fetchMetadata();
    }, []);

    const handlePredict = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rank) {
            setError('Please enter your expected rank.');
            return;
        }

        setLoading(true);
        setError(null);
        setSearched(true);
        setPredictions([]);

        try {
            const token = localStorage.getItem('access_token');
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_BASE_URL}/predict_eapcet/`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    rank: Number(rank),
                    category,
                    branch,
                    gender,
                    college_name: collegeName
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to fetch predictions.');
            } else {
                setPredictions(data.predictions);
                if (data.metadata) {
                    setMetadata(data.metadata);
                }
            }
        } catch (err: any) {
            console.error('Error fetching predictions:', err);
            setError('Could not connect to the prediction service. Make sure the backend is running and the model is trained.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Target className="h-8 w-8 text-primary" />
                        AP EAPCET College Predictor 2026
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Discover your college admission chances based on historical counseling data from 2023-2025.
                        Enter your expected rank and profile to see eligible colleges and branches.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Filter className="h-5 w-5 text-primary" />
                            Your Profile
                        </h2>
                        
                        <form onSubmit={handlePredict} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Expected Rank*
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={rank}
                                    onChange={(e) => setRank(e.target.value ? Number(e.target.value) : '')}
                                    placeholder="e.g. 15000"
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Category*
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                >
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    {metadata?.categories && metadata.categories.filter((c: string) => !categories.includes(c)).map((c: string) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Gender Pool*
                                </label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                >
                                    {genders.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Preferred Branch (Optional)
                                </label>
                                <select
                                    value={branch}
                                    onChange={(e) => setBranch(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                >
                                    <option value="">-- All Branches --</option>
                                    {popularBranches.map(b => <option key={b} value={b}>{b}</option>)}
                                    {metadata?.branches && metadata.branches.filter((b: string) => !popularBranches.includes(b)).map((b: string) => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">
                                    Specific College Name / Code (Optional)
                                </label>
                                <div className="relative">
                                    {/* The Select Button */}
                                    <div
                                        onClick={() => {
                                            if (!isDropdownOpen) setSearchQuery('');
                                            setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                        className={`w-full bg-background border ${isDropdownOpen ? 'border-primary ring-2 ring-primary/20' : 'border-border'} rounded-lg px-4 py-2 text-left cursor-pointer flex justify-between items-center transition-all min-h-[42px]`}
                                    >
                                        <span className={`truncate ${collegeName ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {collegeName ? collegeName : "Select a college (optional)"}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {collegeName && !isDropdownOpen && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCollegeName('');
                                                        setSearchQuery('');
                                                    }}
                                                    className="text-muted-foreground hover:text-foreground p-1 shrink-0 ml-1"
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                    
                                    {/* The Dropdown Menu */}
                                    {isDropdownOpen && metadata?.colleges && (
                                        <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden flex flex-col">
                                            {/* Search Bar inside dropdown */}
                                            <div className="p-2 border-b border-border bg-card/95 backdrop-blur z-10">
                                                <div className="relative">
                                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search college name or code..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full bg-background border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Scrollable List */}
                                            <div className="max-h-60 overflow-y-auto p-1">
                                                <div
                                                    className="px-3 py-2 hover:bg-primary/10 cursor-pointer text-sm rounded-md text-foreground font-medium mb-1"
                                                    onClick={() => {
                                                        setCollegeName('');
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    -- All Colleges --
                                                </div>
                                                {metadata.colleges
                                                    .filter((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()))
                                                    .slice(0, 50)
                                                    .map((c: string) => (
                                                        <div
                                                            key={c}
                                                            className="px-3 py-2 hover:bg-primary/10 cursor-pointer text-sm rounded-md break-words"
                                                            onClick={() => {
                                                                setCollegeName(c.split(' - ')[0]); // Store code or partial name
                                                                setIsDropdownOpen(false);
                                                            }}
                                                        >
                                                            {c}
                                                        </div>
                                                    ))}
                                                {metadata.colleges.filter((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                                    <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                                                        No colleges found matching "{searchQuery}".
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Close Dropdown Overlay */}
                            {isDropdownOpen && (
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setIsDropdownOpen(false)}
                                />
                            )}

                            <Button type="submit" variant="gradient" className="w-full mt-2" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                                        Analyzing Data...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <Search className="w-4 h-4" />
                                        Predict Colleges
                                    </span>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-2 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-medium">Prediction Error</h3>
                                <p className="text-sm opacity-90">{error}</p>
                            </div>
                        </div>
                    )}

                    {!searched && !error && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-card border border-border border-dashed rounded-xl text-muted-foreground">
                            <School className="w-16 h-16 opacity-20 mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">Ready to Predict</h3>
                            <p className="max-w-md">
                                Enter your expected rank, select your reservation category, and optionally pick a branch to see your most likely college admissions for 2026.
                            </p>
                        </div>
                    )}

                    {searched && !loading && !error && predictions.length === 0 && (
                        <div className="p-8 bg-card border border-border rounded-xl text-center">
                            <h3 className="text-lg font-medium mb-2">No direct matches found</h3>
                            <p className="text-muted-foreground">
                                Based on the 2026 historical trends, your rank might be outside the typical cut-offs for the selected criteria. Try removing the branch filter or adjusting your rank to see other possibilities.
                            </p>
                        </div>
                    )}

                    {searched && !loading && !error && predictions.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                Top Recommended Colleges
                                <span className="ml-2 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                    {predictions.length} Results
                                </span>
                            </h2>
                            
                            <div className="grid gap-4">
                                {predictions.map((p, idx) => {
                                    const rankDiff = p.estimated_cutoff_2026 - Number(rank);
                                    let chanceLabel = "High Chance";
                                    let chanceColor = "text-green-400 bg-green-400/10 border-green-400/20";
                                    
                                    if (p.is_eligible === false || rankDiff < 0) {
                                        chanceLabel = "Not Eligible";
                                        chanceColor = "text-red-400 bg-red-400/10 border-red-400/20";
                                    } else if (rankDiff < 1000) {
                                        chanceLabel = "Borderline / Reach";
                                        chanceColor = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
                                    } else if (rankDiff > 10000) {
                                        chanceLabel = "Very Safe";
                                        chanceColor = "text-blue-400 bg-blue-400/10 border-blue-400/20";
                                    }

                                    return (
                                        <motion.div
                                            key={`${p.college_name}-${p.branch_code}-${idx}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors group"
                                        >
                                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Building className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                                        <h3 className="font-semibold text-lg text-foreground leading-tight">
                                                            {p.college_name}
                                                        </h3>
                                                    </div>
                                                    
                                                    <div className="flex flex-wrap gap-2 text-sm mt-3">
                                                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-medium">
                                                            Branch: <span className="text-foreground">{p.branch_code}</span>
                                                        </span>
                                                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground font-medium">
                                                            Category: <span className="text-foreground">{p.category}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-2 shrink-0 bg-background md:bg-transparent p-3 md:p-0 rounded-lg border border-border md:border-none">
                                                    <div className="text-right">
                                                        <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Est. 2026 Cutoff</div>
                                                        <div className="text-2xl font-bold text-primary">
                                                            {Math.round(p.estimated_cutoff_2026).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${chanceColor}`}>
                                                        {chanceLabel}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 pt-4 border-t border-border flex justify-end text-xs text-muted-foreground">
                                                <span>Rank Difference: {rankDiff >= 0 ? '+' : ''}{Math.round(rankDiff).toLocaleString()}</span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
