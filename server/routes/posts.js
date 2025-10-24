const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { validate } = require('../middleware/validate');
const postController = require('../controllers/posts');
const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure directory exists
        require('fs').mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${base}${ext}`);
    }
});
const upload = multer({ storage });

// GET /api/posts
router.get('/',
  query('page').optional().toInt(),
  query('limit').optional().toInt(),
  query('search').optional().isString(),
  validate,
  postController.getPosts
);

// GET /api/posts/:id
router.get('/:id', 
  param('id').isMongoId().withMessage('Invalid post id'),
  validate,
  postController.getPost
);

// POST /api/posts
router.post('/',
  upload.single('featuredImage'),
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').optional().isLength({ max: 200 }).withMessage('Excerpt cannot be more than 200 characters'),
  body('category').optional(),
  body('authorId').notEmpty().withMessage('Author ID is required'),
  body('authorName').notEmpty().withMessage('Author name is required'),
  validate,
  postController.createPost
);

// PUT /api/posts/:id
router.put('/:id',
  upload.single('featuredImage'),
  param('id').isMongoId().withMessage('Invalid post id'),
  validate,
  postController.updatePost
);

// DELETE /api/posts/:id
router.delete('/:id',
  param('id').isMongoId().withMessage('Invalid post id'),
  validate,
  postController.deletePost
);

module.exports = router;
