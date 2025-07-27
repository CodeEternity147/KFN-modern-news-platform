import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationPermission = () => {
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    // Check if user has already made a choice
    const locationChoice = localStorage.getItem('locationChoice');
    if (locationChoice === 'skipped') {
      // User previously skipped, show a different message
      setLocationPermission('denied');
    }
    // Don't automatically request location - wait for user to click the button
  }, []);

  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use a free reverse geocoding service
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
          );
          
          if (!response.ok) {
            throw new Error('Failed to get location data');
          }
          
          const data = await response.json();
          
          if (data.address) {
            const city = data.address.city || 
                        data.address.town || 
                        data.address.village ||
                        data.address.county ||
                        data.address.state;
            
            setUserLocation({
              latitude,
              longitude,
              city: city || 'Unknown City'
            });
            
            // Store city in localStorage and trigger navbar update
            localStorage.setItem('userCity', city || 'Unknown City');
            localStorage.setItem('locationChoice', 'allowed');
            window.dispatchEvent(new CustomEvent('locationUpdated', {
              detail: { city: city || 'Unknown City', choice: 'allowed' }
            }));
            
            // Navigate to city news page
            navigate(`/city/${encodeURIComponent(city || 'Unknown City')}`);
          } else {
            setError('Could not determine your city location.');
          }
        } catch (err) {
          console.error('Error getting city name:', err);
          // Fallback: use coordinates as city name
          const cityName = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
          setUserLocation({
            latitude,
            longitude,
            city: cityName
          });
          
          // Store city in localStorage and trigger navbar update
          localStorage.setItem('userCity', cityName);
          localStorage.setItem('locationChoice', 'allowed');
          window.dispatchEvent(new CustomEvent('locationUpdated', {
            detail: { city: cityName, choice: 'allowed' }
          }));
          
          navigate(`/city/${encodeURIComponent(cityName)}`);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location permission denied. Please enable location access to get local news.');
            setLocationPermission('denied');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while getting your location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const requestLocationPermission = () => {
    getUserLocation();
  };

  const skipLocation = () => {
    localStorage.setItem('locationChoice', 'skipped');
    localStorage.removeItem('userCity');
    window.dispatchEvent(new CustomEvent('locationUpdated', {
      detail: { city: null, choice: 'skipped' }
    }));
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary/20 to-bg-primary flex items-center justify-center relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-accent-secondary/20 to-accent-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-gradient-to-r from-accent-primary/15 to-purple-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-accent-secondary/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent-primary/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center w-full max-w-sm sm:max-w-md mx-auto px-4 sm:px-6 flex items-center justify-center">
          <div className="bg-bg-secondary/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-green-500/30 relative">
            
            <div className="relative z-10">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-white/30 border-t-white"></div>
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full animate-ping shadow-lg"></div>
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-green-500 mb-1">Finding Your Location</h3>
              <p className="text-text-secondary text-xs sm:text-sm">Getting your precise location to show local news...</p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce shadow-lg"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || locationPermission === 'denied') {
    const locationChoice = localStorage.getItem('locationChoice');
    const isPreviouslySkipped = locationChoice === 'skipped';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary/20 to-bg-primary flex items-center justify-center px-4 relative overflow-hidden">
        {/* Simple background */}
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary/20 to-bg-primary"></div>
        
        <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 flex items-center justify-center">
          <div className="bg-bg-secondary/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-green-500/30 relative">
            
            <div className="relative z-10 text-center">
              <div className="relative mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-lg sm:text-xl font-bold text-green-500 mb-2 sm:mb-3">
                {isPreviouslySkipped ? 'Enable Location Access' : 'Location Setup'}
              </h2>
              
              <p className="text-text-secondary mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
                {isPreviouslySkipped 
                  ? 'You can now enable location access to get personalized local news and updates from your area. Your privacy is always protected.'
                  : error || 'Let us know your location to provide you with relevant local news and updates from your city. Your data is secure.'
                }
              </p>
              
              <div className="space-y-2 sm:space-y-3">
                <button
                  onClick={requestLocationPermission}
                  className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 relative text-xs sm:text-sm border-2 border-white/30"
                >
                  <div className="relative flex items-center justify-center space-x-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{isPreviouslySkipped ? 'Enable Location Access' : 'Get My Location'}</span>
                  </div>
                </button>
                
                <button
                  onClick={skipLocation}
                  className="w-full bg-bg-tertiary/80 backdrop-blur-sm text-text-primary py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:bg-bg-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-xs sm:text-sm border-2 border-accent-primary/30"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Continue Without Location</span>
                  </div>
                </button>
              </div>
              
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-bg-tertiary/60 to-bg-secondary/40 rounded-lg sm:rounded-xl border border-accent-primary/20 shadow-lg hover:shadow-sm transition-all duration-200">
                <p className="text-text-muted text-xs">
                  💡 <strong>Tip:</strong> You can always enable location access later from the location settings icon in the navigation bar. Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary/20 to-bg-primary flex items-center justify-center px-4 relative overflow-hidden">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary/20 to-bg-primary"></div>
      
      <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto px-4 sm:px-6 flex items-center justify-center">
        <div className="bg-bg-secondary/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-accent-primary/30 relative">
          

          
          <div className="relative z-10 text-center">
            <div className="relative mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-green-500 mb-2 sm:mb-3">
              Get Local News
            </h2>
            
            <p className="text-text-secondary mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Enable location access to get personalized news from your city and surrounding areas. 
              Stay updated with what's happening right where you are. Your privacy is always protected.
            </p>
            
            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                                          <button
                onClick={requestLocationPermission}
                className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-xs sm:text-sm border-2 border-white/30"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm sm:text-base text-green-500 font-semibold">Enable Location Access</span>
                </div>
              </button>
              
              <button
                onClick={skipLocation}
                className="w-full bg-bg-tertiary/80 backdrop-blur-sm text-text-primary py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:bg-bg-secondary hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-xs sm:text-sm border-2 border-accent-primary/30"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm sm:text-base">Skip for Now</span>
                </div>
              </button>
            </div>
            
                          <div className="space-y-2 sm:space-y-3">
                <div className="p-2 sm:p-3 bg-gradient-to-r from-bg-tertiary/60 to-bg-secondary/40 rounded-lg sm:rounded-xl shadow-lg hover:shadow-sm transition-all duration-200 group">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="text-accent-primary text-base sm:text-lg">🔒</div>
                    <div className="text-left">
                      <h4 className="font-semibold text-text-primary mb-1 text-xs sm:text-sm">Privacy First</h4>
                      <p className="text-text-muted text-xs">Your location is only used to fetch relevant local news and is never stored permanently. Your data is secure.</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 sm:p-3 bg-gradient-to-r from-bg-tertiary/60 to-bg-secondary/40 rounded-lg sm:rounded-xl  shadow-lg hover:shadow-sm transition-all duration-200 group">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="text-accent-secondary text-base sm:text-lg">⚙️</div>
                    <div className="text-left">
                      <h4 className="font-semibold text-text-primary mb-1 text-xs sm:text-sm">Always in Control</h4>
                      <p className="text-text-muted text-xs">You can change location settings anytime using the location icon in the navigation bar. You're always in control.</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPermission; 