const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Exercises = require("../models/exercises")

router.get('/', async (req, res) => {
  try {
    const foundExercises = await Exercises.find({ userId: req.session.user._id })
    res.render('exercises/exercisesDashboard.ejs', { foundExercises })
  } catch (error) {
    console.log(error);
  }
})

router.get('/new', async (req, res) => {
  try {
    res.render('exercises/newExercise.ejs')
  } catch (error) {
    console.log(error);
  }
})

router.post('/', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const newExercises = await Exercises.create(req.body)
    res.redirect('/exercises')
  } catch (error) {
    console.log(error);
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const exercise = await Exercises.findById(req.params.id);
    res.render('exercises/editExercise.ejs', { exercise });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedExercise = await Exercises.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/exercises');
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedExercise = await Exercises.findByIdAndDelete(req.params.id);
    res.redirect('/exercises');
  } catch (error) {
    console.log(error);
  }
});



module.exports = router