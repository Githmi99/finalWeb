const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/UserModel');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate request body
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide both username and password.' });
  }

  try {
    // Find user by username (email in this case)
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '5h',
    });

    res.json({ token, message: 'Login successful.' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  // Validate request body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email, and password.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
