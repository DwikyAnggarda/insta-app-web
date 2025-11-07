import { useEffect, useState } from "react";
import { Sparkles, Check } from "lucide-react";

export default function WelcomeAnimation({ userName, onComplete }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Auto hide after 3 seconds
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(() => onComplete?.(), 300); // Wait for fade out animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!show) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center px-6 animate-bounce-in">
                {/* Success Icon */}
                <div className="mb-6 relative inline-block">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <Check size={48} className="text-green-500" strokeWidth={3} />
                    </div>
                    {/* Sparkles */}
                    <Sparkles 
                        className="absolute -top-2 -right-2 text-yellow-300 animate-pulse" 
                        size={32} 
                        fill="currentColor"
                    />
                    <Sparkles 
                        className="absolute -bottom-2 -left-2 text-yellow-300 animate-pulse" 
                        size={24} 
                        fill="currentColor"
                        style={{ animationDelay: '0.2s' }}
                    />
                </div>

                {/* Welcome Message */}
                <h1 className="text-4xl font-bold text-white mb-2 animate-slide-up">
                    Welcome! 🎉
                </h1>
                <p className="text-xl text-white/90 mb-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {userName}
                </p>
                <p className="text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Your account has been created successfully
                </p>

                {/* Confetti Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: '-10px',
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }}
                        >
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{
                                    backgroundColor: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB'][Math.floor(Math.random() * 5)],
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes bounce-in {
                    0% {
                        transform: scale(0.3);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes slide-up {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out forwards;
                    opacity: 0;
                }

                .animate-confetti {
                    animation: confetti linear infinite;
                }
            `}</style>
        </div>
    );
}
