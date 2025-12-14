const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Meals = require("../models/meals");
const Exercises = require("../models/exercises");

router.get('/', async (req, res) => {
    try {
        // if(req.session.user) return res.redirect('/dashboard')
        const users = await User.find({ isPublic: true }).select('name');
        console.log(users) 
        res.render('publicDashboard/publicUsers.ejs', { users });
    } catch (error) {
        console.log(error);
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user.isPublic) {
           return res.send('This user’s logs are not public'); 
        } 

        const meals = await Meals.find({ userId: user._id });
        const exercises = await Exercises.find({ userId: user._id }).populate('userId');
        console.log(exercises)

        res.render('publicDashboard/publicUserDetails.ejs', { user, meals, exercises });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
