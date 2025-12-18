const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Meal = require('../models/meals');
const Plan = require('../models/userPlans');
const Exercises = require('../models/exercises');

router.get('/', async (req, res) => {
  try {
    const userId = req.session.user._id;

    const user = await User.findById(userId);
    const plan = await Plan.find({ userId }).populate('userId');

    res.render('appDashboard/dashboard.ejs', { user, plan });
  } catch (error) {
    console.error(error);
  }
});

router.post("/toggle-public", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const isPublic = !!req.body.isPublic;

    await User.findByIdAndUpdate(userId, { isPublic });
    req.session.user.isPublic = isPublic;
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

router.delete('/delete-account', async (req, res) => {
  try {
    const userId = req.session.user._id;

    await Meal.deleteMany({ userId });
    await Exercise.deleteMany({ userId });
    await Plan.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.error(error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user.isPublic) {
      return res.send('This user’s logs are not public');
    }

    const meals = await Meals.find({ userId: user._id }).populate('userId').sort({ date: 1 });

    const exercises = await Exercises.find({ userId: user._id }).populate('userId');
    const plan = await Plan.find({ userId: user._id });
    res.render('appDashboard/dashboard.ejs', { user, exercises, plan });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
