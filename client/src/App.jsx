import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import NewsCard from './components/NewsCard';
import CategoryPage from './components/CategoryPage';
import TrendingList from './components/TrendingList';
import PopularVideos from './components/PopularVideos';
import Footer from './components/Footer';
import AboutUs from './components/Pages/AboutUs';
import ContactUs from './components/Pages/ContactUs';
import Support from './components/Pages/Support';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsOfService from './components/Pages/TermsOfService';
import LocationPermission from './components/LocationPermission';
import CityNews from './components/CityNews';
import NewsDetailPage from './components/NewsDetailPage';
import LoadingPage from './components/LoadingPage';
import './App.css';



function NewsApp(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('home');
  const [videos, setVideos] = useState([]);
  const [ourNews, setOurNews] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [newsLoaded, setNewsLoaded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [ourNewsLoaded, setOurNewsLoaded] = useState(false);

  const fetchNews = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      let url;
      if (query && query.trim()) {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=hi&token=${apiKey}`;
      } else {
        url = `https://gnews.io/api/v4/top-headlines?lang=hi&token=${apiKey}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setError('No articles found');
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later');
    } finally {
      setLoading(false);
      setNewsLoaded(true);
    }
  };

  useEffect(() => {
    if (currentPage === 'home') {
      fetchNews();
    }
  }, [currentPage]);

  // Handle navigation state from city page
  useEffect(() => {
    const location = window.location;
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');
    
    if (categoryParam && categoryParam !== activeCategory) {
      handleCategorySelect(categoryParam);
    }
    
    if (searchParam && searchParam !== searchQuery) {
      handleSearch(searchParam);
    }
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const youtubeapiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=latest+hindi+news&type=video&maxResults=5&key=${youtubeapiKey}`;
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
      } finally {
        setVideosLoaded(true);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchOurNews = async () => {
      try {
        // Try to use relative URL first, then fallback to environment variable
        let apiUrl;
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Local development - use localhost
          apiUrl = 'http://localhost:5000';
        } else {
          // Production - use environment variable or relative URL
          apiUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
        }
        
        const res = await fetch(`${apiUrl}/api/news`);
        if (res.ok) {
          const data = await res.json();
          setOurNews(data);
        }
      } catch (err) {
        console.error('Error fetching our news:', err);
      }
      finally {
        setOurNewsLoaded(true);
      }
    };
    fetchOurNews();
  }, []);

  // Hide initial loading when all data is loaded
  useEffect(() => {
    // Check if all data sources have been loaded
    const allDataLoaded = newsLoaded && videosLoaded && ourNewsLoaded && !loading;
    
    if (allDataLoaded) {
      // Add a small delay for smooth transition
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [newsLoaded, videosLoaded, ourNewsLoaded, loading]);

  const handleSearch = (query) => {
    if (query && query.trim()) {
      setSearchQuery(query);
      fetchNews(query);
      setCurrentPage('home');
      setActiveCategory('home');
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    if (category === 'home') {
      setCurrentPage('home');
    } else {
      setCurrentPage('category');
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setActiveCategory('home');
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



  // Show loading screen during initial load
  if (isInitialLoading) {
    return (
      <LoadingPage 
        newsLoaded={newsLoaded}
        videosLoaded={videosLoaded}
        ourNewsLoaded={ourNewsLoaded}
      />
    );
  }

  if (currentPage === 'category') {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Navbar 
          onCategorySelect={handleCategorySelect} 
          activeCategory={activeCategory}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <div className="pt-20">
          <CategoryPage category={activeCategory} onBack={handleBackToHome} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar 
        onCategorySelect={handleCategorySelect} 
        activeCategory={activeCategory}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />
      <div className="pt-20">
        {!loading && !error && getFeaturedArticle() && (
          <HeroSection featuredArticle={getFeaturedArticle()} />
        )}
        {!loading && !error && getRemainingArticles().length > 3 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-headline font-bold mb-8 text-gradient">Editor's Picks</h2>
            <div className="news-grid">
              {getRemainingArticles().slice(0, 6).map((article, idx) => (
                <div key={idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </section>
        )}
        {ourNews.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-headline font-bold mb-8 text-gradient">Kheta Sarai News</h2>
            <div className="news-grid">
              {ourNews.map((article, idx) => (
                <div key={article._id || idx} className="animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          </section>
        )}
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
                onClick={() => fetchNews()}
                className="mt-4 px-6 py-2 bg-gradient text-white rounded-lg hover:opacity-90 smooth-transition"
              >
                Try Again
              </button>
            </div>
          )}
          {!loading && !error && getRemainingArticles().length > 0 && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-headline font-bold mb-8 text-gradient">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'The Latest'}
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
              <div className="text-text-muted text-lg">No articles found</div>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsApp />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/location" element={<LocationPermission />} />
        <Route path="/city/:cityName" element={<CityNews />} />
        <Route path="/news/:newsId" element={<NewsDetailPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        {/* Catch-all route for any unmatched paths */}
        <Route path="*" element={<NewsApp />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
