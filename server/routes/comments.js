const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { validate } = require('../middleware/validate');
const commentController = require('../controllers/comments');

// GET comments for a post
router.get('/post/:postId', [param('postId').isMongoId()], validate, commentController.getCommentsForPost);

// POST add comment (no auth required in this simple version)
router.post(
  '/post/:postId',
  [param('postId').isMongoId(), body('content').notEmpty().withMessage('Content required'), body('authorName').optional()],
  validate,
  commentController.addCommentToPost
);

module.exports = router;
