const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Meals = require("../models/meals");
const Exercises = require("../models/exercises");
const Plan = require('../models/userPlans')

router.get('/', async (req, res) => {
    try {
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

    const meals = await Meals.find({ userId: user._id }).populate('userId').sort({ date: 1 });

    let mealsByDay = {};
    meals.forEach(meal => {
      const day = meal.date.toISOString().split('T')[0];
      if (!mealsByDay[day]) mealsByDay[day] = [];
      mealsByDay[day].push(meal);
    });

    
    const exercises = await Exercises.find({ userId: user._id }).populate('userId');
    const plan = await Plan.find({ userId: user._id });
    
    let exercisesByDay = {};
    exercises.forEach(ex => {
      const day = ex.date ? ex.date.toISOString().split('T')[0] : 'Unknown';
      if (!exercisesByDay[day]) exercisesByDay[day] = [];
      exercisesByDay[day].push(ex);
    });
    res.render('publicDashboard/publicUserDetails.ejs', { user, exercisesByDay, plan, mealsByDay });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
