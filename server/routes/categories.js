const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const categoriesController = require('../controllers/categories');

// GET /api/categories
router.get('/', categoriesController.getCategories);

// POST /api/categories
router.post(
  '/',
  [body('name').notEmpty().withMessage('Name is required')],
  validate,
  categoriesController.createCategory
);

module.exports = router;
