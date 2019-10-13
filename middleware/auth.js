const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

const auth = (req, res, next) => {
  // Get token from headers
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) return res.status(401).json({ msg: 'No token, auth denied' });

  // If there is one, verify
  try {
    const decoded = jwt.verify(token, jwtSecret);

    // Assign back to user, because we attach user in the payload with the header
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Token is invalid' });
  }
};

module.exports = auth;
