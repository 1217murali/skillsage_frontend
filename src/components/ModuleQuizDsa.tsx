// src/components/ModuleQuizDsa.tsx

import React, { useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react"; 

// --- Interfaces (Minimal definitions for component clarity) ---
interface QuizQuestion { id: string; question: string; options: string[]; answer: number; }
interface ModuleQuizProps { 
    questions: QuizQuestion[]; 
    onComplete: (success: boolean) => void; 
    onBackToContent: () => void; 
    isPassed: boolean; 
    showAnswers: boolean;
}

// --- MOCK UI Components (Defined here to avoid external import errors) ---
const Button: React.FC<any> = ({ onClick, children, className, variant = "default", disabled = false }) => {
    let baseStyle = "px-4 py-2 font-semibold rounded-lg transition-colors shadow-md flex items-center justify-center";
    if (variant === "default") baseStyle += " bg-blue-600 hover:bg-blue-700 text-white";
    if (variant === "outline") baseStyle += " bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700";
    
    return (
        <button onClick={onClick} className={`${baseStyle} ${className || ''}`} disabled={disabled}>
            {children}
        </button>
    );
};
// --- END MOCK UI Components ---

/* -------------------- REUSABLE ModuleQuiz Component -------------------- */
export const ModuleQuizDsa: React.FC<ModuleQuizProps> = ({ questions, onComplete, onBackToContent, isPassed, showAnswers }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [localScore, setLocalScore] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSelect = (qId: string, oIndex: number) => {
        if (isSubmitted || showAnswers) return;
        setSelectedAnswers(prev => ({ ...prev, [qId]: oIndex }));
    };

    const handleSubmit = () => {
        // Mock score calculation (75% chance to pass)
        const passed = Math.random() > 0.25;
        const mockScore = passed ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 50;

        setLocalScore(mockScore);
        setIsSubmitted(true);
        setTimeout(() => { onComplete(passed); }, 300);
    };

    if (showAnswers || isSubmitted) {
        return (
            <div className="p-6 border rounded-lg space-y-4 bg-green-50 dark:bg-green-900/10">
                <h3 className="text-2xl font-bold text-green-600">
                    Quiz Review
                    {isPassed
                        ? " (Passed)"
                        : (localScore !== null ? ` (Failed: ${localScore}%)` : " (Review)")}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Review the correct answers in **green** below.
                </p>
                {questions.map((q: QuizQuestion, qIndex: number) => (
                    <div key={q.id} className="p-3 border rounded-md">
                        <p className="font-semibold mb-2">Q{qIndex + 1}: {q.question}</p>
                        <ul className="space-y-1">
                            {q.options.map((option: string, oIndex: number) => {
                                const isCorrect = oIndex === q.answer;
                                return (
                                    <li
                                        key={oIndex}
                                        className={isCorrect ? "text-green-600 font-medium flex items-center" : "text-card-foreground"}
                                    >
                                        {isCorrect && <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />}
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
                <Button onClick={onBackToContent} variant="outline" className="mt-4">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Content
                </Button>
            </div>
        );
    }

    return (
        <div className="p-6 border rounded-lg space-y-4">
            <h3 className="text-2xl font-bold">{questions.length > 0 ? questions[0].id.substring(0, 5).toUpperCase() : 'Module'} Quiz</h3>
            <p className="text-muted-foreground">Select one option for each of the {questions.length} questions.</p>
            <div className="space-y-6">
                {questions.map((q: QuizQuestion, qIndex: number) => (
                    <div key={q.id} className="p-3 border rounded-lg">
                        <p className="font-semibold mb-2">Q{qIndex + 1}: {q.question}</p>
                        <ul className="space-y-2">
                            {q.options.map((option: string, oIndex: number) => {
                                const isSelected = selectedAnswers[q.id] === oIndex;
                                return (
                                    <li
                                        key={oIndex}
                                        onClick={() => handleSelect(q.id, oIndex)}
                                        className={`p-2 rounded cursor-pointer transition-colors ${isSelected ? 'bg-blue-600/20 font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <Button onClick={handleSubmit} className="w-full">
                Submit Answers
            </Button>
            <Button onClick={onBackToContent} variant="outline" className="w-full">
                Cancel
            </Button>
        </div>
    );
};