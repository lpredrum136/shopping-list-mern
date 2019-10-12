const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Init middleware
app.use(express.json({ extended: false }));

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MOngo
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1); //Exit process with failure
  }
};

connectDB();

// Use routes
app.use('/api/items', items);

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
