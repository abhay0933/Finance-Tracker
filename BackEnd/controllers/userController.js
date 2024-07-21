const UserSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const userRegister = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const user = await UserSchema.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists!' });
        }
        const newUser = new UserSchema({ name, email, password });
        await newUser.save();
        res.status(200).json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials!' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        to: email,
        from: process.env.EMAIL,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested to reset your account password.\n\n
               Please click on the following link, or paste it into your browser to complete the process:\n\n
               http://${process.env.CLIENT_URL}/reset/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();
        await sendResetEmail(email, token);

        res.status(200).json({ success: true, message: 'Reset email sent' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        const user = await UserSchema.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const users = { userRegister, userLogin, forgotPassword, resetPassword };

module.exports = users;
