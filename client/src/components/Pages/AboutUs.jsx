import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg-primary)'}}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{background: 'var(--gradient-hero)'}}></div>
        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up" style={{color: 'var(--text-primary)'}}>
            About <span style={{background: 'var(--gradient-primary)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>KFN</span>
          </h1>
          <p className="max-w-3xl text-xl text-center leading-relaxed animate-fade-in-up-delay" style={{color: 'var(--text-secondary)'}}>
            Your trusted source for breaking news, in-depth analysis, and stories that shape our world.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="mb-20">
          <div className="rounded-2xl p-8 md:p-12 transition-all duration-300 hover:scale-[1.02]" 
               style={{
                 backgroundColor: 'var(--bg-secondary)', 
                 boxShadow: 'var(--shadow-md)',
                 border: '1px solid rgba(255, 255, 255, 0.1)'
               }}>
            <h2 className="text-3xl font-bold mb-6" style={{color: 'var(--accent-primary)'}}>Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>
              At KFN, we believe in the power of information to transform communities and empower individuals. 
              Our mission is to deliver accurate, unbiased, and timely news coverage that keeps you informed 
              about the events that matter most.
            </p>
            <p className="text-lg leading-relaxed" style={{color: 'var(--text-secondary)'}}>
              We are committed to journalistic integrity, transparency, and providing multiple perspectives 
              on complex issues to help our readers make informed decisions.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="value-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-2" 
               style={{
                 backgroundColor: 'var(--bg-secondary)', 
                 boxShadow: 'var(--shadow-sm)',
                 border: '1px solid rgba(255, 255, 255, 0.08)'
               }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                 style={{background: 'var(--gradient-primary)'}}>
              <span style={{color: 'var(--text-primary)'}} className="font-bold text-xl">A</span>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Accuracy</h3>
            <p style={{color: 'var(--text-muted)'}}>
              We verify every story through multiple sources to ensure you receive only factual, reliable information.
            </p>
          </div>

          <div className="value-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 animation-delay-200" 
               style={{
                 backgroundColor: 'var(--bg-secondary)', 
                 boxShadow: 'var(--shadow-sm)',
                 border: '1px solid rgba(255, 255, 255, 0.08)'
               }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                 style={{background: 'var(--gradient-secondary)'}}>
              <span style={{color: 'var(--text-primary)'}} className="font-bold text-xl">I</span>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Independence</h3>
            <p style={{color: 'var(--text-muted)'}}>
              Our editorial independence ensures unbiased reporting free from external influence or agenda.
            </p>
          </div>

          <div className="value-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 animation-delay-400" 
               style={{
                 backgroundColor: 'var(--bg-secondary)', 
                 boxShadow: 'var(--shadow-sm)',
                 border: '1px solid rgba(255, 255, 255, 0.08)'
               }}>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                 style={{background: 'var(--gradient-primary)'}}>
              <span style={{color: 'var(--text-primary)'}} className="font-bold text-xl">T</span>
            </div>
            <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Timeliness</h3>
            <p style={{color: 'var(--text-muted)'}}>
              Breaking news happens fast, and we're committed to bringing you updates as they unfold.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="rounded-2xl p-8 md:p-12 mb-20" 
             style={{
               backgroundColor: 'var(--bg-tertiary)', 
               boxShadow: 'var(--shadow-md)',
               border: '1px solid rgba(255, 255, 255, 0.12)'
             }}>
          <h2 className="text-3xl font-bold text-center mb-12" style={{color: 'var(--text-primary)'}}>Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="stat-item">
              <div className="text-4xl font-bold mb-2 counter" style={{color: 'var(--accent-primary)'}}>1M+</div>
              <div style={{color: 'var(--text-secondary)'}}>Daily Readers</div>
            </div>
            <div className="stat-item animation-delay-200">
              <div className="text-4xl font-bold mb-2 counter" style={{color: 'var(--accent-secondary)'}}>24/7</div>
              <div style={{color: 'var(--text-secondary)'}}>News Coverage</div>
            </div>
            <div className="stat-item animation-delay-400">
              <div className="text-4xl font-bold mb-2 counter" style={{color: 'var(--accent-primary)'}}>50+</div>
              <div style={{color: 'var(--text-secondary)'}}>Countries Covered</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6" style={{color: 'var(--text-primary)'}}>Our Team</h2>
          <p className="max-w-3xl mx-auto text-lg mb-8" style={{color: 'var(--text-secondary)'}}>
            KFN is powered by a dedicated team of experienced journalists, editors, and technology 
            professionals who work around the clock to bring you the stories that matter.
          </p>
          <div className="inline-block rounded-xl p-6" style={{background: 'var(--gradient-primary)', color: 'var(--text-primary)'}}>
            <p className="font-semibold">
              "Committed to truth, dedicated to excellence, focused on you."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;