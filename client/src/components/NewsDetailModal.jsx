import React from 'react';

const NewsDetailModal = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[95vh] bg-gradient-to-br from-bg-secondary via-bg-secondary/95 to-bg-tertiary/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-accent-primary/20 overflow-hidden animate-scaleIn">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-secondary/5 animate-pulse"></div>
        <div className="absolute top-0 left-1/4 w-1 h-1 bg-accent-primary rounded-full animate-ping"></div>
        <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-accent-secondary rounded-full animate-bounce"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-gradient-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm text-red-400 hover:text-white hover:from-red-500 hover:to-red-600 hover:shadow-lg transition-all duration-300 hover:scale-110 rounded-full border border-red-500/30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="relative z-10 overflow-y-auto max-h-[95vh]">
          {/* Header Image with Enhanced Effects */}
          {article.image && (
            <div className="relative h-72 sm:h-96 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform scale-105 transition-transform duration-700 hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-accent-primary rounded-full animate-ping"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent-secondary rounded-full animate-bounce"></div>
              
              {/* Category Badge on Image */}
              {article.category && (
                <div className="absolute top-6 left-6 animate-fadeInUp">
                  <span className="px-4 py-2 bg-gradient-to-r from-accent-primary/90 to-accent-secondary/90 text-white rounded-full font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20">
                    {article.category}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Content Section */}
          <div className="p-8 sm:p-10">
            {/* Title with Enhanced Typography */}
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {article.title}
              </h1>
              
              {/* Decorative Line */}
              <div className="w-20 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full animate-pulse"></div>
            </div>

            {/* Enhanced Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              {article.sourceName && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span className="text-blue-300 font-medium">{article.sourceName}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-green-300 font-medium">{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Description with Enhanced Styling */}
            {article.description && (
              <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-purple-300">Article Summary</h3>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                  <p className="text-text-secondary leading-relaxed text-lg font-medium">
                    {article.description}
                  </p>
                </div>
              </div>
            )}

            {/* Content with Enhanced Layout */}
            {article.content && (
              <div className="mb-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-orange-300">Full Article</h3>
                </div>
                <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/20 backdrop-blur-sm">
                  <div className="text-text-secondary leading-relaxed text-base prose prose-invert max-w-none">
                    <div className="space-y-4">
                      {article.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="text-text-secondary leading-7">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Reading Time */}
            <div className="pt-8 border-t border-accent-primary/20 animate-fadeInUp" style={{ animationDelay: '1s' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-full border border-teal-500/30">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-teal-300 font-semibold">
                    {article.content 
                      ? `${Math.max(1, Math.round(article.content.split(' ').length / 200))} min read`
                      : '2 min read'
                    }
                  </span>
                </div>
                
                {/* Share Button */}
                <button className="px-4 py-2 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 text-accent-primary rounded-full font-medium hover:from-accent-primary hover:to-accent-secondary hover:text-white transition-all duration-300 hover:scale-105 border border-accent-primary/30">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailModal; 