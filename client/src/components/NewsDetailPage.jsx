import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        
        // Try to use relative URL first, then fallback to environment variable
        let apiUrl;
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          // Local development - use localhost
          apiUrl = 'http://localhost:5000';
        } else {
          // Production - use environment variable or relative URL
          apiUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
        }
        
        console.log('Fetching news with ID:', newsId);
        console.log('API URL:', `${apiUrl}/api/news/${newsId}`);
        
        const res = await fetch(`${apiUrl}/api/news/${newsId}`);
        
        console.log('Response status:', res.status);
        
        if (res.ok) {
          const data = await res.json();
          console.log('News data:', data);
          setArticle(data);
        } else {
          const errorData = await res.json().catch(() => ({}));
          console.error('API Error:', errorData);
          setError('News article not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load news article');
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <div className="pt-16 md:pt-20 flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-4 border-accent-primary/30 border-t-accent-primary"></div>
            <div className="text-accent-primary font-medium text-lg">Loading article...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-bg-primary">
        <Navbar />
        <div className="pt-16 md:pt-20 flex justify-center items-center min-h-screen px-4">
          <div className="text-center max-w-md bg-bg-secondary/50 backdrop-blur-xl rounded-2xl p-8 border border-accent-error/20">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent-error/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-accent-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="text-accent-error text-lg font-medium mb-6">{error || 'Article not found'}</div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-medium rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <ToastContainer />
      
      {/* Full Width Hero Section with Image */}
      <div className="pt-16 md:pt-20">
        {article.image && (
          <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 via-transparent to-accent-secondary/20"></div>
            
            {/* Floating Animation Elements */}
            <div className="absolute top-10 left-10 w-2 h-2 bg-accent-primary rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-20 right-20 w-3 h-3 bg-accent-secondary rounded-full animate-bounce opacity-40"></div>
            <div className="absolute bottom-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            
            {/* Category Badge */}
            {article.category && (
              <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
                <div className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-accent-primary via-accent-primary to-accent-secondary text-white rounded-full font-bold text-sm md:text-base shadow-2xl backdrop-blur-md border border-white/20 animate-fadeInLeft">
                  {article.category}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Container */}
        <div className="relative -mt-20 md:-mt-32 z-10">
          <div className="px-4 sm:px-6 lg:px-8 w-full">
            


            {/* Main Article Card */}
            <article className="bg-gradient-to-br from-bg-secondary/95 via-bg-secondary/90 to-bg-tertiary/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-accent-primary/20 overflow-hidden relative max-w-7xl mx-auto">
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5"></div>
              </div>

              <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-16">
                
                {/* Article Header */}
                <header className="mb-10 md:mb-12">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-2xl animate-fadeInUp">
                    {article.title}
                  </h1>
                  
                  {/* Decorative Elements */}
                  <div className="flex items-center gap-4 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    <div className="h-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex-1 max-w-24 animate-pulse"></div>
                    <div className="w-3 h-3 bg-accent-primary rounded-full animate-bounce"></div>
                    <div className="h-1 bg-gradient-to-r from-accent-secondary to-accent-primary rounded-full flex-1 max-w-24 animate-pulse"></div>
                  </div>

                  {/* Enhanced Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    {article.sourceName && (
                      <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-cyan-500/20 rounded-2xl border border-blue-400/30 shadow-lg backdrop-blur-sm group hover:scale-105 transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-blue-300 font-medium">Source</div>
                          <div className="text-blue-200 font-bold">{article.sourceName}</div>
                        </div>
                      </div>
                    )}
                    
                    {article.publishedAt && (
                      <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500/20 via-green-400/15 to-emerald-500/20 rounded-2xl border border-green-400/30 shadow-lg backdrop-blur-sm group hover:scale-105 transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-green-300 font-medium">Published</div>
                          <div className="text-green-200 font-bold">{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </header>

                {/* Article Summary */}
                {article.description && (
                  <section className="mb-10 md:mb-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-purple-300">Article Summary</h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mt-1"></div>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 bg-gradient-to-br from-purple-500/15 via-purple-400/10 to-pink-500/15 rounded-3xl border border-purple-400/25 backdrop-blur-md shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <p className="text-text-secondary leading-relaxed text-base md:text-lg lg:text-xl font-medium relative z-10">
                        {article.description}
                      </p>
                    </div>
                  </section>
                )}

                {/* Full Article Content */}
                {article.content && (
                  <section className="mb-10 md:mb-12 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-orange-300">Full Article</h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 mt-1"></div>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 bg-gradient-to-br from-orange-500/15 via-orange-400/10 to-red-500/15 rounded-3xl border border-orange-400/25 backdrop-blur-md shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="prose prose-invert prose-lg max-w-none relative z-10">
                        <div className="space-y-6">
                          {article.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="text-text-secondary leading-8 text-base md:text-lg first-letter:text-2xl first-letter:font-bold first-letter:text-accent-primary">
                                {paragraph}
                              </p>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Enhanced Footer */}
                <footer className="pt-8 md:pt-10 border-t border-gradient-to-r border-accent-primary/20 animate-fadeInUp" style={{ animationDelay: '1s' }}>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    
                    {/* Reading Time */}
                    <div className="flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-teal-500/20 via-teal-400/15 to-cyan-500/20 rounded-2xl border border-teal-400/30 shadow-lg backdrop-blur-sm group hover:scale-105 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs text-teal-300 font-medium">Reading Time</div>
                        <div className="text-teal-200 font-bold">
                          {article.content 
                            ? `${Math.max(1, Math.round(article.content.split(' ').length / 200))} min read`
                            : '2 min read'
                          }
                        </div>
                      </div>
                    </div>
                    
                    {/* Share Button */}
                    <button 
                      onClick={() => {
                        const currentUrl = window.location.href;
                        navigator.clipboard.writeText(currentUrl).then(() => {
                          toast.success('Link copied to clipboard! Share it anywhere you like.', {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            className: "custom-toast",
                          });
                        }).catch(err => {
                          console.error('Failed to copy URL:', err);
                          const textArea = document.createElement('textarea');
                          textArea.value = currentUrl;
                          document.body.appendChild(textArea);
                          textArea.select();
                          document.execCommand('copy');
                          document.body.removeChild(textArea);
                          
                          toast.success('🎉 Link copied to clipboard! Share it anywhere you like.', {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          });
                        });
                      }}
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-primary/25 via-accent-primary/20 to-accent-secondary/25 text-accent-primary rounded-2xl font-bold hover:from-accent-primary hover:to-accent-secondary hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl border border-accent-primary/40 backdrop-blur-sm group"
                    >
                      <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span>Share Article</span>
                    </button>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;