import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Shield, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

interface AvatarDisplayProps {
    level: number;
    xp: number;
    nextLevelXp: number;
    avatarUrl?: string;
    inventory: any[];
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ level, xp, nextLevelXp, avatarUrl, inventory }) => {
    const xpPercentage = Math.min((xp / nextLevelXp) * 100, 100);

    return (
        <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-500/30 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield className="w-32 h-32" />
            </div>

            <CardContent className="p-6 flex items-center space-x-6 relative z-10">
                {/* Avatar Circle */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                >
                    <div className="w-24 h-24 rounded-full border-4 border-indigo-400 overflow-hidden bg-slate-800 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-12 h-12 text-indigo-300" />
                            </div>
                        )}
                    </div>
                    {/* Level Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-slate-900 font-bold w-10 h-10 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-lg">
                        {level}
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="flex-1 space-y-4">
                    <div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white">
                            Novice Explorer
                        </h3>
                        <p className="text-indigo-300 text-sm">Level {level} • {xp} XP / {nextLevelXp} XP</p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-indigo-200">
                            <span>Progress to Level {level + 1}</span>
                            <span>{Math.round(xpPercentage)}%</span>
                        </div>
                        <Progress value={xpPercentage} className="h-3 bg-slate-700/50" indicatorColor="bg-gradient-to-r from-indigo-500 to-purple-500" />
                    </div>
                </div>

                {/* Inventory / Badges Preview */}
                <div className="hidden md:flex space-x-2">
                    {inventory.length > 0 ? (
                        inventory.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-lg bg-slate-800/50 border border-indigo-500/30 flex items-center justify-center" title={item.name}>
                                <span className="text-lg">{item.icon || '🏆'}</span>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center text-indigo-400/50 text-xs">
                            <Award className="w-6 h-6 mb-1" />
                            <span>No Badges</span>
                        </div>
                    )}
                    {/* Placeholder for locked slot */}
                    <div className="w-10 h-10 rounded-lg bg-slate-800/30 border border-dashed border-indigo-500/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-indigo-500/20" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
