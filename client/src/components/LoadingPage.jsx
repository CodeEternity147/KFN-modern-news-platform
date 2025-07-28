import { useState, useEffect } from 'react';

// Import the actual logos
import logo from '../assets/logo.jpg';
import supportcompanylogo from '../assets/Logo.png';

const LoadingPage = ({ newsLoaded = false, videosLoaded = false, ourNewsLoaded = false }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');

  const messages = [
    "Loading news...",
    "Fetching videos...", 
    "Preparing your feed...",
    "Almost ready..."
  ];

  useEffect(() => {
    // Calculate progress based on loaded data
    const totalSources = 3;
    let loadedSources = 0;
    
    if (newsLoaded) loadedSources++;
    if (videosLoaded) loadedSources++;
    if (ourNewsLoaded) loadedSources++;
    
    const targetProgress = (loadedSources / totalSources) * 100;
    
    // Update message based on progress
    const messageIndex = Math.min(Math.floor((targetProgress / 100) * messages.length), messages.length - 1);
    setCurrentMessage(messages[messageIndex]);
    
    // Smooth progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return Math.min(prev + 2, targetProgress);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [newsLoaded, videosLoaded, ourNewsLoaded]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden z-50">
      
      {/* Simple Background Effects */}
      <div className="absolute inset-0">
        {/* Gentle Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Simple Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-16">
          {/* Main Logo */}
          <div className="relative mb-8">
            <div className="relative group">
              <img src={logo} alt="logo" className="w-20 h-20 mx-auto" />
            </div>
          </div>

          {/* Brand Name */}
          <div className="text-center mb-8">
           
            <p className="text-lg text-gray-300 font-light tracking-widest">
              Knowledge • Facts • News
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-md mb-12">
          {/* Loading Message */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-200 font-medium">
              {currentMessage}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-gray-700/50 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
            
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
            </div>
            
            <div 
              className="absolute top-0 h-full bg-blue-400/50 rounded-full blur-sm transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Progress Percentage */}
          <div className="text-right">
            <span className="text-sm text-gray-400 font-mono">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Simple Loading Dots */}
        <div className="flex justify-center space-x-2 mb-16">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Enhanced Powered By Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4 px-6 py-5 bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-600/30 shadow-xl">
            <div className="text-sm text-gray-300 font-medium tracking-wider">
              Powered by
            </div>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110">
                <img 
                  src={supportcompanylogo} 
                  alt="CodeEternity" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CodeEternity
                </div>
                <div className="text-xs text-gray-400">
                  Premium Solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;