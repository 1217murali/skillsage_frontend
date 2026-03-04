import React, { useState, useCallback, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the Send icon from lucide-react (used in the Send button)
import { Send } from 'lucide-react';

// Define the structure for a message in TypeScript
interface Message {
  sender: 'user' | 'ai';
  text: string;
  loading?: boolean;
}
const MOON_IMAGE_PATH = '/moon.png';


// Configuration for the Gemini API call
// Configuration for the Gemini API call
const MODEL_NAME = 'gemini-flash-latest';
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const apiKey = "AIzaSyALCnpXL80VY3hi6ASsrjY24SAAk4wvtM0"; // Canvas environment automatically provides API key if this is empty

// System instruction defines the AI's persona and rules
const healthGymSystemInstruction = {
  parts: [{
    text: `
You are a professional and highly knowledgeable career assistant for SkillSageAI. 
Your purpose is to help users improve their interview skills, analyze resumes effectively, and design personalized learning paths.

CRITICAL INSTRUCTION: Keep your responses extremely concise. 
- Limit your answer to ONE short paragraph (max 2-3 sentences).
- Do not use bullet points or lists.
- Do not use bold text or markdown formatting of any kind.
- Get straight to the point.

NAVIGATION:
If the user explicitly asks to go to a specific page (like "go to resume", "open dashboard", "take me to interview"), 
respond with a special token at the START of your message:
[[NAVIGATE: /target-route]]
followed by a very short confirmation.

Valid Routes:
- Resume Page: /resume
- Dashboard: /dashboard
- Interview Setup: /interview
- Learning/Courses: /learning
- Profile: /profile

Example:
User: "Take me to the resume page"
AI: "[[NAVIGATE: /resume]] Heading to the Resume section now. 🚀"

If a user asks about something unrelated to career growth, respond politely in one short sentence.
`
  }]
};

const ChatIcon: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message whenever messages update
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  // Utility function for exponential backoff retry logic
  const fetchWithRetry = useCallback(async (url: string, payload: any, maxRetries = 5): Promise<any> => {
    const headers = { 'Content-Type': 'application/json' };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          return response.json();
        }

        // If it's a transient error (e.g., 429 Too Many Requests, 5xx Server Error)
        if (response.status === 429 || response.status >= 500) {
          if (attempt === maxRetries - 1) {
            throw new Error(`API failed after ${maxRetries} attempts with status: ${response.status}`);
          }
          const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000; // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        // For other client errors (e.g., 400 Bad Request), throw immediately
        throw new Error(`API error: ${response.status} - ${await response.text()}`);

      } catch (error) {
        if (attempt === maxRetries - 1) {
          throw error;
        }
        const delay = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isGenerating) return;

    setIsGenerating(true);
    const userMessage = trimmedMessage;
    setInputMessage('');

    // 1. Append user message
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userMessage },
    ]);

    // 2. Append loading indicator (will be the last element)
    setMessages(prev => [
      ...prev,
      { sender: 'ai', text: 'Stellar processing... 🛰️', loading: true },
    ]);

    const apiUrl = `${API_URL_BASE}?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: userMessage }] }],
      systemInstruction: healthGymSystemInstruction,
    };

    try {
      const data = await fetchWithRetry(apiUrl, payload);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages.pop(); // Remove loading indicator

        let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Comms blackout! We lost the signal. Let's try again. 📡";

        // Navigation Logic
        const navMatch = aiResponse.match(/\[\[NAVIGATE:\s*(\/[a-zA-Z0-9\-/]+)\]\]/);
        if (navMatch) {
          const route = navMatch[1];
          aiResponse = aiResponse.replace(navMatch[0], '').trim(); // Remove the tag from display text
          console.log(`🚀 AI requested navigation to: ${route}`);

          // Execute navigation after a brief delay for user to read
          setTimeout(() => {
            navigate(route);
            setIsChatOpen(false); // Optional: close chat on nav
          }, 1500);
        }

        updatedMessages.push({ sender: 'ai', text: `⭐ ${aiResponse}` });

        return updatedMessages;
      });

    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages.pop(); // Remove loading indicator
        updatedMessages.push({
          sender: 'ai',
          text: "Houston, we have a problem. Connection failed. Please check your orbit and try again. ☄️",
        });
        return updatedMessages;
      });
    }
    finally {
      setIsGenerating(false);
    }
  }, [inputMessage, isGenerating, fetchWithRetry]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-['Inter']">
      {/* Floating Moon Chat Button (Black/White only) */}
      <div
        className="
      w-16 h-16 
      rounded-full flex items-center justify-center 
      cursor-pointer 
      hover:scale-110 active:scale-95 
      transition-all duration-300 ease-in-out
      shadow-[0_0_25px_rgba(255,255,255,0.8)] 
      hover:shadow-[0_0_35px_rgba(255,255,255,1)] 
      animate-spin-slow 
    "
        onClick={toggleChat}
        title="Chat with SkillSageAI Assistant - To The Moon!"
        style={{
          backgroundImage: `url(${MOON_IMAGE_PATH})`,
          backgroundSize: '170%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'black',
        }}
      >
        {/* Content is intentionally empty, the background image is the icon */}
      </div>

      {/* Chat Window - PURE BLACK THEME */}
      {isChatOpen && (
        <div
          className="
        fixed bottom-24 right-4 
        /* Pure Black Background */
        bg-black 
        rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.4)]
        flex flex-col overflow-hidden 
        w-[90vw] max-w-sm h-[70vh] max-h-[500px]
        md:w-[360px] md:h-[450px]
        /* Very subtle white border to define edges */
        border border-white/10 backdrop-blur-xl 
        text-white
        animate-[fadeIn_0.5s_ease-in-out]
      "
          // Subtle Starfield Background
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 100 100\'%3E%3Cdefs%3E%3CradialGradient id=\'g\' cx=\'50%25\' cy=\'50%25\' r=\'70%25\'%3E%3Cstop offset=\'0%25\' stop-color=\'white\' stop-opacity=\'0.05\'%3E%3C/stop%3E%3Cstop offset=\'100%25\' stop-color=\'transparent\'%3E%3C/stop%3E%3C/radialGradient%3E%3Ccircle cx=\'20\' cy=\'30\' r=\'1.5\' fill=\'url(%23g)\'%3E%3C/circle%3E%3Ccircle cx=\'80\' cy=\'70\' r=\'2\' fill=\'url(%23g)\'%3E%3C/circle%3Ccircle cx=\'50\' cy=\'5\' r=\'1\' fill=\'url(%23g)\'%3E%3C/circle%3E%3Ccircle cx=\'10\' cy=\'80\' r=\'2.5\' fill=\'url(%23g)\'%3E%3C/circle%3E%3Ccircle cx=\'90\' cy=\'15\' r=\'0.5\' fill=\'url(%23g)\'%3E%3C/circle%3E%3C/svg%3E")' }}
        >
          {/* Chat Header - Pure Black Console Bar */}
          <div className="
        flex items-center p-4 
        bg-black /* Pure Black */
        text-white shadow-lg rounded-t-2xl border-b border-white/10
      ">
            <div className="text-3xl mr-3">🛰️</div>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-white">SkillSageAI Assistant</h3>
            </div>
            <button
              className="
            text-2xl font-light leading-none opacity-80 hover:opacity-100 
            p-1 rounded-full hover:bg-white/10 transition-colors
          "
              onClick={toggleChat}
              aria-label="Close Chat"
            >
              ×
            </button>
          </div>

          {/* Chat Body - Pure Black Scroll Area */}
          <div
            ref={chatBodyRef}
            className="flex-grow overflow-y-auto p-4 space-y-3 bg-transparent"
          >
            {messages.length === 0 ? (
              <div className="text-center p-6 text-white italic bg-white/5 rounded-xl shadow-inner mt-4 border border-white/10">
                Greetings, space traveler 👋 I’m your **SkillSageAI** Assistant.
                Let's chart a course for your career!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                  max-w-[80%] p-3 rounded-xl shadow-md text-sm transition-all duration-300
                  ${msg.sender === 'user'
                        // User message: Very Dark Gray Bubble (almost black), White Text
                        ? 'bg-black/70 text-white rounded-br-none font-medium border border-white/20'
                        // AI message: Dark Gray Bubble (distinct from user), White Text
                        : 'bg-black/50 text-white rounded-tl-none border border-white/20'
                      }
                `}
                  >
                    {msg.text}
                    {msg.loading && (
                      <div className="text-xs mt-1 italic text-white/50">
                        <span className="animate-pulse">💡 Stellar Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Chat Footer - Input Console */}
          <div className="p-4 border-t border-white/10 flex space-x-2 bg-black">
            <input
              type="text"
              placeholder={isGenerating ? "Warp drive charging..." : "Ask your astro-coach..."}
              value={inputMessage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isGenerating}
              className="
            flex-grow p-3 border border-white/20 rounded-full 
            focus:outline-none focus:ring-2 focus:ring-white 
            transition-colors disabled:opacity-50
            bg-black text-white placeholder-white/50
          "
            />
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isGenerating}
              className={`
            w-12 h-12 flex items-center justify-center 
            rounded-full shadow-lg text-lg 
            transition-all duration-200 transform active:scale-95 
            
            /* Hover Effect: Background turns BLACK, Shadow/Glow increases */
            ${!inputMessage.trim() || isGenerating
                  ? 'bg-white/30 cursor-not-allowed text-black/50'
                  // Send Button: Active/Enabled state
                  : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,1)] hover:border hover:border-white/50'
                }
          `}
            >
              {/* Lucide React Send Icon - CHANGED to -rotate-90 for vertical/straight look */}
              <Send size={25} fill="currentColor" className="transform -rotate-270" />
            </button>

          </div>
        </div>
      )}
    </div>

  );
};

export default ChatIcon;