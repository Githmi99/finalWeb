import React, { useContext, useState, useEffect } from 'react';
import axios from '../config/AxiosConfig';
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUser = async () => {
      try {
        const response = await axios.get('user'); // Adjust endpoint as necessary
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // Calculate incomes
  const addIncome = async (income) => {
    try {
      await axios.post('add-income', income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get('get-incomes');
      setIncomes(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((total, income) => total + income.amount, 0);
  };

  // Calculate expenses
  const addExpense = async (expense) => {
    try {
      await axios.post('add-expense', expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get('get-expenses');
      setExpenses(response.data);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const totalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
        user,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
