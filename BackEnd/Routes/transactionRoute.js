const express = require('express');
const incomecontroller = require('../controllers/incomeController');
const expensecontroller = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-income', authMiddleware, incomecontroller.addIncome);
router.get('/get-income', authMiddleware, incomecontroller.getIncome);
router.delete('/delete-income/:id', authMiddleware, incomecontroller.deleteIncome);
router.post('/add-expense', authMiddleware, expensecontroller.addExpense);
router.get('/get-expense', authMiddleware, expensecontroller.getExpense);
router.delete('/delete-expense/:id', authMiddleware, expensecontroller.deleteExpense);

module.exports = router;
