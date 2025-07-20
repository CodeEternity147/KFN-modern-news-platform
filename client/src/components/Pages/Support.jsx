import React, { useState } from 'react';

const Support = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const supportCategories = [
    { id: 'general', title: 'General', icon: '❓' },
    { id: 'technical', title: 'Technical', icon: '⚙️' },
    { id: 'content', title: 'Content', icon: '📝' },
    { id: 'privacy', title: 'Privacy', icon: '🔒' }
  ];

  const faqData = {
    general: [
      {
        question: "What is K.LIVE?",
        answer: "K.LIVE is a comprehensive news platform that provides breaking news, in-depth analysis, and stories from around the world. We're committed to delivering accurate, unbiased journalism to keep you informed."
      },
      {
        question: "How often is content updated?",
        answer: "Our newsroom operates 24/7, with breaking news updated in real-time and regular articles published throughout the day. We ensure you stay informed with the latest developments as they happen."
      },
      {
        question: "Can I customize my news feed?",
        answer: "Yes! You can personalize your experience by selecting preferred topics, regions, and news categories in your account settings."
      }
    ],
   
    technical: [
      {
        question: "The website is loading slowly. What can I do?",
        answer: "Try clearing your browser cache, disabling browser extensions, or switching to a different browser. If issues persist, contact our technical support team."
      },
      {
        question: "Why can't I view certain articles?",
        answer: "Some articles may require a subscription or may be geo-restricted. Check your subscription status or try accessing from a different location."
      },
      {
        question: "How do I report a bug or technical issue?",
        answer: "Use our contact form and select 'Technical Support' as the category. Please include details about your device, browser, and the specific issue you're experiencing."
      }
    ],
   
    content: [
      {
        question: "How do I submit a news tip?",
        answer: "Use our contact form and select 'News Tip' as the subject. Provide as much detail as possible, and our editorial team will review your submission."
      },
      {
        question: "Can I republish K.LIVE articles?",
        answer: "Please review our content licensing terms or contact our editorial team for permission to republish our content."
      },
      {
        question: "How do I report inaccurate information?",
        answer: "We take accuracy seriously. Use our contact form to report any inaccuracies, and our editorial team will investigate and make corrections as needed."
      }
    ],
    privacy: [
      {
        question: "How is my personal data protected?",
        answer: "We use industry-standard encryption and security measures to protect your data. Please review our Privacy Policy for detailed information."
      },
      {
        question: "How do I delete my account?",
        answer: "Contact our privacy team through the contact form, and we'll permanently delete your account and associated data within 30 days."
      },
      {
        question: "Do you share my data with third parties?",
        answer: "We do not sell your personal data. We only share information with trusted service providers as outlined in our Privacy Policy."
      }
    ]
  };

  const supportInfo = [
    {
      title: "Help Documentation",
      description: "Comprehensive guides and tutorials to help you navigate K.LIVE",
      availability: "Available 24/7",
      icon: "📚",
      color: "var(--gradient-primary)"
    },
    {
      title: "Knowledge Base",
      description: "Find detailed articles about features, troubleshooting, and best practices",
      availability: "Regularly Updated",
      icon: "💡",
      color: "var(--gradient-secondary)"
    },
    {
      title: "Community Guidelines",
      description: "Learn about our community standards and content policies",
      availability: "Always Accessible",
      icon: "📋",
      color: "var(--gradient-primary)"
    }
  ];

  const filteredFAQs = faqData[activeCategory]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg-primary)'}}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{background: 'var(--gradient-hero)'}}></div>
        <div className="relative z-10 text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{color: 'var(--text-primary)'}}>
            Support <span style={{background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Center</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl animate-fade-in-up-delay" style={{color: 'var(--text-secondary)'}}>
            Find answers to common questions, learn about our features, and discover helpful resources to enhance your K.LIVE experience.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up-delay-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-lg transition-all duration-300 focus:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <span style={{color: 'var(--text-muted)'}} className="text-xl">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Support Information Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportInfo.map((info, index) => (
            <div
              key={index}
              className="support-info-card rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center" 
                   style={{background: info.color}}>
                <span className="text-2xl">{info.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                {info.title}
              </h3>
              <p className="mb-4 leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                {info.description}
              </p>
              <p className="text-sm font-medium" style={{color: 'var(--accent-primary)'}}>
                {info.availability}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{color: 'var(--text-primary)'}}>
            Frequently Asked Questions
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {supportCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
                  activeCategory === category.id ? 'active-tab' : ''
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                  color: activeCategory === category.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: activeCategory === category.id ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {filteredFAQs?.map((faq, index) => (
                <div
                  key={index}
                  className="faq-item rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    style={{color: 'var(--text-primary)'}}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <span className={`text-xl transition-transform duration-300 ${openFAQ === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4 animate-fade-in-up">
                      <div className="pt-2 border-t border-gray-600">
                        <p style={{color: 'var(--text-secondary)'}} className="leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredFAQs?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text-primary)'}}>
                  No results found
                </h3>
                <p style={{color: 'var(--text-secondary)'}}>
                  Try adjusting your search terms or browse different categories.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Topics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--text-primary)'}}>
            Popular Help Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Getting Started Guide", description: "Learn the basics of using K.LIVE and navigating our platform", icon: "🚀" },
              { title: "Reading Experience", description: "Discover features to enhance your news reading experience", icon: "📖" },
              { title: "News Categories", description: "Understand our content organization and topic coverage", icon: "📂" },
              { title: "Content Guidelines", description: "Our editorial standards and content quality policies", icon: "📋" },
              { title: "Privacy & Security", description: "Learn how we protect your information and maintain privacy", icon: "🛡️" },
              { title: "Accessibility Features", description: "Tools and options to make K.LIVE accessible for everyone", icon: "♿" }
            ].map((topic, index) => (
              <div
                key={index}
                className="help-topic-card p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="text-3xl mb-3">{topic.icon}</div>
                <h3 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>
                  {topic.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{color: 'var(--text-muted)'}}>
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--text-primary)'}}>
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="resource-card rounded-2xl p-8" 
                 style={{
                   backgroundColor: 'var(--bg-secondary)',
                   boxShadow: 'var(--shadow-sm)',
                   border: '1px solid rgba(255, 255, 255, 0.08)'
                 }}>
              <h3 className="text-xl font-semibold mb-4" style={{color: 'var(--accent-primary)'}}>
                📚 User Guide
              </h3>
              <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                Comprehensive documentation covering all features and functionalities of K.LIVE. 
                From basic navigation to advanced customization options.
              </p>
              <ul className="space-y-2 text-sm" style={{color: 'var(--text-muted)'}}>
                <li>• Platform overview and navigation</li>
                <li>• Customizing your reading preferences</li>
                <li>• Understanding news categories</li>
                <li>• Managing notifications</li>
              </ul>
            </div>

            <div className="resource-card rounded-2xl p-8" 
                 style={{
                   backgroundColor: 'var(--bg-secondary)',
                   boxShadow: 'var(--shadow-sm)',
                   border: '1px solid rgba(255, 255, 255, 0.08)'
                 }}>
              <h3 className="text-xl font-semibold mb-4" style={{color: 'var(--accent-primary)'}}>
                🔧 Troubleshooting
              </h3>
              <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                Quick solutions to common issues and technical problems you might encounter 
                while using K.LIVE across different devices and browsers.
              </p>
              <ul className="space-y-2 text-sm" style={{color: 'var(--text-muted)'}}>
                <li>• Browser compatibility issues</li>
                <li>• Loading and performance problems</li>
                <li>• Mobile app troubleshooting</li>
                <li>• Account access issues</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support CTA */}
        <div className="text-center">
          <div className="rounded-2xl p-8" 
               style={{
                 background: 'var(--gradient-hero)', 
                 border: '1px solid rgba(255, 255, 255, 0.1)'
               }}>
            <h3 className="text-3xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
              Still Need Help?
            </h3>
            <p className="mb-8 text-lg" style={{color: 'var(--text-secondary)'}}>
              Can't find what you're looking for? Our support team is ready to assist you with any questions or concerns.
            </p>
            <button 
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: 'var(--gradient-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => window.location.href = '/contact'}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;