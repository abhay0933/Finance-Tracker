// incomeController.js
const IncomeSchema = require('../models/incomeModel');
const generateUniqueId = require('generate-unique-id');

const addIncome = async (req, res) => {
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
        const newIncome =await new IncomeSchema(income);
        await newIncome.save();
        res.status(200).json({ success: true, message: 'Income added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await IncomeSchema.find({ user: userId });
        res.status(200).json({ success: true, data: income });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        const income = await IncomeSchema.findOneAndDelete({ _id: id, user: userId });
        if (!income) {
            return res.status(404).json({ success: false, message: 'Income not found' });
        }
        res.status(200).json({ success: true, message: 'Income deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { addIncome, getIncome, deleteIncome };
