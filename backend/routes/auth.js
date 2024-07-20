const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Dummy authentication check
  if (username === 'githmi' && password === 'password') {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  // Dummy registration logic
  res.json({ message: 'Registration successful' });
});

module.exports = router;
