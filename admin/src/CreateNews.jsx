import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  title: '',
  description: '',
  content: '',
  publishedAt: '',
  sourceName: '',
  category: '',
  image: null
};

const CreateNews = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: name === 'image' ? files[0] : value
    }));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return form.title.trim() !== '' && form.category !== '';
      case 2:
        return form.description.trim() !== '' && 
               form.content.trim() !== '' && 
               form.sourceName.trim() !== '';
      case 3:
        return form.publishedAt !== '' && 
               form.image !== null;
      default:
        return false;
    }
  }, [currentStep, form]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      // Try to use relative URL first, then fallback to environment variable
      let baseUrl;
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local development - use localhost
        baseUrl = 'http://localhost:5000';
      } else {
        // Production - use environment variable or relative URL
        baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin;
      }
      
      console.log('Creating news with API URL:', `${baseUrl}/api/news`);
      const res = await fetch(`${baseUrl}/api/news`, {
        method: 'POST',
        body: formData
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success('News created successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => navigate('/dashboard'), 1200);
      } else {
        toast.error(data.message || 'Failed to create news', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (err) {
      toast.error('Server error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }, [form, navigate]);

  const stepIndicator = useMemo(() => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${
            step <= currentStep 
              ? 'bg-gradient-to-r from-[#ff0000] to-[#a92323] shadow-lg transform scale-110' 
              : 'bg-[#2a2f3e] border-2 border-[#3a3f4e]'
          }`}>
            {step < currentStep ? '✓' : step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
              step < currentStep ? 'bg-gradient-to-r from-[#ff0000] to-[#a92323]' : 'bg-[#2a2f3e]'
            }`}></div>
          )}
        </div>
      ))}
    </div>
  ), [currentStep]);

  const renderStep1 = useMemo(() => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">📰 Basic Information</h3>
        <p className="text-[#8892b0]">Let's start with the essentials</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Article Title</label>
          <input
            name="title"
            placeholder="Enter a compelling title for your news article..."
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all duration-300"
          />
        </div>
        
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white focus:border-[#ff0000] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all duration-300"
          >
            <option value="">Select Category</option>
            <option value="General">📰 General</option>
            <option value="Technology">💻 Technology</option>
            <option value="Business">💼 Business</option>
            <option value="Sports">⚽ Sports</option>
            <option value="Entertainment">🎬 Entertainment</option>
            <option value="Health">🏥 Health</option>
            <option value="Science">🔬 Science</option>
            <option value="Politics">🏛️ Politics</option>
          </select>
        </div>

        {form.title && (
          <div className="bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl p-4 mt-6">
            <h4 className="text-[#ccd6f6] font-medium mb-2">Preview</h4>
            <div className="bg-[#2a2f3e] rounded-lg p-4">
              <h5 className="text-white font-bold text-lg">{form.title}</h5>
              <div className="flex items-center mt-2">
                <span className="bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white text-xs px-2 py-1 rounded-full">
                  {form.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ), [form.title, form.category, handleChange]);

  const renderStep2 = useMemo(() => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">📝 Content & Source</h3>
        <p className="text-[#8892b0]">Add your article content and source information</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Brief description of the article..."
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all duration-300 resize-none"
          />
        </div>
        
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Full Content</label>
          <textarea
            name="content"
            placeholder="Write the full article content here..."
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all duration-300 resize-none"
          />
        </div>
        
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Source Name</label>
          <input
            name="sourceName"
            placeholder="e.g., BBC News, CNN, etc."
            value={form.sourceName}
            onChange={handleChange}
            required
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  ), [form.description, form.content, form.sourceName, form.sourceUrl, handleChange]);

  const renderStep3 = useMemo(() => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">🔗 Final Details</h3>
        <p className="text-[#8892b0]">Complete your article with additional information</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Publication Date & Time</label>
          <input
            name="publishedAt"
            type="datetime-local"
            value={form.publishedAt}
            onChange={handleChange}
            required
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white focus:border-[#ff0000] focus:outline-none focus:ring-2 focus:ring-[#ff0000]/20 transition-all duration-300"
          />
        </div>
        
        <div>
          <label className="block text-[#ccd6f6] font-medium mb-2">Featured Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-4 bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#ff0000] file:to-[#a92323] file:text-white hover:file:from-[#ff6b35] hover:file:to-[#cc5529] transition-all duration-300"
          />
        </div>

        <div className="bg-[#1a1f2e] border border-[#2a2f3e] rounded-xl p-6 mt-6">
          <h4 className="text-[#ccd6f6] font-medium mb-4 flex items-center">
            <span className="mr-2">📋</span>
            Article Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Title:</span>
              <span className="text-white font-medium">{form.title || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Category:</span>
              <span className="text-white font-medium">{form.category || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Source:</span>
              <span className="text-white font-medium">{form.sourceName || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Image:</span>
              <span className="text-white font-medium">{form.image ? form.image.name : 'Not uploaded'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [form.publishedAt, form.image, form.title, form.category, form.sourceName, handleChange]);

  const currentStepContent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return renderStep1;
      case 2:
        return renderStep2;
      case 3:
        return renderStep3;
      default:
        return null;
    }
  }, [currentStep, renderStep1, renderStep2, renderStep3]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] py-4 px-2 sm:py-8 sm:px-4">
      <ToastContainer />
      <div className="max-w-full sm:max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-[#ff0000] to-[#ff6b35] bg-clip-text text-transparent mb-2">
            Create News Article
          </h1>
          <p className="text-[#8892b0] text-xs sm:text-base">Share your story with the world</p>
        </div>

        {/* Progress Steps */}
        {stepIndicator}

        {/* Form Container */}
        <div className="bg-[#1a1f2e] rounded-2xl p-4 sm:p-8 border border-[#2a2f3e] shadow-2xl">
          <form onSubmit={handleSubmit}>
            {/* Step Content */}
            <div className="min-h-[300px] sm:min-h-[400px] text-xs sm:text-base">
              {currentStepContent}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-row justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#2a2f3e] gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-2 py-1 sm:px-6 sm:py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-base ${
                  currentStep === 1 
                    ? 'bg-[#2a2f3e] text-[#8892b0] cursor-not-allowed' 
                    : 'bg-[#2a2f3e] text-white hover:bg-[#3a3f4e] hover:scale-105'
                }`}
              >
                Previous
              </button>

              <div className="flex flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-2 py-1 sm:px-6 sm:py-3 rounded-xl font-medium bg-[#2a2f3e] text-[#8892b0] hover:bg-[#3a3f4e] transition-all duration-300 text-xs sm:text-base"
                >
                  Cancel
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid}
                    className={`px-2 py-1 sm:px-8 sm:py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-base ${
                      isStepValid
                        ? 'bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white hover:shadow-lg hover:scale-105'
                        : 'bg-[#2a2f3e] text-[#8892b0] cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !isStepValid}
                    className={`px-2 py-1 sm:px-8 sm:py-3 rounded-xl font-medium transition-all duration-300 text-xs sm:text-base ${
                      isStepValid && !loading
                        ? 'bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white hover:shadow-lg hover:scale-105'
                        : 'bg-[#2a2f3e] text-[#8892b0] cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Publishing...
                      </span>
                    ) : (
                      'Publish Article'
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>


      </div>
    </div>
  );
};

export default CreateNews;