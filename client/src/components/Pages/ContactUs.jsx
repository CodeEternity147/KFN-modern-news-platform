import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg-primary)'}}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{background: 'var(--gradient-hero)'}}></div>
        <div className="relative z-10 text-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{color: 'var(--text-primary)'}}>
            Contact <span style={{background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>KFN</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl animate-fade-in-up-delay" style={{color: 'var(--text-secondary)'}}>
            Get in touch with our team. We'd love to hear from you and answer any questions you may have.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="rounded-2xl p-8 transition-all duration-300" 
                 style={{
                   backgroundColor: 'var(--bg-secondary)', 
                   boxShadow: 'var(--shadow-md)',
                   border: '1px solid rgba(255, 255, 255, 0.1)'
                 }}>
              <h2 className="text-3xl font-bold mb-8" style={{color: 'var(--text-primary)'}}>Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--text-secondary)'}}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--text-secondary)'}}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--text-secondary)'}}>
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="news-tip">News Tip</option>
                    <option value="press">Press Release</option>
                    <option value="partnership">Partnership</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-medium mb-2" style={{color: 'var(--text-secondary)'}}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 focus:scale-[1.02] resize-none"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'var(--gradient-primary)',
                    color: 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info-container">
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="contact-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1" 
                   style={{
                     backgroundColor: 'var(--bg-secondary)', 
                     boxShadow: 'var(--shadow-sm)',
                     border: '1px solid rgba(255, 255, 255, 0.08)'
                   }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" 
                       style={{background: 'var(--gradient-primary)'}}>
                    <span style={{color: 'var(--text-primary)'}} className="font-bold text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{color: 'var(--text-primary)'}}>Email Us</h3>
                    <p style={{color: 'var(--text-muted)'}}>Send us an email anytime</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p style={{color: 'var(--accent-primary)'}} className="font-medium">contact@kfn.com</p>
                  <p style={{color: 'var(--text-secondary)'}} className="text-sm">newsroom@kfn.com</p>
                </div>
              </div>

              <div className="contact-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 animation-delay-200" 
                   style={{
                     backgroundColor: 'var(--bg-secondary)', 
                     boxShadow: 'var(--shadow-sm)',
                     border: '1px solid rgba(255, 255, 255, 0.08)'
                   }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" 
                       style={{background: 'var(--gradient-secondary)'}}>
                    <span style={{color: 'var(--text-primary)'}} className="font-bold text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{color: 'var(--text-primary)'}}>Call Us</h3>
                    <p style={{color: 'var(--text-muted)'}}>Mon-Fri from 8am to 5pm</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p style={{color: 'var(--accent-primary)'}} className="font-medium">+1 (555) 123-4567</p>
                  <p style={{color: 'var(--text-secondary)'}} className="text-sm">Newsroom: +1 (555) 123-4568</p>
                </div>
              </div>

              <div className="contact-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 animation-delay-400" 
                   style={{
                     backgroundColor: 'var(--bg-secondary)', 
                     boxShadow: 'var(--shadow-sm)',
                     border: '1px solid rgba(255, 255, 255, 0.08)'
                   }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" 
                       style={{background: 'var(--gradient-primary)'}}>
                    <span style={{color: 'var(--text-primary)'}} className="font-bold text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold" style={{color: 'var(--text-primary)'}}>Visit Us</h3>
                    <p style={{color: 'var(--text-muted)'}}>Come say hello at our office HQ</p>
                  </div>
                </div>
                <div className="ml-16">
                  <p style={{color: 'var(--text-secondary)'}}>123 News Street</p>
                  <p style={{color: 'var(--text-secondary)'}}>Media City, MC 12345</p>
                  <p style={{color: 'var(--text-secondary)'}}>United States</p>
                </div>
              </div>

              {/* Response Time */}
              <div className="rounded-xl p-6 text-center" 
                   style={{
                     backgroundColor: 'var(--bg-tertiary)', 
                     border: '1px solid rgba(255, 255, 255, 0.12)'
                   }}>
                <h3 className="text-lg font-semibold mb-2" style={{color: 'var(--text-primary)'}}>
                  Quick Response Guarantee
                </h3>
                <p style={{color: 'var(--text-secondary)'}}>
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;