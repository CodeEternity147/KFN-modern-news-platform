import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  // Newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail('');
    }
  };

  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect for copyright
  useEffect(() => {
    const text = '© 2024 News Hub. All rights reserved.';
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-16">
      {/* Newsletter CTA Section */}
      <div className="bg-gradient-to-r from-accent-primary to-accent-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Latest News
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get the latest news delivered to your inbox. No spam, just quality content.
            </p>
            
            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 smooth-transition"
                  required
                />
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-full font-semibold smooth-transition ${
                    isSubscribed 
                      ? 'bg-accent-success text-bg-primary' 
                      : 'bg-white text-accent-primary hover:bg-white/90'
                  }`}
                >
                  {isSubscribed ? (
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Subscribed!</span>
                    </span>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-bg-primary text-text-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-columns grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gradient">News Hub</span>
              </div>
              <p className="text-text-secondary leading-relaxed">
                Your trusted source for the latest news, insights, and stories that matter. 
                Stay informed with our comprehensive coverage.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="social-hover p-3 rounded-full bg-bg-secondary hover:bg-accent-primary smooth-transition group">
                  <svg className="w-5 h-5 text-text-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-hover p-3 rounded-full bg-bg-secondary hover:bg-accent-primary smooth-transition group">
                  <svg className="w-5 h-5 text-text-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-hover p-3 rounded-full bg-bg-secondary hover:bg-accent-primary smooth-transition group">
                  <svg className="w-5 h-5 text-text-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-hover p-3 rounded-full bg-bg-secondary hover:bg-accent-primary smooth-transition group">
                  <svg className="w-5 h-5 text-text-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Latest News</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Technology</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Business</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Sports</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Entertainment</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Health</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">Categories</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Politics</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Science</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">World</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Opinion</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Analysis</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Editorials</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-text-primary">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Contact Us</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">About Us</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Privacy Policy</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Terms of Service</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Cookie Policy</a></li>
                <li><a href="#" className="text-text-secondary hover:text-accent-primary smooth-transition">Help Center</a></li>
              </ul>
            </div>
          </div>

          {/* Separator */}
          <div className="mt-12 pt-8 border-t border-bg-tertiary">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="typewriter text-text-muted text-sm">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </div>
              <div className="flex items-center space-x-6 text-text-muted text-sm">
                <span>Made with ❤️ for news lovers</span>
                <span>•</span>
                <span>Version 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`back-to-top fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient text-white shadow-lg hover:shadow-xl smooth-transition ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer; 