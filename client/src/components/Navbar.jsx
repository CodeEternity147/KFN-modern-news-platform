import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, setLoginState } from '../store';

const Navbar = ({ onCategorySelect, activeCategory = 'home', onSearch, searchQuery: propSearchQuery = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState(propSearchQuery);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'general', name: 'General', icon: '📰' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'politics', name: 'Politics', icon: '🏛️' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // Update local search query when prop changes
  useEffect(() => {
    setSearchQuery(propSearchQuery);
  }, [propSearchQuery]);

  useEffect(() => {
    const handleStorage = () => {
      dispatch(setLoginState(!!localStorage.getItem('token')));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-bg-secondary/95 backdrop-blur-xl shadow-2xl border-b border-accent-primary/20' 
          : 'bg-bg-secondary/85 backdrop-blur-lg'
      }`}>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-accent-secondary/5"></div>
        
        <div className="relative max-w-8xl mx-auto  sm:px-6 lg:px-2">
          <div className="flex items-center justify-around py-4">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <h1 className="text-2xl font-bold text-accent-primary cursor-pointer hover:text-accent-secondary hover:scale-105 transition-all duration-300 hover:drop-shadow-lg">
                <span className="inline-block group-hover:animate-bounce">📰</span>PulseNews
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center  flex-1 justify-center px-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-xl border-2 border-white/20'
                      : 'text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary/80 hover:shadow-lg backdrop-blur-sm'
                  }`}
                >
                  <span className="hidden xl:inline relative z-10">{category.name}</span>
                  {activeCategory === category.id && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 animate-pulse"></div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full animate-ping"></div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent-secondary rounded-full"></div>
                    </>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search */}
              <div className="relative group">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search news..."
                      className={`bg-bg-tertiary/80 backdrop-blur-sm text-text-primary placeholder-text-muted px-4 py-2.5 rounded-xl border border-accent-primary/20 focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/30 hover:border-accent-primary/60 hover:shadow-lg transition-all duration-300 ${
                        isSearchExpanded ? 'w-64' : 'w-48'
                      }`}
                      onFocus={() => setIsSearchExpanded(true)}
                      onBlur={() => setIsSearchExpanded(false)}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          if (onSearch) onSearch('');
                        }}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1.5 text-text-muted hover:text-accent-error hover:scale-110 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-text-muted text-white hover:text-accent-primary hover:scale-110 transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl bg-bg-tertiary/80 backdrop-blur-sm text-text-secondary hover:text-accent-primary hover:bg-bg-secondary/80 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg className={`w-6 h-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-6 space-y-6 bg-bg-tertiary/90 backdrop-blur-xl rounded-2xl mx-4 mb-4 border border-accent-primary/10 shadow-2xl">
              {/* Mobile Search */}
              <div className="px-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search news..."
                    className="w-full bg-bg-secondary/80 backdrop-blur-sm text-white placeholder-text-muted px-4 py-2.5 rounded-xl border border-accent-primary/20 focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/30 hover:border-accent-primary/60 hover:shadow-lg transition-all duration-300"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="grid grid-cols-2 gap-3 px-4">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`p-3 rounded-xl text-sm font-medium flex items-center space-x-2 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-xl border-2 border-white/20'
                        : 'bg-bg-secondary/80 backdrop-blur-sm text-text-secondary hover:bg-bg-tertiary/80 hover:shadow-lg'
                    }`}
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="truncate">{category.name}</span>
                    {activeCategory === category.id && (
                      <div className="absolute -top-1 right-2 w-2 h-2 bg-accent-secondary rounded-full animate-pulse"></div>
                    )}
                    {activeCategory === category.id && (
                      <div className="absolute -top-1 right-2 w-2 h-2 bg-accent-secondary rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile Dark Mode Toggle */}
              <div className="flex justify-center px-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-3 rounded-xl bg-bg-secondary/80 backdrop-blur-sm text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary/80 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-2">
                    {isDarkMode ? (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-sm">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span className="text-sm">Dark Mode</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;