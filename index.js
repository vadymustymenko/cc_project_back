const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/cards', require('./app/routes/creditCard.routes'));

start = async () => {
    try {
        await mongoose.connect("mongodb+srv://test_user:test_user@cluster0.ssrh9.mongodb.net/credit_cards?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`);
        });

    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
};

start();