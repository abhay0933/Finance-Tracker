const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoute = require('./Routes/transactionRoute');
const userRoute = require('./Routes/userRoutes');

require('dotenv').config();

const app = express();
const Port = process.env.PORT || 7000;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB Connected successfully');
    })
    .catch((e) => {
        console.log('Error while connecting to DB', e);
    });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello");
});

app.use('/api/v1/transactions', transactionRoute);
app.use('/api/v1/users', userRoute);

app.listen(Port, () => {
    console.log('Listening to Port:', Port);
});
