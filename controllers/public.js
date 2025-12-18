const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Meals = require("../models/meals");
const Exercises = require("../models/exercises");
const Plan = require('../models/userPlans')

router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isPublic: true }).select('name');
    for (let u of users) {
      const p = await Plan.findOne({ userId: u._id }).lean();
      u.goal = p ? p.goal : 'No plan yet';
    }
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

    const meals = await Meals.find({ userId: user._id }).populate('userId')
    const exercises = await Exercises.find({ userId: user._id }).populate('userId');
    const plan = await Plan.find({ userId: user._id });
    
    res.render('publicDashboard/publicUserDetails.ejs', { user, exercises, meals, plan });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
