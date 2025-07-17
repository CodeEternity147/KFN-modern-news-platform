import React, { useState, useEffect } from 'react';

const HeroSection = ({ featuredArticle }) => {
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!featuredArticle) {
    console.log('No featured article provided to HeroSection');
    return null;
  }

  // Get the image URL from different possible field names
  const getImageUrl = (article) => {
    return (
      article.image ||
      article.urlToImage ||
      article.imageUrl ||
      article.img ||
      null
    );
  };

  const imageUrl = getImageUrl(featuredArticle);
  console.log('Featured article for hero:', featuredArticle);
  console.log('Final image URL:', imageUrl);

  // Calculate reading time (rough estimate)
  const getReadingTime = (text) => {
    if (!text) return '3 min read';
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Parallax Background Image */}
      <div className="absolute inset-0">
        {imageUrl && !imageError ? (
          <div className="parallax-bg w-full h-full">
            <img
              src={imageUrl}
              alt={featuredArticle.title}
              className="w-full h-full object-cover scale-110 blur-sm brightness-50"
              onError={() => {
                console.log('Image failed to load:', imageUrl);
                setImageError(true);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary"></div>
        )}
        
        {/* Enhanced Multi-layer Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/90 via-bg-primary/80 to-bg-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Animated Particles Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-primary rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-accent-success rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Category Tag with Glow */}
            <div className={`inline-flex items-center space-x-2 mb-6 animate-fadeInUp ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
              <span className="category-tag inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient text-white shadow-lg animate-glow">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.882C9.738 4.5 8.785 5.5 7.5 5.5c-1.5 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5c1.285 0 2.238 1 3.623 1.447.208.324.477.652.822.882a1 1 0 001.45-.385c.23-.345.23-.614.23-.822 0-.208 0-.477-.23-.822z" clipRule="evenodd" />
                </svg>
                TRENDING NOW
              </span>
            </div>

            {/* Animated Title */}
            <h1 className={`text-hero font-extrabold text-white mb-6 leading-tight drop-shadow-2xl text-reveal ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
              {featuredArticle.title}
            </h1>

            {/* Animated Description */}
            <p className={`text-subheading text-white/95 mb-8 max-w-3xl line-clamp-3 text-reveal ${isVisible ? 'animate-fadeInUp stagger-2' : 'opacity-0'}`}>
              {featuredArticle.description}
            </p>

            {/* Article Meta Information */}
            <div className={`flex flex-wrap items-center space-x-6 mb-8 text-reveal ${isVisible ? 'animate-fadeInUp stagger-3' : 'opacity-0'}`}>
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">{featuredArticle.source?.name || 'Unknown Source'}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">{formatDate(featuredArticle.publishedAt)}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-white/80">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{getReadingTime(featuredArticle.description)}</span>
              </div>
            </div>

            {/* Floating CTA Button */}
            <div className={`floating-cta ${isVisible ? 'animate-fadeInUp stagger-4' : 'opacity-0'}`}>
              <a
                href={featuredArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient text-white font-bold rounded-full hover:opacity-90 smooth-transition shadow-lg hover:shadow-xl animate-pulse"
              >
                <span>Read Full Story</span>
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center space-y-2 text-white/80">
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
