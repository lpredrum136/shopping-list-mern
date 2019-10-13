const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route POST /api/auth
// @desc Auth user
// @access Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  // Check for existing user
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ msg: 'User not found' });

  // Match user and password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  // If ok
  const payload = { id: user.id };

  const jwtSecret = config.get('jwtSecret');

  jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
    if (err) throw err;
    res.json({
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });
});

// @route GET /api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;
