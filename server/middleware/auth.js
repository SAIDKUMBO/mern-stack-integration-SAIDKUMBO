const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// Use Clerk's built-in middleware for authentication
module.exports = ClerkExpressRequireAuth({
  // Optional: Configure any specific options
  onError: (err, req, res) => {
    console.error('Clerk Auth Error:', err);
    res.status(401).json({ success: false, message: 'Please authenticate' });
  }
});
