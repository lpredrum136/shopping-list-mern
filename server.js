const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

// Init middleware
app.use(express.json());

// Connect to MOngo
connectDB();

// Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // SET STATIC FOLDER
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    // Any request that is not /api/items should load index.html
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
