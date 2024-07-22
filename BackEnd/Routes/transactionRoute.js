// Routes/transactionRoute.js
const express = require('express');
const incomeController = require('../controllers/incomeController');
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-income', authMiddleware, incomeController.addIncome);
router.get('/get-income', authMiddleware, incomeController.getIncome);
router.delete('/delete-income/:id', authMiddleware, incomeController.deleteIncome);
router.post('/add-expense', authMiddleware, expenseController.addExpense);
router.get('/get-expense', authMiddleware, expenseController.getExpense);
router.delete('/delete-expense/:id', authMiddleware, expenseController.deleteExpense);

// Add this route if you have a user-info endpoint
router.get('/user-info', authMiddleware, (req, res) => {
    res.json({ success: true, message: 'User Info Endpoint' });
});

module.exports = router;
