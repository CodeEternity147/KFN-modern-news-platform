const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// POST /api/news - create news with image upload
router.post('/', upload.single('image'), newsController.createNews);

// GET /api/news - get all news
router.get('/', newsController.getAllNews);

// GET /api/news/:id - get news by ID
router.get('/:id', newsController.getNewsById);

// PUT /api/news/:id - update news by ID (with optional image upload)
router.put('/:id', upload.single('image'), newsController.updateNews);

// DELETE /api/news/:id - delete news by ID
router.delete('/:id', newsController.deleteNews);

module.exports = router; 