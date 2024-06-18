const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/moneytracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const TransactionSchema = new mongoose.Schema({
    description: String,
    amount: Number,
    type: String,
    date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
});

app.post('/api/transaction', async (req, res) => {
    const { description, amount, type } = req.body;
    const newTransaction = new Transaction({ description, amount, type });
    await newTransaction.save();
    res.status(201).json(newTransaction);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});