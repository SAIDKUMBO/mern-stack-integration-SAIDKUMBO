const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { validate } = require('.../middleware/validate');
const postsController = require('.../controllers/post');
const multer = require('multer');
const path = require('path');

const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${base}${ext}`);
  }
});
const upload = multer({ storage });

// GET /api/posts
router.get(
  '/',
  [
    query('page').optional().toInt(),
    query('limit').optional().toInt(),
    query('search').optional().isString()
  ],
  validate,
  postsController.getPosts
);

// GET /api/posts/:id
router.get('/:id', [param('id').isMongoId().withMessage('Invalid post id')], validate, postsController.getPost);

// POST /api/posts
router.post(
  '/',
  upload.single('featuredImage'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('category').notEmpty().withMessage('Category is required')
  ],
  validate,
  postsController.createPost
);

// PUT /api/posts/:id
router.put(
  '/:id',
  upload.single('featuredImage'),
  [param('id').isMongoId().withMessage('Invalid post id')],
  validate,
  postsController.updatePost
);

// DELETE /api/posts/:id
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid post id')], validate, postsController.deletePost);

module.exports = router;
