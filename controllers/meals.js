const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Meals = require("../models/meals")

router.get("/", async (req, res)=>{
        const foundMeals = await Meals.find().populate('userId');
        res.render("meals/mealsDashboard.ejs", {foundMeals});
})

router.get("/new", async (req, res)=>{
    res.render('meals/newMeal.ejs')
})

router.post('/', async (req, res) => {
  try {
    req.body.userId = req.session.user._id; // attach logged-in user
    const createMeal = await Meals.create(req.body);
    res.redirect('/meals');
  } catch (error) {
    console.error(error);
    res.redirect('/meals');
  }
});

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const meal = await Meals.findById(req.params.id);
  res.render('meals/editMeal.ejs', { meal });
});

// Update meal
router.put('/:id', async (req, res) => {
  await Meals.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/meals');
});

// Delete meal
router.delete('/:id', async (req, res) => {
  await Meals.findByIdAndDelete(req.params.id);
  res.redirect('/meals');
});





module.exports = router