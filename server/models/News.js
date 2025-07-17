const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String },
  url: { type: String },
  image: { type: String },
  publishedAt: { type: Date, default: Date.now },
  source: {
    name: { type: String, required: true },
    url: { type: String, required: true }
  },
  category: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema); 