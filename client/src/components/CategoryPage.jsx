import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import HeroSection from './HeroSection';

const CategoryPage = ({ category, onBack }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const categoryNames = {
    general: 'General News',
    technology: 'Technology',
    business: 'Business',
    sports: 'Sports',
    entertainment: 'Entertainment',
    health: 'Health',
    science: 'Science',
    politics: 'Politics'
  };

  const categoryIcons = {
    general: '📰',
    technology: '💻',
    business: '💼',
    sports: '⚽',
    entertainment: '🎬',
    health: '🏥',
    science: '🔬',
    politics: '🏛️'
  };

  useEffect(() => {
    setIsVisible(true);
    fetchCategoryNews();
  }, [category]);

  const fetchCategoryNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      const url = `https://gnews.io/api/v4/top-headlines?lang=hi&category=${category}&token=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`Category ${category} data:`, data);
      
      if (data.articles) {
        setArticles(data.articles);
      } else {
        setError('No articles found for this category');
      }
    } catch (err) {
      setError('Failed to fetch category news. Please try again.');
      console.error('Error fetching category news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get featured article for category (only with image)
  const getFeaturedArticle = () => {
    if (!articles.length) return null;
    // Only return an article if it has a valid image
    return articles.find(article => {
      const img = article.image || article.urlToImage || article.imageUrl || article.img;
      return img && typeof img === 'string' && img.trim() !== '';
    }) || null;
  };

  // Get remaining articles (excluding featured)
  const getRemainingArticles = () => {
    const featured = getFeaturedArticle();
    if (!featured) return articles;
    return articles.filter(article => article !== featured);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Category Header */}
      <div className="glass-effect border-b border-bg-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 rounded-full bg-bg-secondary text-text-muted hover:text-accent-primary hover:bg-bg-tertiary smooth-transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-4xl animate-float">{categoryIcons[category]}</span>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">
                  {categoryNames[category]}
                </h1>
                <p className="text-text-muted mt-1">Latest updates and breaking news</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-text-muted">
          <button onClick={onBack} className="hover:text-accent-primary smooth-transition">
            Home
          </button>
          <span className="text-text-muted">•</span>
          <span className="text-text-primary">{categoryNames[category]}</span>
        </nav>
      </div>

      {/* Hero Section for Category - only if a featured article with image exists */}
      {!loading && !error && getFeaturedArticle() && (
        <div className={`animate-fadeInUp ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <HeroSection featuredArticle={getFeaturedArticle()} />
        </div>
      )}

      {/* Category Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-accent-error text-lg font-medium">{error}</div>
            <button
              onClick={fetchCategoryNews}
              className="mt-4 px-6 py-2 bg-gradient text-white rounded-lg hover:opacity-90 smooth-transition"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && getRemainingArticles().length > 0 && (
          <div className={`animate-fadeInUp ${isVisible ? 'animate-fadeInUp stagger-1' : 'opacity-0'}`}>
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-headline font-bold text-gradient">
                  More {categoryNames[category]} Articles
                </h2>
                <span className="text-text-muted">
                  {getRemainingArticles().length} articles
                </span>
              </div>
              <p className="text-text-secondary mt-2">
                Stay updated with the latest {categoryNames[category].toLowerCase()} news and insights
              </p>
            </div>
            
            <div className="news-grid">
              {getRemainingArticles().map((article, index) => (
                <div 
                  key={index} 
                  className="animate-fadeInUp" 
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && getRemainingArticles().length === 0 && articles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-bg-tertiary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No Articles Found</h3>
            <p className="text-text-muted">No articles available in this category at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage; 