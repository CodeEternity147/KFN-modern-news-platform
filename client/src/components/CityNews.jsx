import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import NewsCard from './NewsCard';
import TrendingList from './TrendingList';
import PopularVideos from './PopularVideos';
import Footer from './Footer';

const CityNews = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [ourNews, setOurNews] = useState([]);

  const decodedCityName = decodeURIComponent(cityName);

  const fetchCityNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      // Search for news related to the city
      const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(decodedCityName)}&lang=hi&token=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setError(`No news found for ${decodedCityName}`);
      }
    } catch (err) {
      setError('Failed to fetch city news. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const youtubeapiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(decodedCityName + ' news')}&type=video&maxResults=5&key=${youtubeapiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.items) {
        const mapped = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          category: 'YouTube',
        }));
        setVideos(mapped);
      }
    } catch (err) {
      setVideos([]);
    }
  };

  const fetchOurNews = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/news`);
      if (res.ok) {
        const data = await res.json();
        setOurNews(data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchCityNews();
    fetchVideos();
    fetchOurNews();
  }, [decodedCityName]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const getFeaturedArticle = () => {
    if (!articles.length) return null;
    return articles.find(article => {
      const img = article.image || article.urlToImage || article.imageUrl || article.img;
      return img && typeof img === 'string' && img.trim() !== '';
    }) || null;
  };

  const getRemainingArticles = () => {
    const featured = getFeaturedArticle();
    if (!featured) return articles;
    return articles.filter(article => article !== featured);
  };

  const handleCategorySelect = (categoryId) => {
    if (categoryId === 'local') {
      // Check if user has already allowed location access
      const locationChoice = localStorage.getItem('locationChoice');
      const userCity = localStorage.getItem('userCity');
      
      if (locationChoice === 'allowed' && userCity) {
        // User has already allowed location, navigate to their city page
        navigate(`/city/${encodeURIComponent(userCity)}`);
      } else {
        // User hasn't allowed location or hasn't made a choice, navigate to location permission page
        navigate('/location');
      }
    } else if (categoryId === 'home') {
      navigate('/');
    } else {
      // For other categories, navigate to home with category parameter
      navigate(`/?category=${categoryId}`);
    }
  };

  const handleSearch = (query) => {
    if (query && query.trim()) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar 
        onCategorySelect={handleCategorySelect}
        activeCategory="city"
        onSearch={handleSearch}
        searchQuery=""
      />
      <div className="pt-20">
        {/* City Header */}
        <div className="bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border-b border-accent-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🏙️</div>
                <div>
                  <h1 className="text-3xl font-bold text-gradient">
                    {decodedCityName} News
                  </h1>
                  <p className="text-text-secondary mt-1">
                    Latest news and updates from {decodedCityName}
                  </p>
                </div>
              </div>
              <button
                onClick={handleBackToHome}
                className="bg-bg-tertiary text-text-primary px-4 py-2 rounded-xl hover:bg-bg-secondary transition-all duration-300"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {!loading && !error && getFeaturedArticle() && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-headline font-bold mb-6 text-gradient">Featured News</h2>
            <div className="bg-bg-secondary rounded-2xl overflow-hidden shadow-2xl border border-accent-primary/20">
              <NewsCard article={getFeaturedArticle()} />
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary"></div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-12">
              <div className="text-accent-error text-lg font-medium mb-4">{error}</div>
              <button
                onClick={fetchCityNews}
                className="px-6 py-2 bg-gradient text-white rounded-lg hover:opacity-90 smooth-transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && getRemainingArticles().length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-headline font-bold mb-8 text-gradient">Latest from {decodedCityName}</h2>
            <div className="news-grid">
              {getRemainingArticles().slice(0, 6).map((article, idx) => (
                <div key={idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Our News Section */}
        {ourNews.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-headline font-bold mb-8 text-gradient">Our News</h2>
            <div className="news-grid">
              {ourNews.map((article, idx) => (
                <div key={article._id || idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!loading && !error && getRemainingArticles().length > 0 && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-headline font-bold mb-8 text-gradient">
                  All {decodedCityName} News
                </h2>
                <div className="space-y-6">
                  {getRemainingArticles().map((article, index) => (
                    <div className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }} key={index}>
                      <NewsCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
              <aside className="w-full lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-24">
                <TrendingList trending={getRemainingArticles().slice(0, 5)} />
                <PopularVideos videos={videos} />
              </aside>
            </div>
          )}
          
          {!loading && !error && getRemainingArticles().length === 0 && articles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-text-muted text-lg">No articles found for {decodedCityName}</div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CityNews; 