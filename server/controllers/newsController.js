const News = require('../models/News');
const cloudinary = require('../config/cloudinary');

exports.createNews = async (req, res) => {
  try {
    const { title, description, content, publishedAt, sourceName, category } = req.body;
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'news_images' });
      imageUrl = result.secure_url;
    }
    const news = new News({
      title,
      description,
      content,
      image: imageUrl,
      publishedAt: publishedAt || Date.now(),
      sourceName,
      category
    });
    await news.save();
    res.status(201).json({ message: 'News created successfully', news });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, publishedAt, sourceName, category } = req.body;
    let updateData = {
      title,
      description,
      content,
      publishedAt,
      sourceName,
      category
    };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'news_images' });
      updateData.image = result.secure_url;
    }
    const updated = await News.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News updated successfully', news: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await News.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'News not found' });
    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 