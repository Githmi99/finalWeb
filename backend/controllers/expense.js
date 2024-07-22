const Expense = require('../models/ExpenseModel');
const jwt = require('jsonwebtoken');

// Middleware to get user from token
const getUserFromToken = (req) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const userId = getUserFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: 'Amount must be a positive number!' });
    }

    // Create new expense
    const expense = new Expense({
      title,
      amount,
      category,
      description,
      date,
      user_id: userId,
    });

    await expense.save();
    res.status(200).json({ message: 'Expense Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getExpense = async (req, res) => {
  const userId = getUserFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const expenses = await Expense.find({ user_id: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = getUserFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
