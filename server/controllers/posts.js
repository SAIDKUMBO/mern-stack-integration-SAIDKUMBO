const Post = require('../models/Post');
const Category = require('../models/category');

// ✅ GET /api/posts
exports.getPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || '';
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      Post.find(filter)
        .populate('category')
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: posts,
      meta: { total, page, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    next(err);
  }
};

// ✅ GET /api/posts/:id
exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category')
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // increment views (non-blocking)
    post.viewCount = (post.viewCount || 0) + 1;
    post.save().catch(() => {});

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// ✅ POST /api/posts
exports.createPost = async (req, res, next) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    const { title, content, excerpt, category, tags, isPublished, authorId, authorName } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    if (!authorId || !authorName) {
      return res.status(400).json({ success: false, message: 'Author information is required' });
    }

    // ✅ Category now optional
    let cat = null;
    if (category && category.trim() && category !== 'undefined') {
      cat = await Category.findById(category).catch(() => null);
    }

    const postData = {
      title,
      content,
      author: authorId,
      authorName,
      tags: tags ? (Array.isArray(tags) ? tags : JSON.parse(tags)) : [],
      isPublished: isPublished === 'true' || isPublished === true || false,
      slug: title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')
    };

    if (excerpt && excerpt.trim()) postData.excerpt = excerpt;
    if (category && category.trim() && category !== 'undefined') {
      postData.category = category;
    }

    if (req.file) {
      postData.featuredImage = `/${process.env.UPLOAD_DIR || 'uploads'}/${req.file.filename}`;
    }

    const post = await Post.create(postData);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// ✅ PUT /api/posts/:id
exports.updatePost = async (req, res, next) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.featuredImage = `/${process.env.UPLOAD_DIR || 'uploads'}/${req.file.filename}`;
    }

    if (updates.tags && typeof updates.tags === 'string') {
      try {
        updates.tags = JSON.parse(updates.tags);
      } catch (e) {
        updates.tags = updates.tags.split(',').map((t) => t.trim());
      }
    }

    const post = await Post.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE /api/posts/:id
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};
