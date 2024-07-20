const Income = require('../models/IncomeModel');
const Expense = require('../models/ExpenseModel');

const getTransactions = async (req, res) => {
    try {
        const { date, category, amount } = req.query;
        let filter = {};

        if (date) filter.date = new Date(date);
        if (category) filter.category = new RegExp(category, 'i');
        if (amount) filter.amount = amount;

        const incomes = await Income.find(filter);
        const expenses = await Expense.find(filter);

        const transactions = [...incomes, ...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

module.exports = { getTransactions };
