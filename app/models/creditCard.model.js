const { Schema, model } = require('mongoose');

const creditCardSchema = new Schema({
    holderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    expiry: {
        type: Number,
        required: true
    },
    cvc: {
        type: Number,
        required: true
    }
}, { versionKey: false });

module.exports = model('CreditCard', creditCardSchema);