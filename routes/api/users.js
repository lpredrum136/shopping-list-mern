const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route POST /api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  // Check for existing user
  const user = await User.findOne({ email: email });
  if (user) return res.status(400).json({ msg: 'User already exists' });

  const newUser = new User({
    name: name,
    email: email,
    password: password
  });

  // Encrypt password and save user
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  const user_return = await newUser.save();

  // Response
  const payload = {
    id: user_return.id
  };

  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        user: {
          id: user_return.id,
          name: user_return.name,
          email: user_return.email
        },
        token: token
      });
    }
  );
});

module.exports = router;
