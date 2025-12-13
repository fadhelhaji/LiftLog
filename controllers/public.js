const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Meals = require("../models/meals");
const Exercises = require("../models/exercises");

// 1️⃣ Route to list all public users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isPublic: true }).select('name'); 
        res.render('publicDashboard/publicUsers.ejs', { users });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching users');
    }
});

// 2️⃣ Route to view a specific user's meals & exercises
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.send('User not found');
        if (!user.isPublic) return res.send('This user’s logs are not public');

        const meals = await Meals.find({ userId: user._id });
        const exercises = await Exercises.find({ userId: user._id });

        res.render('publicDashboard/publicUserDetails.ejs', { user, meals, exercises });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
