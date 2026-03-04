import React, { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Button } from "@/components/ui/button";
import { Loader2, Zap, Maximize2, X } from "lucide-react";

interface ContentVisualizerProps {
    content: string; // The text content to visualize
    title?: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000';
const VISUALIZE_ENDPOINT = `${API_BASE_URL}/visualize_content/`;

const getAccessToken = () => {
    return localStorage.getItem('access_token');
}

export const ContentVisualizer: React.FC<ContentVisualizerProps> = ({ content, title }) => {
    const [diagramCode, setDiagramCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mermaidRef = useRef<HTMLDivElement>(null);
    const modalMermaidRef = useRef<HTMLDivElement>(null);

    // Auto-clear logic when the topic (title) changes
    useEffect(() => {
        setDiagramCode(null);
        setError(null);
        setLoading(false);
        setIsModalOpen(false);
    }, [title]);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            securityLevel: 'loose',
            fontFamily: 'Inter, sans-serif'
        });
    }, []);

    const renderMermaid = (code: string, container: HTMLDivElement | null) => {
        if (!container) return;

        container.innerHTML = ''; // Clear previous
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        try {
            mermaid.render(id, code).then(renderResult => {
                if (container) {
                    container.innerHTML = renderResult.svg;
                }
            });
        } catch (e) {
            console.error("Mermaid Render Error:", e);
            setError("Failed to render diagram. The AI output might be invalid.");
        }
    };

    // Render main diagram
    useEffect(() => {
        if (diagramCode) {
            renderMermaid(diagramCode, mermaidRef.current);
        }
    }, [diagramCode]);

    // Render modal diagram when opened
    useEffect(() => {
        if (isModalOpen && diagramCode) {
            // Small delay to ensure modal DOM is ready
            setTimeout(() => {
                renderMermaid(diagramCode, modalMermaidRef.current);
            }, 100);
        }
    }, [isModalOpen, diagramCode]);

    const handleVisualize = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = getAccessToken();
            if (!token) {
                setError("You must be logged in to use AI features.");
                setLoading(false);
                return;
            }

            const response = await fetch(VISUALIZE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (data.chart) {
                setDiagramCode(data.chart);
            } else if (data.error) {
                setError(data.error);
            }

        } catch (err: any) {
            console.error("Visualization API Error:", err);
            setError(err.message || "Failed to generate visualization.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center text-gray-900 dark:text-gray-100">
                    <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                    AI Concept Visualizer
                </h3>
                {!diagramCode && !loading && (
                    <Button onClick={handleVisualize} variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        Visualize This Topic
                    </Button>
                )}
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-2" />
                    <p className="text-sm text-gray-500"> analyzing content & generating diagram...</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {diagramCode && (
                <div className="relative group">
                    <div
                        className="w-full overflow-x-auto bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg flex justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                        onClick={() => setIsModalOpen(true)}
                        title="Click to expand"
                    >
                        <div ref={mermaidRef} className="mermaid-diagram" />

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" className="bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black">
                                <Maximize2 className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end mt-2">
                        <div className="text-xs text-gray-400 mr-auto flex items-center">
                            <Maximize2 className="h-3 w-3 mr-1" /> Click diagram to expand
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setDiagramCode(null)} className="text-xs text-gray-500">
                            Clear Visualization
                        </Button>
                    </div>
                </div>
            )}

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800">
                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                                {title || "Concept Visualization"}
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                <X className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-auto p-8 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                            <div ref={modalMermaidRef} className="w-full flex justify-center scale-110" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
