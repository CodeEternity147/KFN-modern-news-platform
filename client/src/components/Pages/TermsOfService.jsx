import React, { useState, useEffect } from 'react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'use-of-service', title: 'Use of Service' },
    { id: 'user-accounts', title: 'User Accounts' },
    { id: 'content-rights', title: 'Content & Rights' },
    { id: 'user-conduct', title: 'User Conduct' },
    { id: 'privacy', title: 'Privacy' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'liability', title: 'Limitation of Liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'changes', title: 'Changes to Terms' },
    { id: 'contact-terms', title: 'Contact Information' }
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
            Terms of <span style={{background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Service</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl animate-fade-in-up-delay" style={{color: 'var(--text-secondary)'}}>
            Please read these terms of service carefully before using K.LIVE. By accessing our platform, you agree to these terms.
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
              <section className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-4" style={{color: 'var(--accent-primary)'}}>
                  Introduction
                </h2>
                <p className="text-lg leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  Welcome to K.LIVE. These Terms of Service ("Terms") govern your use of our website, mobile application, 
                  and any related services (collectively, the "Service") operated by K.LIVE ("us", "we", or "our").
                </p>
                <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                  By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any 
                  part of these terms, then you may not access the Service.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section id="acceptance" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  1. Acceptance of Terms
                </h2>
                <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  By accessing and using K.LIVE, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                    <strong style={{color: 'var(--text-primary)'}}>Important:</strong> If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </div>
              </section>

              {/* Use of Service */}
              <section id="use-of-service" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  2. Use of Service
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Permitted Use
                    </h3>
                    <ul className="space-y-2 ml-4" style={{color: 'var(--text-secondary)'}}>
                      <li>• Access and read news articles and content</li>
                      <li>• Share articles through approved social media channels</li>
                      <li>• Create an account to personalize your experience</li>
                      <li>• Subscribe to newsletters and notifications</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Prohibited Use
                    </h3>
                    <ul className="space-y-2 ml-4" style={{color: 'var(--text-secondary)'}}>
                      <li>• Reproduce, distribute, or display content without permission</li>
                      <li>• Use automated systems to access the service</li>
                      <li>• Attempt to gain unauthorized access to our systems</li>
                      <li>• Interfere with or disrupt the service</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* User Accounts */}
              <section id="user-accounts" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  3. User Accounts
                </h2>
                <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Your Responsibilities</h4>
                    <ul className="text-sm space-y-1" style={{color: 'var(--text-muted)'}}>
                      <li>• Maintain account security</li>
                      <li>• Keep information up to date</li>
                      <li>• Notify us of unauthorized access</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Our Rights</h4>
                    <ul className="text-sm space-y-1" style={{color: 'var(--text-muted)'}}>
                      <li>• Suspend accounts for violations</li>
                      <li>• Require verification of information</li>
                      <li>• Terminate accounts at our discretion</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Content and Rights */}
              <section id="content-rights" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  4. Content and Intellectual Property Rights
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      Our Content
                    </h3>
                    <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                      The Service and its original content, features, and functionality are and will remain the exclusive 
                      property of K.LIVE and its licensors. The service is protected by copyright, trademark, and other laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                      User-Generated Content
                    </h3>
                    <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                      By submitting content to us (comments, feedback, suggestions), you grant us a non-exclusive, 
                      worldwide, perpetual license to use, reproduce, modify, and display such content.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Conduct */}
              <section id="user-conduct" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  5. User Conduct
                </h2>
                <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
                  You agree not to use the Service for any unlawful purpose or in any way that could damage, 
                  disable, or impair the Service.
                </p>
                <div className="space-y-4">
                  {[
                    'Violate any applicable laws or regulations',
                    'Transmit harmful, offensive, or inappropriate content',
                    'Impersonate any person or entity',
                    'Collect personal information from other users',
                    'Spam or send unsolicited communications'
                  ].map((conduct, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" 
                           style={{backgroundColor: 'var(--accent-error)'}}>
                        <span className="text-white text-xs">✗</span>
                      </div>
                      <span style={{color: 'var(--text-secondary)'}}>{conduct}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Privacy */}
              <section id="privacy" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  6. Privacy
                </h2>
                <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
                  to understand our practices.
                </p>
                <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                    Our Privacy Policy explains how we collect, use, and protect your information when you use our Service.
                  </p>
                </div>
              </section>

              {/* Disclaimers */}
              <section id="disclaimers" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  7. Disclaimers
                </h2>
                <div className="space-y-4">
                  <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
                    The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                    this Company excludes all representations, warranties, conditions and terms.
                  </p>
                  <div className="p-4 rounded-lg border-l-4" style={{backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--accent-warning)'}}>
                    <p className="text-sm font-medium" style={{color: 'var(--accent-warning)'}}>
                      Notice: While we strive for accuracy, we cannot guarantee that all information is completely accurate, 
                      complete, or up-to-date at all times.
                    </p>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="terms-section rounded-2xl p-8" 
                       style={{
                         backgroundColor: 'var(--bg-secondary)', 
                         boxShadow: 'var(--shadow-sm)',
                         border: '1px solid rgba(255, 255, 255, 0.08)'
                       }}>
                <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
                  8. Limitation of Liability
                </h2>
                <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
                  In no event shall K.LIVE, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Covered Damages</h4>
                    <ul className="text-sm space-y-1" style={{color: 'var(--text-muted)'}}>
                      <li>• Loss of profits</li>
                      <li>• Loss of data</li>
                      <li>• Business interruption</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
                    <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Maximum Liability</h4>
                    <p className="text-sm" style={{color: 'var(--text-muted)'}}>
                      Our total liability shall not exceed the amount paid by you, if any, for accessing the Service.
                    </p>
                  </div>
                </div>
                </section>

{/* Termination */}
<section id="termination" className="terms-section rounded-2xl p-8" 
         style={{
           backgroundColor: 'var(--bg-secondary)', 
           boxShadow: 'var(--shadow-sm)',
           border: '1px solid rgba(255, 255, 255, 0.08)'
         }}>
  <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
    9. Termination
  </h2>
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
        By You
      </h3>
      <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
        You may terminate your account at any time by contacting us or using the account deletion 
        feature in your account settings.
      </p>
    </div>
    
    <div>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
        By Us
      </h3>
      <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
        We may terminate or suspend your account immediately, without prior notice or liability, 
        for any reason whatsoever, including without limitation if you breach the Terms.
      </p>
      <div className="p-4 rounded-lg" style={{backgroundColor: 'var(--bg-tertiary)'}}>
        <p className="text-sm" style={{color: 'var(--text-muted)'}}>
          Upon termination, your right to use the Service will cease immediately, but these Terms 
          will remain in effect regarding any use of the Service prior to termination.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Changes to Terms */}
<section id="changes" className="terms-section rounded-2xl p-8" 
         style={{
           backgroundColor: 'var(--bg-secondary)', 
           boxShadow: 'var(--shadow-sm)',
           border: '1px solid rgba(255, 255, 255, 0.08)'
         }}>
  <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
    10. Changes to Terms
  </h2>
  <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
    If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
  </p>
  <div className="grid md:grid-cols-3 gap-4">
    <div className="text-center p-4">
      <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" 
           style={{background: 'var(--gradient-primary)'}}>
        <span style={{color: 'var(--text-primary)'}} className="font-bold">📧</span>
      </div>
      <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Email Notification</h4>
      <p className="text-sm" style={{color: 'var(--text-muted)'}}>We'll notify you via email about significant changes</p>
    </div>
    <div className="text-center p-4">
      <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" 
           style={{background: 'var(--gradient-secondary)'}}>
        <span style={{color: 'var(--text-primary)'}} className="font-bold">🌐</span>
      </div>
      <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>Website Update</h4>
      <p className="text-sm" style={{color: 'var(--text-muted)'}}>Updated terms will be posted on this page</p>
    </div>
    <div className="text-center p-4">
      <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center" 
           style={{background: 'var(--gradient-primary)'}}>
        <span style={{color: 'var(--text-primary)'}} className="font-bold">📅</span>
      </div>
      <h4 className="font-semibold mb-2" style={{color: 'var(--text-primary)'}}>30-Day Notice</h4>
      <p className="text-sm" style={{color: 'var(--text-muted)'}}>Advance notice for material changes</p>
    </div>
  </div>
</section>

{/* Contact Information */}
<section id="contact-terms" className="terms-section rounded-2xl p-8" 
         style={{
           backgroundColor: 'var(--bg-secondary)', 
           boxShadow: 'var(--shadow-sm)',
           border: '1px solid rgba(255, 255, 255, 0.08)'
         }}>
  <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
    11. Contact Information
  </h2>
  <p className="leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
    If you have any questions about these Terms of Service, please contact us using the information below:
  </p>
  
  <div className="grid md:grid-cols-2 gap-6">
    <div className="p-6 rounded-xl" style={{backgroundColor: 'var(--bg-tertiary)'}}>
      <h4 className="font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
        Legal Department
      </h4>
      <div className="space-y-2 text-sm" style={{color: 'var(--text-secondary)'}}>
        <p>📧 legal@klive.news</p>
        <p>📞 +1 (555) 123-4567</p>
        <p>📍 123 News Street, Media City, MC 12345</p>
        <p>🌐 United States</p>
      </div>
    </div>
    
    <div className="p-6 rounded-xl" style={{backgroundColor: 'var(--bg-tertiary)'}}>
      <h4 className="font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
        Business Hours
      </h4>
      <div className="space-y-2 text-sm" style={{color: 'var(--text-secondary)'}}>
        <p>📅 Monday - Friday: 9:00 AM - 6:00 PM EST</p>
        <p>📅 Saturday: 10:00 AM - 4:00 PM EST</p>
        <p>📅 Sunday: Closed</p>
        <p>⚡ Emergency legal matters: 24/7</p>
      </div>
    </div>
  </div>
</section>

{/* Governing Law */}
<section className="terms-section rounded-2xl p-8" 
         style={{
           backgroundColor: 'var(--bg-secondary)', 
           boxShadow: 'var(--shadow-sm)',
           border: '1px solid rgba(255, 255, 255, 0.08)'
         }}>
  <h2 className="text-2xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>
    12. Governing Law
  </h2>
  <p className="leading-relaxed mb-4" style={{color: 'var(--text-secondary)'}}>
    These Terms shall be interpreted and governed by the laws of the State of [Your State], United States, 
    without regard to its conflict of law provisions.
  </p>
  <p className="leading-relaxed" style={{color: 'var(--text-secondary)'}}>
    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
  </p>
</section>

{/* Footer Acknowledgment */}
<section className="text-center py-12">
  <div className="rounded-2xl p-8" 
       style={{
         background: 'var(--gradient-hero)', 
         border: '1px solid rgba(255, 255, 255, 0.1)'
       }}>
    <h3 className="text-2xl font-bold mb-4" style={{color: 'var(--text-primary)'}}>
      Questions About These Terms?
    </h3>
    <p className="mb-6" style={{color: 'var(--text-secondary)'}}>
      If you have any questions or concerns about these Terms of Service, our legal team is here to help.
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
      Contact Legal Team
    </button>
    
    <div className="mt-8 pt-6 border-t border-gray-600">
      <p className="text-sm" style={{color: 'var(--text-muted)'}}>
        By continuing to use K.LIVE, you acknowledge that you have read, understood, 
        and agree to be bound by these Terms of Service.
      </p>
    </div>
  </div>
</section>

</div>
</div>
</div>
</div>
</div>
);
};

export default TermsOfService;