const User = require('../models/user');
const { validateRegister, validateLogin } = require('../middleware/validate');
const AppError = require('../utils/appError');

// Sync Clerk user to database
exports.syncClerkUser = async (req, res, next) => {
  try {
    const {
      clerkId,
      email,
      firstName,
      lastName,
      username,
      imageUrl
    } = req.body;

    if (!clerkId || !email) {
      return next(new AppError('Clerk ID and email are required', 400));
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user.name = firstName + ' ' + lastName;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.username = username;
      user.imageUrl = imageUrl;
      user.lastSignInAt = new Date();
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        clerkId,
        name: firstName + ' ' + lastName,
        email,
        firstName,
        lastName,
        username,
        imageUrl,
        lastSignInAt: new Date()
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          clerkId: user.clerkId,
          name: user.name,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          imageUrl: user.imageUrl,
          role: user.role
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

// Register new user
exports.register = async (req, res, next) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError('Email already registered', 400));
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate token
    const token = user.generateToken();

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (err) {
    next(err);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    const { email, password } = req.body;

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError('Invalid credentials', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = createToken(user);
    res.json({ success: true, data: { user: { id: user._id, name: user.name, email: user.email }, token } });
  } catch (err) {
    next(err);
  }
};
