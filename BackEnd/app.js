const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const transactionRoute = require('./Routes/transactionRoute');
const userRoute = require('./Routes/userRoutes');

require('dotenv').config();

const app = express();
const Port = process.env.PORT ;

mongoose.connect("mongodb+srv://abhay80912:iCAjGGeuDZneq6Uy@cluster0.ghwsu4s.mongodb.net/?retryWrites=truew=majorityappName=Cluster0iCAjGGeuDZneq6Uy")
.then(() => {
    console.log('DB Connected successfully');
}).catch((e) => {
    console.log('Error while connecting to DB', e);
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello");
})

app.use('/api/v1/transactions', transactionRoute);
app.use('/api/v1/users', userRoute);

app.listen(Port, () => {
    console.log('Listening to Port:', Port);
});
