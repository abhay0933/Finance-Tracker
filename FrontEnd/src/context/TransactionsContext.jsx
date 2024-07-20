import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const BaseURL = "http://localhost:7000/api/v1/transactions";

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${BaseURL}/user-info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsername(response.data.username || "User");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const resetState = () => {
    setIncome([]);
    setExpense([]);
    setError(null);
  };

  // Income API
  const fetchIncome = async () => {
    try {
      const response = await axios.get(`${BaseURL}/get-income`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIncome(response.data.data || []); // Ensure data is an array
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const addIncome = async (newIncome) => {
    try {
      const response = await axios.post(`${BaseURL}/add-income`, newIncome, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIncome([...income, response.data.data]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    fetchIncome();
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BaseURL}/delete-income/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setIncome(income.filter((inc) => inc._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Expense API
  const fetchExpense = async () => {
    try {
      const response = await axios.get(`${BaseURL}/get-expense`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpense(response.data.data || []); // Ensure data is an array
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const addExpense = async (newExpense) => {
    try {
      const response = await axios.post(`${BaseURL}/add-expense`, newExpense, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpense([...expense, response.data.data]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    fetchExpense();
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BaseURL}/delete-expense/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setExpense(expense.filter((exp) => exp._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Function to calculate total income
  const getTotalIncome = () => {
    return income.reduce((total, item) => {
      return item && item.amount ? total + item.amount : total;
    }, 0);
  };

  // Function to calculate total expenses
  const getTotalExpense = () => {
    return expense.reduce((total, item) => {
      return item && item.amount ? total + item.amount : total;
    }, 0);
  };

  // Total Balance
  const totalBalance = () => {
    return getTotalIncome() - getTotalExpense();
  };

  // Transaction History
  const transactionHistory = () => {
    const history = [...income, ...expense];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return history.slice(0, 5);
  };

  useEffect(() => {
    fetchUserInfo();
    fetchIncome();
    fetchExpense();
  }, []);

  return (
    <TransactionsContext.Provider value={{
      income,
      expense,
      error,
      setError,
      getTotalIncome,
      getTotalExpense,
      addExpense,
      deleteExpense,
      addIncome,
      deleteIncome,
      fetchExpense,
      fetchIncome,
      resetState,
      transactionHistory,
      totalBalance,
      username // Provide the username
    }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
