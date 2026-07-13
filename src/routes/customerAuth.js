const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Customer = require('../models/Customers');

router.post('/customer/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, password, collegeId, drivingLicense } = req.body;

        // password ko hash kar rahe hain (locker mein daal rahe hain)
        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = new Customer({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            collegeId,
            drivingLicense
        });

        await customer.save();
        res.status(201).json({ message: "Signup successful, waiting for admin approval" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;