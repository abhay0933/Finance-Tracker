const generateUniqueId = require('generate-unique-id');
const expenseSchema = require('../models/expenseModel');

const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user._id;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ success: false, message: 'Amount should be greater than 0' });
        }

        const id = generateUniqueId({ length: 6, useLetters: false });

        const income = { trackingid: id, ...req.body, user: userId };
        const newIncome = new expenseSchema(income);
        await newIncome.save();
        res.status(200).json({ success: true, message: 'Expense added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await expenseSchema.find({ user: userId });
        res.status(200).json({ success: true, data: income });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        const income = await expenseSchema.findOneAndDelete({ _id: id, user: userId });
        if (!income) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }
        res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { addExpense, getExpense, deleteExpense };
