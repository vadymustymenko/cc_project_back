const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const CreditCard = require('../models/creditCard.model');

const router = Router();

router.get('', async (req, res) => {
    try {
        const creditCards = await CreditCard.find();
        res.status(200).json({ data: creditCards });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post(
    '',
    [
        check('holderName', 'Holder Name is required')
            .exists(),

        check('cardNumber', 'Card number is required')
            .exists()
            .bail()
            .isLength({ min: 16, max: 16 })
            .withMessage('Card number is not valid'),

        check('expiry', 'Expiry  is required')
            .exists()
            .bail()
            .isLength({ min: 4, max: 4 })
            .withMessage('Expiry is not valid'),

        check('cvc', 'CVC number is required')
            .exists()
            .bail()
            .isLength({ min: 3, max: 3 })
            .withMessage('CVC number is not valid')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const creditCard = await CreditCard.findOne({ cardNumber: req.body.cardNumber });

            if (creditCard) {
                return res.status(400).json({ message: "Credit card already exists" });
            }

            const newCreditCard = new CreditCard(req.body);

            await newCreditCard.save();

            res.status(200).json({ data: newCreditCard })
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
);

module.exports = router;