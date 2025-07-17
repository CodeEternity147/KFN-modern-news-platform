import React, { useState } from 'react';

const PopularVideos = ({ videos }) => {
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allVideos, setAllVideos] = useState(videos || []);
  const [displayedVideos, setDisplayedVideos] = useState(videos || []);
  const [nextPageToken, setNextPageToken] = useState('');
  const [hasMoreVideos, setHasMoreVideos] = useState(true);

  // Format view count
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Generate random view count for demo
  const getRandomViewCount = () => {
    return Math.floor(Math.random() * 1000000) + 1000;
  };

  // Get video duration (mock)
  const getVideoDuration = () => {
    const durations = ['2:15', '5:30', '8:45', '12:20', '3:10'];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  // Load more videos function
  const loadMoreVideos = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate more mock videos
      const newVideos = Array.from({ length: 4 }, (_, index) => ({
        id: `video-${Date.now()}-${index}`,
        title: `Latest News Update ${allVideos.length + index + 1}`,
        thumbnail: `https://picsum.photos/320/180?random=${allVideos.length + index}`,
        url: `https://www.youtube.com/watch?v=demo-${allVideos.length + index}`,
        category: 'News',
        publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        viewCount: getRandomViewCount(),
        duration: getVideoDuration()
      }));
      
      // Add new videos to the list
      const updatedAllVideos = [...allVideos, ...newVideos];
      setAllVideos(updatedAllVideos);
      setDisplayedVideos(updatedAllVideos);
      
      // Simulate reaching the end after 20 videos
      if (updatedAllVideos.length >= 20) {
        setHasMoreVideos(false);
      }
      
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Skeleton loading component
  const VideoSkeleton = () => (
    <div className="skeleton-video bg-bg-tertiary rounded-xl overflow-hidden animate-shimmer">
      <div className="h-32 bg-bg-secondary"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-bg-secondary rounded"></div>
        <div className="h-3 bg-bg-secondary rounded w-3/4"></div>
        <div className="flex space-x-2">
          <div className="h-6 w-16 bg-bg-secondary rounded"></div>
          <div className="h-6 w-20 bg-bg-secondary rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-bg-secondary rounded-xl shadow-lg p-6 animate-fadeInUp">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-xl text-text-primary flex items-center gap-3">
          <span className="text-gradient">Popular Videos</span>
          <svg className="w-5 h-5 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        </h4>
        <button className="text-accent-primary text-sm hover:text-accent-secondary smooth-transition font-medium">
          See All
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading && displayedVideos.length > 0 ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, idx) => (
            <VideoSkeleton key={`skeleton-${idx}`} />
          ))
        ) : displayedVideos && displayedVideos.length > 0 ? (
          displayedVideos.map((video, idx) => (
            <div 
              key={video.id || idx} 
              className="video-card group relative bg-bg-tertiary rounded-xl overflow-hidden hover-lift smooth-transition animate-slideInLeft stagger-${idx + 1}"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              {/* Video Thumbnail */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  loading="lazy"
                />
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition">
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="video-overlay w-16 h-16 bg-accent-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 smooth-transition">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Video Duration */}
                  <div className="absolute bottom-2 right-2 bg-bg-primary/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    {video.duration || getVideoDuration()}
                  </div>

                  {/* View Count */}
                  <div className="absolute top-2 left-2 bg-bg-primary/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <span>{formatViewCount(video.viewCount || getRandomViewCount())}</span>
                  </div>
                </div>
              </div>

              {/* Video Content */}
              <div className="p-4">
                {/* Category Tag */}
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-primary to-accent-secondary text-white">
                    {video.category || 'Video'}
                  </span>
                  
                  {/* Engagement Metrics */}
                  <div className="flex items-center space-x-2 text-text-muted text-xs">
                    <span className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span>{Math.floor(Math.random() * 500) + 50}</span>
                    </span>
                  </div>
                </div>

                {/* Video Title */}
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-text-primary hover:text-accent-primary smooth-transition line-clamp-2 block mb-2 group-hover:underline"
                >
                  {video.title}
                </a>

                {/* Video Meta */}
                <div className="flex items-center justify-between text-text-muted text-xs">
                  <span className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{video.publishedAt ? new Date(video.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '2 hours ago'}</span>
                  </span>
                  
                  <span className="flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{video.duration || getVideoDuration()}</span>
                  </span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-accent-primary/20 transition-colors duration-300 pointer-events-none" />
            </div>
          ))
        ) : (
          // Empty State
          <div className="col-span-full">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-bg-tertiary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No Videos Available</h3>
              <p className="text-text-muted">Check back later for the latest video content.</p>
            </div>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {displayedVideos && displayedVideos.length > 0 && hasMoreVideos && (
        <div className="mt-6 pt-4 border-t border-bg-tertiary">
          <button 
            onClick={loadMoreVideos}
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
                <span>Load More Videos</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}

      {/* No More Videos Message */}
      {!hasMoreVideos && displayedVideos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-bg-tertiary text-center">
          <p className="text-text-muted text-sm">No more videos to load</p>
        </div>
      )}
    </div>
  );
};

export default PopularVideos; 