import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editError, setEditError] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [deleteId, setDeleteId] = useState(null); // Add state for delete confirmation
  const navigate = useNavigate();

  // Try to use relative URL first, then fallback to environment variable
  const getBaseUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Local development - use localhost
      return 'http://localhost:5000';
    } else {
      // Production - use environment variable or relative URL
      return import.meta.env.VITE_API_BASE_URL || window.location.origin;
    }
  };

  const fetchNews = async () => {
    try {
      const baseUrl = getBaseUrl();
      console.log('Fetching news from:', `${baseUrl}/api/news`);
      const res = await fetch(`${baseUrl}/api/news`);
      if (res.ok) {
        const data = await res.json();
        setNews(data);
        if (data.length > 0) {
          toast.info(`Loaded ${data.length} news articles`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      toast.error('Failed to load news articles', {
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
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    const article = news.find(n => n._id === id);
    setDeleteId(id); // Show confirmation modal
    
    toast.warning(`Confirm deletion of: ${article?.title}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/api/news/${deleteId}`, { method: 'DELETE' });
      if (res.ok) {
        setNews(news.filter(n => n._id !== deleteId));
        showNotification('Article deleted successfully', 'success');
      }
    } catch (err) {
      showNotification('Error deleting article', 'error');
    } finally {
      setDeleteId(null); // Close modal
    }
  };

  const cancelDelete = () => setDeleteId(null);

  const handleEditClick = (item) => {
    setEditing(item._id);
    setEditForm({
      title: item.title,
      description: item.description,
      content: item.content,
      publishedAt: item.publishedAt ? item.publishedAt.slice(0, 16) : '',
      sourceName: item.sourceName || item.source?.name || '',
      category: item.category,
      image: null
    });
    setEditError('');
    
    toast.info(`Editing: ${item.title}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    
    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      const baseUrl = getBaseUrl();
      const res = await fetch(`${baseUrl}/api/news/${editing}`, {
        method: 'PUT',
        body: formData
      });
      
      const data = await res.json();
      if (res.ok) {
        setEditing(null);
        setEditForm(null);
        fetchNews();
        showNotification('Article updated successfully', 'success');
      } else {
        setEditError(data.message || 'Failed to update news');
      }
    } catch (err) {
      setEditError('Server error');
    } finally {
      setEditLoading(false);
    }
  };

  const showNotification = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(message, {
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
  };

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const categories = ['all', 'General', 'Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics'];

  const getStats = () => {
    const total = news.length;
    const published = news.filter(item => item.status !== 'draft').length;
    const todayPublished = news.filter(item => {
      const today = new Date().toDateString();
      return new Date(item.publishedAt).toDateString() === today;
    }).length;
    
    return { total, published, todayPublished };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#2a2f3e] border-t-[#ff0000] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#ccd6f6] text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col md:flex-row">
      <ToastContainer />
      {/* Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-[#1a1f2e] border-r border-[#2a2f3e] p-6 z-10">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-[#ff0000] to-[#a92323] rounded-lg flex items-center justify-center font-bold text-lg">
            N
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">News Admin</h2>
            <p className="text-[#8892b0] text-sm">Content Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          <div className="bg-[#2a2f3e] rounded-lg p-3">
            <div className="flex items-center space-x-3 text-[#ff0000]">
              <span className="text-xl">📊</span>
              <span className="font-medium">Dashboard</span>
            </div>
          </div>
        </nav>

        <div className="mt-8 p-4 bg-[#2a2f3e] rounded-lg">
          <h3 className="text-[#ccd6f6] font-medium mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Total Articles</span>
              <span className="text-white font-medium">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Published</span>
              <span className="text-green-400 font-medium">{stats.published}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8892b0]">Today</span>
              <span className="text-[#ff6b35] font-medium">{stats.todayPublished}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-2 sm:p-4 md:p-8 md:ml-64">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#ff0000] to-[#ff6b35] bg-clip-text text-transparent">
                Content Management
              </h1>
              <p className="text-[#8892b0] mt-1 text-sm sm:text-base">Manage your news articles and content</p>
            </div>
            <button
              onClick={() => navigate('/create-news')}
              className="bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 text-sm sm:text-base"
            >
              <span>➕</span>
              <span>Create Article</span>
            </button>
          </div>
        </div>
        {/* Filter and View Controls */}
        <div className="bg-[#1a1f2e] rounded-xl p-3 sm:p-6 border border-[#2a2f3e] mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
              <div>
                <label className="block text-[#8892b0] text-xs sm:text-sm mb-1">Filter by Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#2a2f3e] text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg border border-[#3a3f4e] focus:border-[#ff0000] focus:outline-none transition-all duration-200 text-xs sm:text-base"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[#8892b0] text-xs sm:text-sm pt-1 sm:pt-5">
                {filteredNews.length} articles found
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 text-xs sm:text-base ${
                  viewMode === 'grid' 
                    ? 'bg-[#ff0000] text-white' 
                    : 'bg-[#2a2f3e] text-[#8892b0] hover:bg-[#3a3f4e]'
                }`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-200 text-xs sm:text-base ${
                  viewMode === 'list' 
                    ? 'bg-[#ff0000] text-white' 
                    : 'bg-[#2a2f3e] text-[#8892b0] hover:bg-[#3a3f4e]'
                }`}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
        {/* Articles Display */}
        {filteredNews.length === 0 ? (
          <div className="bg-[#1a1f2e] rounded-xl p-6 sm:p-12 border border-[#2a2f3e] text-center">
            <div className="text-4xl sm:text-6xl mb-4 opacity-50">📰</div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No articles found</h3>
            <p className="text-[#8892b0] mb-6 text-xs sm:text-base">
              {selectedCategory === 'all' 
                ? "You haven't created any news articles yet." 
                : `No articles found in ${selectedCategory} category.`
              }
            </p>
            <button
              onClick={() => navigate('/create-news')}
              className="bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-base"
            >
              Create Your First Article
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6' : 'space-y-2 sm:space-y-4'}>
            {filteredNews.map((item, index) => (
              <div 
                key={item._id}
                className={`bg-[#1a1f2e] rounded-xl border border-[#2a2f3e] hover:border-[#ff0000] transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  viewMode === 'grid' ? 'p-3 sm:p-6' : 'p-2 sm:p-4 flex items-center space-x-2 sm:space-x-4'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    {item.image && (
                      <div className="w-full h-48 bg-[#2a2f3e] rounded-lg overflow-hidden mb-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white text-xs px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-[#8892b0] text-xs">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-lg mb-2 hover:text-[#ff0000] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#8892b0] text-sm mb-4 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8892b0] text-sm">
                        {item.source?.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleEditClick(item)}
                          className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // List View
                  <>
                    {item.image && (
                      <div className="w-16 h-16 bg-[#2a2f3e] rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white text-xs px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#8892b0] text-sm">
                        {item.source?.name} • {new Date(item.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-[#1a1f2e] rounded-2xl border border-[#2a2f3e] p-4 sm:p-8 w-full max-w-xs sm:max-w-2xl max-h-[90vh] overflow-y-auto text-xs sm:text-base">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Edit Article</h3>
              <button 
                type="button" 
                onClick={() => setEditing(null)}
                className="text-[#8892b0] hover:text-red-400 text-2xl transition-colors duration-200"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-[#ccd6f6] font-medium mb-2">Title</label>
                <input 
                  name="title" 
                  value={editForm.title} 
                  onChange={handleEditChange} 
                  required 
                  placeholder="Enter a compelling title for your news article..."
                  className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-[#ccd6f6] font-medium mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={editForm.description} 
                  onChange={handleEditChange} 
                  required 
                  rows={3}
                  placeholder="Brief description of the article..."
                  className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-[#ccd6f6] font-medium mb-2">Content</label>
                <textarea 
                  name="content" 
                  value={editForm.content} 
                  onChange={handleEditChange} 
                  required 
                  rows={6}
                  placeholder="Write the full article content here..."
                  className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#ccd6f6] font-medium mb-2">Source Name</label>
                  <input 
                    name="sourceName" 
                    value={editForm.sourceName} 
                    onChange={handleEditChange} 
                    required 
                    placeholder="e.g., BBC News, CNN, etc."
                    className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white placeholder-[#8892b0] focus:border-[#ff0000] focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[#ccd6f6] font-medium mb-2">Category</label>
                  <select 
                    name="category" 
                    value={editForm.category} 
                    onChange={handleEditChange} 
                    required 
                    className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white focus:border-[#ff0000] focus:outline-none transition-all duration-300"
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#ccd6f6] font-medium mb-2">Publication Date & Time</label>
                  <input 
                    name="publishedAt" 
                    type="datetime-local" 
                    value={editForm.publishedAt} 
                    onChange={handleEditChange} 
                    required
                    className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white focus:border-[#ff0000] focus:outline-none transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-[#ccd6f6] font-medium mb-2">Update Image</label>
                  <input 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleEditChange} 
                    className="w-full p-4 bg-[#2a2f3e] border border-[#3a3f4e] rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#ff0000] file:to-[#a92323] file:text-white hover:file:from-[#ff6b35] hover:file:to-[#cc5529] transition-all duration-300"
                  />
                </div>
              </div>

              {editError && (
                <div className="bg-red-500/20 border border-red-500/40 text-red-400 p-4 rounded-xl">
                  {editError}
                </div>
              )}

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#2a2f3e]">
                <button 
                  type="button" 
                  onClick={() => setEditing(null)}
                  className="px-6 py-3 rounded-xl font-medium bg-[#2a2f3e] text-[#8892b0] hover:bg-[#3a3f4e] transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={editLoading}
                  className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                    editLoading
                      ? 'bg-[#2a2f3e] text-[#8892b0] cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {editLoading ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </span>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-[#1a1f2e] p-4 sm:p-8 rounded-xl border border-[#ff0000] shadow-2xl text-center max-w-xs sm:max-w-sm w-full text-xs sm:text-base">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-[#ccd6f6] mb-6">Are you sure you want to delete this news article?</p>
            <div className="flex justify-center space-x-2 sm:space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 sm:px-6 sm:py-2 rounded-lg bg-gradient-to-r from-[#ff0000] to-[#a92323] text-white font-medium hover:scale-105 transition-all duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 sm:px-6 sm:py-2 rounded-lg bg-[#2a2f3e] text-[#ccd6f6] font-medium hover:bg-[#3a3f4e] transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;