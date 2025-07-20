import React, { useState, useEffect } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Information' },
    { id: 'cookies', title: 'Cookies & Tracking' },
    { id: 'data-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'children-privacy', title: 'Children\'s Privacy' },
    { id: 'policy-changes', title: 'Policy Updates' },
    { id: 'contact-privacy', title: 'Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg-primary)'}}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{background: 'var(--gradient-hero)'}}></div>
        <div className="relative z-10 text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{color: 'var(--text-primary)'}}>
            Privacy <span style={{background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Policy</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl animate-fade-in-up-delay" style={{color: 'var(--text-secondary)'}}>
            Your privacy matters to us. Learn how we collect, use, and protect your personal information.
          </p>
          <div className="mt-8 animate-fade-in-up-delay-2">
            <p className="text-sm" style={{color: 'var(--text-muted)'}}>
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="rounded-2xl p-6" 
                   style={{
                     backgroundColor: 'var(--bg-secondary)', 
                     boxShadow: 'var(--shadow-md)',
                     border: '1px solid rgba(255, 255, 255, 0.1)'
                   }}>
                <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--text-primary)'}}>
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                        activeSection === section.id ? 'bg-gradient-primary' : ''
                      }`}
                      style={{
                        color: activeSection === section.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                        backgroundColor: activeSection === section.id ? 'transparent' : 'transparent'
                      }}
                    >
                      <span className="text-sm">{index + 1}. {section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-12">
              
              {/* Introduction */}
              <section className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--accent-primary)'}}>
                  Introduction
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  Welcome to K.LIVE. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, and safeguard your information when you visit 
                  our website or use our services.
                </p>
                <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                  By using K.LIVE, you agree to the collection and use of information in accordance with this policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="information-collection" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  1. Information We Collect
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Personal Information
                    </h3>
                    <ul className="space-y-2 ml-4" style={{color: 'var(--text-secondary)'}}>
                      <li>• Name and email address when you subscribe to our newsletter</li>
                      <li>• Contact information when you reach out to us</li>
                      <li>• Account information if you create a user profile</li>
                      <li>• Comments and feedback you provide</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Usage Information
                    </h3>
                    <ul className="space-y-2 ml-4" style={{color: 'var(--text-secondary)'}}>
                      <li>• IP address and device information</li>
                      <li>• Browser type and version</li>
                      <li>• Pages visited and time spent on site</li>
                      <li>• Referring website information</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section id="information-use" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  2. How We Use Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full mt-1" style={{backgroundColor: 'var(--accent-primary)'}}></div>
                      <div>
                        <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Content Delivery</h4>
                        <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                          To provide you with news content and personalized experiences
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full mt-1" style={{backgroundColor: 'var(--accent-secondary)'}}></div>
                      <div>
                        <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Communication</h4>
                        <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                          To send newsletters, updates, and respond to inquiries
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full mt-1" style={{backgroundColor: 'var(--accent-primary)'}}></div>
                      <div>
                        <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Analytics</h4>
                        <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                          To analyze usage patterns and improve our services
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full mt-1" style={{backgroundColor: 'var(--accent-secondary)'}}></div>
                      <div>
                        <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Security</h4>
                        <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                          To protect against fraud and maintain site security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  3. Cookies & Tracking Technologies
                </h2>
                <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  Cookies help us remember your preferences and understand how you use our site.
                </p>
                <div className="rounded-xl p-4" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                  <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Types of Cookies We Use:</h4>
                  <ul className="space-y-1" style={{color: 'var(--text-muted)'}}>
                    <li>• Essential cookies for site functionality</li>
                    <li>• Analytics cookies to understand user behavior</li>
                    <li>• Preference cookies to remember your settings</li>
                  </ul>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  4. Information Sharing
                </h2>
                <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  We do not sell, trade, or rent your personal information to third parties. We may share 
                  information only in the following circumstances:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Service Providers</h4>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                      With trusted partners who help us operate our website
                    </p>
                  </div>
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Legal Requirements</h4>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                      When required by law or to protect our rights
                    </p>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section id="data-security" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  5. Data Security
                </h2>
                <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" 
                         style={{background: 'var(--gradient-primary)'}}>
                      <span style={{color: 'var(--text-primary)'}} className="font-bold">🔒</span>
                    </div>
                    <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Encryption</h4>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>SSL encryption for data transmission</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" 
                         style={{background: 'var(--gradient-secondary)'}}>
                      <span style={{color: 'var(--text-primary)'}} className="font-bold">🛡️</span>
                    </div>
                    <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Protection</h4>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>Regular security audits and updates</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" 
                         style={{background: 'var(--gradient-primary)'}}>
                      <span style={{color: 'var(--text-primary)'}} className="font-bold">👥</span>
                    </div>
                    <h4 className="font-semibold" style={{color: 'var(--text-primary)'}}>Access Control</h4>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>Limited access to authorized personnel</p>
                  </div>
                </div>
              </section>

              {/* User Rights */}
              <section id="user-rights" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  6. Your Rights
                </h2>
                <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
                  You have certain rights regarding your personal information. You can:
                </p>
                <div className="space-y-3">
                  {[
                    'Access the personal information we hold about you',
                    'Request correction of inaccurate information',
                    'Request deletion of your personal information',
                    'Opt-out of marketing communications',
                    'Request data portability'
                  ].map((right, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" 
                           style={{backgroundColor: 'var(--accent-primary)'}}>
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span style={{color: 'var(--text-secondary)'}}>{right}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Children's Privacy */}
              <section id="children-privacy" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  7. Children's Privacy
                </h2>
                <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                  Our service is not directed to children under 13. We do not knowingly collect personal 
                  information from children under 13. If you are a parent or guardian and believe your 
                  child has provided us with personal information, please contact us.
                </p>
              </section>

              {/* Policy Changes */}
                           <section id="policy-changes" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  8. Policy Updates
                </h2>
                <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new privacy policy on this page and updating the "Last updated" date.
                </p>
                <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                    <strong style={{color: 'var(--text-primary)'}}>Important:</strong> We encourage you to review 
                    this privacy policy periodically to stay informed about how we protect your information.
                  </p>
                </div>
              </section>

              {/* Contact Privacy */}
              <section id="contact-privacy" className="policy-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  9. Contact Us About Privacy
                </h2>
                <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
                  If you have any questions about this privacy policy or our privacy practices, 
                  please contact us using the information below:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Privacy Officer
                    </h4>
                    <div className="space-y-2 text-sm" style={{color: 'var(--text-secondary)'}}>
                      <p>📧 privacy@klive.news</p>
                      <p>📞 +1 (555) 123-4567</p>
                      <p>📍 123 News Street, Media City, MC 12345</p>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-xl" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Response Time
                    </h4>
                    <p className="text-sm" style={{color: 'var(--text-secondary)'}}>
                      We typically respond to privacy-related inquiries within 
                      <span style={{color: 'var(--accent-primary)'}} className="font-semibold"> 48 hours</span> during business days.
                    </p>
                  </div>
                </div>
              </section>

              {/* Footer CTA */}
              <section className="text-center py-12">
                <div className="rounded-2xl p-8" 
                     style={{
                       background: 'var(--gradient-hero)', 
                       border: '1px solid rgba(255, 255, 255, 0.1)'
                     }}>
                  <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
                    Questions About Our Privacy Policy?
                  </h3>
                  <p className="mb-6" style={{color: 'var(--text-secondary)'}}>
                    We're here to help. Contact our privacy team for any concerns or clarifications.
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
                    Contact Privacy Team
                  </button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;