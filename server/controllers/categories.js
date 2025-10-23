const Category = require('../models/category');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ success: false, message: 'Category already exists' });
    const category = await Category.create({ name, description });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};
