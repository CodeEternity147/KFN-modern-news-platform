require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const newsRoutes = require('./routes/news');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/news', newsRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 