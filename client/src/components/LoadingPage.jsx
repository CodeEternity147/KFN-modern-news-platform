import { useState, useEffect } from 'react';

const LoadingPage = ({ newsLoaded = false, videosLoaded = false, ourNewsLoaded = false }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate real progress based on loaded data
    const totalSources = 3;
    let loadedSources = 0;
    
    if (newsLoaded) loadedSources++;
    if (videosLoaded) loadedSources++;
    if (ourNewsLoaded) loadedSources++;
    
    const targetProgress = (loadedSources / totalSources) * 100;
    
    // Smooth progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetProgress) {
          clearInterval(interval);
          return targetProgress;
        }
        return Math.min(prev + 2, targetProgress);
      });
    }, 25);

    return () => clearInterval(interval);
  }, [newsLoaded, videosLoaded, ourNewsLoaded]);

  const getCurrentMessage = () => {
    if (!newsLoaded) return "Loading news...";
    if (!videosLoaded) return "Loading videos...";
    if (!ourNewsLoaded) return "Preparing feed...";
    return "Ready!";
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden z-50">
      
      {/* Subtle Background Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          
          {/* Logo */}
          <div className="mb-12">
            <div className="relative">
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-red-600 rounded-full blur-lg opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Brand Name */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              KFN
            </h1>
            <div className="w-16 h-0.5 bg-red-500 mx-auto"></div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 max-w-sm mx-auto">
            <div className="bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Loading Message */}
          <div className="mb-8">
            <p className="text-lg text-gray-300 font-medium">
              {getCurrentMessage()}
            </p>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 mb-12">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ 
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>

          {/* Credits */}
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">
              Made by <span className="text-red-400 font-semibold">codeeternity</span>
            </p>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;