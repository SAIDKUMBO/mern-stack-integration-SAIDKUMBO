const Post = require('.../models/post');

exports.getCommentsForPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).select('comments');
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post.comments });
  } catch (err) {
    next(err);
  }
};

exports.addCommentToPost = async (req, res, next) => {
  try {
    const { content, authorName } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });

    post.comments.push({ content, user: null, authorName: authorName || 'Guest' });
    await post.save();
    res.status(201).json({ success: true, data: post.comments });
  } catch (err) {
    next(err);
  }
};
