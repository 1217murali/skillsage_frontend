import React, { useState } from "react";
import { CheckCircle, ArrowLeft, X } from "lucide-react"; // Added X for incorrect answers

// --- MOCK UI Components (Placeholder definitions since full UI library isn't available) ---
const Button: React.FC<any> = ({ onClick, children, className, variant = "default", disabled = false }) => {
    let baseStyle = "px-4 py-2 font-semibold rounded-lg transition-colors shadow-md flex items-center justify-center";
    if (variant === "default") baseStyle += " bg-blue-600 hover:bg-blue-700 text-white";
    if (variant === "outline") baseStyle += " bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700";
    if (disabled) baseStyle = baseStyle.replace(/hover:bg-\w+-\d+/, 'bg-gray-400 cursor-not-allowed');
    
    return (
        <button onClick={onClick} className={`${baseStyle} ${className || ''}`} disabled={disabled}>
            {children}
        </button>
    );
};
// --- END MOCK UI Components ---

/* -------------------- INTERFACES -------------------- */
interface QuizQuestion { id: string; question: string; options: string[]; answer: number; }

interface ModuleQuizProps { 
    questions: QuizQuestion[]; 
    onComplete: (success: boolean) => void; 
    onBackToContent: () => void; 
    isPassed: boolean; 
    showAnswers: boolean;
}

/* -------------------- REUSABLE ModuleQuiz Component (Real Scoring) -------------------- */
export const ModuleQuiz: React.FC<ModuleQuizProps> = ({ questions, onComplete, onBackToContent, isPassed, showAnswers }) => {
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [localScore, setLocalScore] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Determines if the submit button should be disabled (must select all answers)
    const isSubmitDisabled = Object.keys(selectedAnswers).length !== questions.length;

    const handleSelect = (qId: string, oIndex: number) => {
        if (isSubmitted || showAnswers) return;
        setSelectedAnswers(prev => ({ ...prev, [qId]: oIndex }));
    };

    const handleSubmit = () => {
        const totalQuestions = questions.length;
        let correctCount = 0;

        // --- REAL SCORING LOGIC ---
        questions.forEach(q => {
            // Check if the selected answer index matches the correct answer index
            if (selectedAnswers[q.id] === q.answer) {
                correctCount++;
            }
        });

        // Calculate score and determine pass/fail (70% threshold)
        const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
        const passed = scorePercentage >= 70; 
        // --- END REAL SCORING LOGIC ---

        setLocalScore(scorePercentage);
        setIsSubmitted(true);
        // Delay completion slightly for UI feedback
        setTimeout(() => { onComplete(passed); }, 300);
    };

    // --- Quiz Review / Results View ---
    if (showAnswers || isSubmitted) {
        // Determine primary color based on result (passed uses green from props, or based on localScore)
        const passedStatus = isPassed || (localScore !== null && localScore >= 70);
        const reviewColor = passedStatus ? 'green' : 'red';
        const reviewBg = passedStatus ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10';

        return (
            <div className={`p-6 border rounded-lg space-y-4 ${reviewBg}`}>
                <h3 className={`text-2xl font-bold text-${reviewColor}-600 dark:text-${reviewColor}-400`}>
                    Quiz Review
                    {localScore !== null && ` (${passedStatus ? 'Passed' : 'Failed'}: ${localScore}%)`}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Review the answers below. Correct answers are in **green**. Your incorrect selections are in **red**.
                </p>
                {questions.map((q: QuizQuestion, qIndex: number) => (
                    <div key={q.id} className="p-3 border rounded-md bg-white dark:bg-gray-800">
                        <p className="font-semibold mb-2">Q{qIndex + 1}: {q.question}</p>
                        <ul className="space-y-1">
                            {q.options.map((option: string, oIndex: number) => {
                                const isCorrect = oIndex === q.answer;
                                const isUserSelected = selectedAnswers[q.id] === oIndex;
                                const isUserIncorrect = isUserSelected && !isCorrect;

                                let itemClassName = "text-card-foreground flex items-center p-1 rounded";
                                
                                if (isCorrect) {
                                    itemClassName = "text-green-600 font-medium flex items-center p-1 rounded dark:text-green-400 bg-green-100 dark:bg-green-900/20";
                                } else if (isUserIncorrect) {
                                    itemClassName = "text-red-600 font-medium flex items-center p-1 rounded dark:text-red-400 bg-red-100 dark:bg-red-900/20 line-through";
                                }

                                return (
                                    <li
                                        key={oIndex}
                                        className={itemClassName}
                                    >
                                        {isCorrect && <CheckCircle className="h-3 w-3 mr-2 flex-shrink-0" />}
                                        {isUserIncorrect && <X className="h-3 w-3 mr-2 flex-shrink-0" />}
                                        {option}
                                        {isUserSelected && <span className="ml-3 text-xs opacity-80 italic"> (Your Choice)</span>}
                                        {isCorrect && !isUserSelected && <span className="ml-3 text-xs opacity-80 italic"> (Correct)</span>}
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

    // --- Active Quiz View ---
    return (
        <div className="p-6 border rounded-lg space-y-4">
            <h3 className="text-2xl font-bold">{questions.length > 0 ? questions[0].id.substring(0, 5).toUpperCase() : 'Module'} Quiz</h3>
            <p className="text-muted-foreground">Select one option for each of the {questions.length} questions. You must score **70%** to pass.</p>
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
                                        className={`p-2 rounded cursor-pointer transition-colors border
                                            ${isSelected 
                                                ? 'bg-blue-600/20 font-medium border-blue-600' 
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                                            }`}
                                    >
                                        {option}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            <Button onClick={handleSubmit} className="w-full" disabled={isSubmitDisabled}>
                Submit Answers ({Object.keys(selectedAnswers).length}/{questions.length} Selected)
            </Button>
            <Button onClick={onBackToContent} variant="outline" className="w-full">
                Cancel
            </Button>
        </div>
    );
};