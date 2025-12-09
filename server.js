const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files

// Connect to MongoDB (optional for now, can use in-memory)
mongoose.connect('mongodb://localhost:27017/coffeehaven', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Simple login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Simple check: accept any username/password
  if (username && password) {
    res.json({ success: true, userId: 'user123' });
  } else {
    res.json({ success: false });
  }
});

// Cart endpoints (for future use)
app.get('/getCart/:userId', (req, res) => {
  // Return empty cart for now
  res.json([]);
});

app.post('/removeFromCart', (req, res) => {
  res.json({ success: true });
});

app.post('/clearCart', (req, res) => {
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
