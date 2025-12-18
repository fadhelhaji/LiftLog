const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Meals = require("../models/meals")

router.get("/", async (req, res) => {
  try {
    const foundMeals = await Meals.find({ userId: req.session.user._id });
    res.render("meals/mealsDashboard.ejs", { foundMeals });
  } catch (error) {
    console.log(error);
  }
})

router.get("/new", async (req, res) => {
  try {
    res.render('meals/newMeal.ejs')
  } catch (error) {
    console.log(error);
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const createMeal = await Meals.create(req.body);
    res.redirect('/meals');
  } catch (error) {
    console.error(error);
    res.redirect('/meals');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const meal = await Meals.findById(req.params.id);
    res.render('meals/editMeal.ejs', { meal });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Meals.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/meals');
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Meals.findByIdAndDelete(req.params.id);
    res.redirect('/meals');
  } catch (error) {
    console.log(error);
  }
});





module.exports = router