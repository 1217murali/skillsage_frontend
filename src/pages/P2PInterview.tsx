import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Video, VideoOff, MicOff, Play, Pause, AlertCircle, CheckCircle } from 'lucide-react';

// API Base URL
const API_BASE = 'http://localhost:8000';

interface MatchStatus {
    status: 'idle' | 'waiting' | 'matched';
    match_id?: number;
    partner?: string;
    role?: 'interviewer' | 'candidate';
    incoming_signal?: any;
    last_feedback?: any;
}

const P2PInterview: React.FC = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<MatchStatus['status']>('idle');
    const [matchId, setMatchId] = useState<number | null>(null);
    const [partner, setPartner] = useState<string>('');
    const [role, setRole] = useState<'interviewer' | 'candidate' | null>(null);
    const [feedback, setFeedback] = useState<any>(null);

    // WebRTC State
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);

    // Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    // Polling Ref
    const pollingIntervalRef = useRef<number | null>(null);
    const hasProcessedSignal = useRef<boolean>(false);

    // AI Question (Mock for now, can be fetched)
    const [question, setQuestion] = useState("Explain the difference between TCP and UDP.");

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, []);

    const cleanup = () => {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        if (peerConnectionRef.current) peerConnectionRef.current.close();
    };

    // --- 1. Lobby Logic ---

    const findPartner = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        setStatus('waiting');
        try {
            const res = await fetch(`${API_BASE}/p2p/find_partner/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            if (data.status === 'matched') {
                handleMatchFound(data);
            } else {
                startPolling();
            }
        } catch (err) {
            console.error(err);
            setStatus('idle');
        }
    };

    const startPolling = () => {
        if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

        pollingIntervalRef.current = window.setInterval(async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const res = await fetch(`${API_BASE}/p2p/poll_status/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();

                if (data.status === 'matched') {
                    if (status !== 'matched') handleMatchFound(data);

                    // Handle Signaling and Feedback updates
                    if (data.incoming_signal && !hasProcessedSignal.current) {
                        handleIncomingSignal(data.incoming_signal);
                    }
                    if (data.last_feedback) {
                        setFeedback(data.last_feedback);
                    }
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        }, 2000); // Poll every 2s
    };

    const handleMatchFound = async (data: any) => {
        setStatus('matched');
        setMatchId(data.match_id);
        setPartner(data.partner);
        setRole(data.role);

        // Initialize WebRTC
        await initializeWebRTC(data.role === 'interviewer', data.match_id);
    };

    // --- 2. WebRTC Logic (Simple Polling-based) ---

    const initializeWebRTC = async (isInitiator: boolean, currentMatchId: number) => {
        console.log("Initializing WebRTC. Initiator:", isInitiator);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;

            const pc = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            });
            peerConnectionRef.current = pc;

            // Add tracks
            stream.getTracks().forEach(track => pc.addTrack(track, stream));

            // Handle Remote Stream
            pc.ontrack = (event) => {
                console.log("Remote track received");
                setRemoteStream(event.streams[0]);
                if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
            };

            // Handle ICE Candidates
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendSignal(currentMatchId, { type: 'candidate', candidate: event.candidate });
                }
            };

            if (isInitiator) {
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                sendSignal(currentMatchId, { type: 'offer', sdp: offer });
            }

        } catch (err) {
            console.error("WebRTC Init Error:", err);
        }
    };

    const sendSignal = async (mId: number, signal: any) => {
        const token = localStorage.getItem('access_token');
        await fetch(`${API_BASE}/p2p/signal/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ match_id: mId, signal: signal })
        });
    };

    const handleIncomingSignal = async (signal: any) => {
        const pc = peerConnectionRef.current;
        if (!pc) return;

        console.log("Handling incoming signal:", signal.type);

        try {
            if (signal.type === 'offer') {
                await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                sendSignal(matchId!, { type: 'answer', sdp: answer });
                hasProcessedSignal.current = true; // Mark offer as handled
            }
            else if (signal.type === 'answer') {
                await pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
                hasProcessedSignal.current = true; // Mark answer as handled
            }
            else if (signal.type === 'candidate') {
                await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
            }
        } catch (err) {
            console.error("Signal Handling Error:", err);
        }
    };

    // --- 3. Interview Logic ---

    const startRecording = () => {
        if (!localStream) return;

        setIsRecording(true);
        audioChunksRef.current = [];
        const recorder = new MediaRecorder(localStream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
        recorder.onstop = async () => {
            const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            // In a real app, convert to WAV or send blob.
            // For now, we simulate text submission or send text if STT not ready.
            submitAnswer("Candidate answer (audio placeholder)");
        };
        recorder.start();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const submitAnswer = async (text: string) => {
        const token = localStorage.getItem('access_token');
        await fetch(`${API_BASE}/p2p/ai_feedback/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                match_id: matchId,
                answer_text: text,
                question: question
            })
        });
    };

    // --- Render ---

    if (status === 'idle') {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
                <div className="text-center space-y-6 max-w-lg p-8 bg-gray-900 rounded-xl border border-gray-800 shadow-2xl">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        P2P Mock Interview
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Find a partner, practice with AI supervision, and master your skills together.
                    </p>
                    <button
                        onClick={findPartner}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
                    >
                        Find a Partner
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-gray-300 block w-full mt-4">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'waiting') {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-950 text-white">
                <div className="text-center space-y-4 animate-pulse">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <h2 className="text-2xl font-semibold">Searching for a partner...</h2>
                    <p className="text-gray-400">Please wait while we connect you.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-gray-950 text-white flex flex-col p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 px-4">
                <div>
                    <h2 className="text-xl font-bold">P2P Interview</h2>
                    <p className="text-sm text-gray-400">Partner: {partner}</p>
                </div>
                <div className="px-4 py-2 bg-gray-800 rounded-full text-sm font-mono border border-gray-700">
                    Role: <span className={role === 'interviewer' ? "text-blue-400" : "text-green-400"}>
                        {role?.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Main Content: Split Screen */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Local User */}
                <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                    <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm">
                        You ({role})
                    </div>
                </div>

                {/* Remote User */}
                <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center">
                    {remoteStream ? (
                        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-gray-500 flex flex-col items-center">
                            <div className="animate-spin w-8 h-8 border-2 border-gray-600 border-t-transparent rounded-full mb-2"></div>
                            Connecting to partner...
                        </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm">
                        {partner}
                    </div>
                </div>
            </div>

            {/* Game / AI Control Panel */}
            <div className="h-1/3 bg-gray-900 rounded-xl border border-gray-800 p-6 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4">
                    {feedback ? (
                        <div className="space-y-2 animate-fadeIn">
                            <h3 className="text-lg font-bold text-yellow-400 flex items-center">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                AI Feedback
                            </h3>
                            <div className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-300 italic">"{feedback.feedback}"</p>
                                <div className="mt-2 flex gap-4 text-sm font-mono text-gray-400">
                                    <span>Rating: {feedback.rating}/5</span>
                                    <span>Tip: {feedback.tip}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center pt-8">
                            <h3 className="text-2xl font-bold mb-2">Current Question</h3>
                            <p className="text-xl text-blue-300 font-medium">"{question}"</p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-4 border-t border-gray-800 pt-4">
                    {role === 'candidate' ? (
                        isRecording ? (
                            <button
                                onClick={stopRecording}
                                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 rounded-full font-bold transition-all shadow-lg animate-pulse"
                            >
                                <Pause className="w-5 h-5" /> Stop & Submit Answer
                            </button>
                        ) : (
                            <button
                                onClick={startRecording}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-full font-bold transition-all shadow-lg"
                            >
                                <Mic className="w-5 h-5" /> Start Answering
                            </button>
                        )
                    ) : (
                        <div className="text-gray-400 flex items-center gap-2">
                            <MicOff className="w-5 h-5" />
                            Wait for candidate's answer...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default P2PInterview;
