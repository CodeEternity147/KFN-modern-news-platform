import React, { useState } from 'react';

const NewsCard = ({ article, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Helper to format time ago (simple version)
  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 60000); // minutes
    if (diff < 60) return `${diff} mins ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hour${Math.floor(diff / 60) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate reading time
  const getReadTime = (desc) => {
    if (!desc) return '2 min read';
    const words = desc.split(' ').length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
  };

  // Get category with color mapping
  const getCategoryColor = (category) => {
    const colors = {
      technology: 'from-blue-500 to-cyan-500',
      business: 'from-green-500 to-emerald-500',
      sports: 'from-orange-500 to-red-500',
      entertainment: 'from-purple-500 to-pink-500',
      health: 'from-teal-500 to-green-500',
      science: 'from-indigo-500 to-purple-500',
      politics: 'from-red-500 to-orange-500',
      general: 'from-gray-500 to-slate-500'
    };
    return colors[category?.toLowerCase()] || colors.general;
  };

  const tag = article.category || article.tag || 'General';
  const imageUrl = article.image || article.urlToImage || article.imageUrl || article.img;

  // Handle bookmark toggle
  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  // Handle social share
  const handleShare = (platform) => {
    const url = encodeURIComponent(article.url);
    const title = encodeURIComponent(article.title);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  return (
    <article className="card-elevated group relative bg-bg-secondary rounded-xl overflow-hidden hover-lift smooth-transition animate-fadeInUp">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={article.title} 
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'scale-100' : 'scale-110 blur-sm'
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-bg-tertiary to-bg-secondary flex items-center justify-center">
            <svg className="w-12 h-12 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4">
          <span className={`category-tag inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(tag)} text-white shadow-lg`}>
            {tag}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={toggleBookmark}
          className="absolute top-4 right-4 p-2 rounded-full bg-bg-primary/80 backdrop-blur-sm text-text-muted hover:text-accent-primary smooth-transition opacity-0 group-hover:opacity-100"
        >
          <svg className={`w-5 h-5 ${isBookmarked ? 'fill-accent-primary text-accent-primary' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>

        {/* Share Buttons */}
        <div className={`absolute bottom-4 right-4 flex space-x-2 transition-all duration-300 ${
          showShare ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <button
            onClick={() => handleShare('twitter')}
            className="p-2 rounded-full bg-bg-primary/80 backdrop-blur-sm text-text-muted hover:text-blue-400 smooth-transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="p-2 rounded-full bg-bg-primary/80 backdrop-blur-sm text-text-muted hover:text-blue-600 smooth-transition"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-text-primary mb-3 line-clamp-2 group-hover:text-accent-primary smooth-transition">
          {onClick ? (
            <button 
              onClick={onClick}
              className="hover:underline text-left w-full cursor-pointer"
            >
              {article.title}
            </button>
          ) : (
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {article.title}
            </a>
          )}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-text-muted text-xs">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{getReadTime(article.description)}</span>
            </span>
            
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{getTimeAgo(article.publishedAt)}</span>
            </span>
          </div>

          {/* Share Toggle */}
          <button
            onClick={() => setShowShare(!showShare)}
            className="p-1 rounded-full hover:bg-bg-tertiary smooth-transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-accent-primary/20 transition-colors duration-300 pointer-events-none" />
    </article>
  );
};

export default NewsCard; 