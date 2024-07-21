// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin }, // Include isAdmin in the payload
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Optional: token expiration
  );
};

const login = async (req, res) => {
  const { email, password } = req.body; // Ensure these match your frontend

  try {
    // Verify credentials
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send token as response
    res.json({ token, isAdmin: user.isAdmin });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin; // Store isAdmin flag in req for future middleware/routes
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.isAdmin) {
    next(); // Proceed to next middleware or route handler
  } else {
    return res.status(403).send({ message: 'Access denied. Admins only.' });
  }
};

module.exports = {
  login,
  verifyToken,
  isAdmin
};
