const Transaction = require('../models/Transaction');
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

const getTransactions = async (req, res) => {
  const userId = getUserFromToken(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { date, category, amount } = req.query;
    let filter = { user_id: userId };

    if (date) filter.date = new Date(date);
    if (category) filter.category = new RegExp(category, 'i');
    if (amount) filter.amount = amount;

    // Fetch transactions based on the filter
    const transactions = await Transaction.find(filter).sort({ date: 1 });

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Error fetching transactions' });
  }
};

module.exports = { getTransactions };
