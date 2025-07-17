import React, { useState, useEffect } from 'react';

const TrendingList = ({ trending }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [updatePulse, setUpdatePulse] = useState(false);
  const [allTrending, setAllTrending] = useState(trending || []);
  const [displayedTrending, setDisplayedTrending] = useState(trending || []);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreTrending, setHasMoreTrending] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setUpdatePulse(true);
      setTimeout(() => setUpdatePulse(false), 1000);
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Get trending urgency color
  const getUrgencyColor = (index) => {
    if (index === 0) return 'text-red-400';
    if (index < 3) return 'text-orange-400';
    if (index < 5) return 'text-yellow-400';
    return 'text-blue-400';
  };

  // Get trending direction
  const getTrendingDirection = (index) => {
    if (index < 2) return 'up';
    if (index < 4) return 'stable';
    return 'down';
  };

  // Load more trending articles
  const loadMoreTrending = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate more mock trending articles
      const newTrending = Array.from({ length: 5 }, (_, index) => ({
        id: `trending-${Date.now()}-${index}`,
        title: `Breaking News Update ${allTrending.length + index + 1} - Major developments in the latest trending story`,
        url: `https://example.com/news/${allTrending.length + index}`,
        publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        source: { name: ['BBC News', 'CNN', 'Reuters', 'AP News', 'The Guardian'][Math.floor(Math.random() * 5)] },
        engagement: Math.floor(Math.random() * 10000) + 1000,
        category: ['Politics', 'Technology', 'Business', 'Sports', 'Entertainment'][Math.floor(Math.random() * 5)]
      }));
      
      // Add new trending articles to the list
      const updatedAllTrending = [...allTrending, ...newTrending];
      setAllTrending(updatedAllTrending);
      setDisplayedTrending(updatedAllTrending);
      
      // Simulate reaching the end after 25 trending articles
      if (updatedAllTrending.length >= 25) {
        setHasMoreTrending(false);
      }
      
    } catch (error) {
      console.error('Error loading more trending articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="trending-sticky bg-bg-secondary rounded-xl shadow-lg p-6 animate-fadeInUp">
      {/* Header with Real-time Indicator */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-xl text-text-primary flex items-center gap-3">
          <span className="text-gradient">Trending Now</span>
          <div className={`w-2 h-2 rounded-full ${updatePulse ? 'animate-pulse bg-accent-primary' : 'bg-accent-success'}`}></div>
        </h4>
        
        {/* Live Indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-text-muted font-medium">LIVE</span>
        </div>
      </div>

      {/* Trending List */}
      <ol className="space-y-4">
        {displayedTrending.map((item, idx) => (
          <li 
            key={item.id || idx} 
            className={`trending-item group relative p-4 rounded-lg bg-bg-tertiary hover:bg-bg-primary/50 smooth-transition animate-slideInLeft stagger-${idx + 1}`}
          >
            {/* Animated Counter */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className={`counter-animate font-bold text-2xl ${getUrgencyColor(idx)}`}>
                  #{idx + 1}
                </span>
                
                {/* Trending Arrow */}
                <div className={`trending-arrow ${getTrendingDirection(idx) === 'up' ? 'text-red-400' : getTrendingDirection(idx) === 'down' ? 'text-blue-400' : 'text-green-400'}`}>
                  {getTrendingDirection(idx) === 'up' ? (
                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : getTrendingDirection(idx) === 'down' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Engagement Metrics */}
              <div className="flex items-center space-x-2 text-text-muted text-xs">
                <span className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>{item.engagement || Math.floor(Math.random() * 1000) + 100}</span>
                </span>
              </div>
            </div>

            {/* Article Title */}
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-text-primary hover:text-accent-primary smooth-transition line-clamp-2 block mb-2 group-hover:underline"
            >
              {item.title}
            </a>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-text-muted text-xs">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                </span>
                
                <span className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>3 min read</span>
                </span>
              </div>

              {/* Source */}
              <span className="text-xs opacity-75">
                {item.source?.name || 'Unknown'}
              </span>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border border-transparent rounded-lg group-hover:border-accent-primary/20 transition-colors duration-300 pointer-events-none" />
          </li>
        ))}
      </ol>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-4 mt-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={`skeleton-${idx}`} className="skeleton-video bg-bg-tertiary rounded-lg p-4 animate-shimmer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-6 w-8 bg-bg-secondary rounded"></div>
                  <div className="h-5 w-5 bg-bg-secondary rounded"></div>
                </div>
                <div className="h-4 w-12 bg-bg-secondary rounded"></div>
              </div>
              <div className="h-4 bg-bg-secondary rounded mb-2"></div>
              <div className="h-3 bg-bg-secondary rounded w-3/4 mb-3"></div>
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-bg-secondary rounded"></div>
                <div className="h-3 w-20 bg-bg-secondary rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* See More Button */}
      {displayedTrending.length > 0 && hasMoreTrending && (
        <div className="mt-6 pt-4 border-t border-bg-tertiary">
          <button 
            onClick={loadMoreTrending}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-semibold smooth-transition flex items-center justify-center space-x-2 ${
              isLoading 
                ? 'bg-bg-tertiary text-text-muted cursor-not-allowed' 
                : 'bg-gradient text-white hover:opacity-90'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>See More Trending</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* No More Trending Message */}
      {!hasMoreTrending && displayedTrending.length > 0 && (
        <div className="mt-6 pt-4 border-t border-bg-tertiary text-center">
          <p className="text-text-muted text-sm">No more trending articles to load</p>
        </div>
      )}

      {/* Update Pulse Effect */}
      {updatePulse && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-accent-primary rounded-full animate-ping opacity-75"></div>
      )}
    </div>
  );
};

export default TrendingList; 