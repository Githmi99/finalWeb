const { login, register } = require('../controllers/authcontroller');
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require('../controllers/expense');
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require('../controllers/income');
const { getTransactions } = require('../controllers/transactions'); // Import the new getTransactions function

const router = require('express').Router();

router
  .post('/add-income', addIncome)
  .get('/get-incomes', getIncomes)
  .delete('/delete-income/:id', deleteIncome)
  .post('/add-expense', addExpense)
  .get('/get-expenses', getExpense)
  .delete('/delete-expense/:id', deleteExpense)
  .get('/transactions', getTransactions)
  .post('/login', login)
  .get('/register', register);

module.exports = router;
