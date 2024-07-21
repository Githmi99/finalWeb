const Income = require('../models/IncomeModel');
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

exports.addIncome = async (req, res) => {
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

    // Create new income
    const income = new Income({
      title,
      amount,
      category,
      description,
      date,
      user_id: userId,
    });

    await income.save();
    res.status(200).json({ message: 'Income Added' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getIncomes = async (req, res) => {
  const userId = getUserFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const incomes = await Income.find({ user_id: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  const userId = getUserFromToken(req);

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const income = await Income.findById(id);

    if (!income) {
      return res.status(404).json({ message: 'Income not found' });
    }

    if (income.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: 'Income Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
