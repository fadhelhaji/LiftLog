const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Exercises = require("../models/exercises")

router.get('/', async (req, res)=>{
    const foundExercises = await Exercises.find({userId: req.session.user._id})
    res.render('exercises/exercisesDashboard.ejs', {foundExercises})
})

router.get('/new', async (req, res)=>{
    res.render('exercises/newExercise.ejs')
})

router.post('/', async (req, res)=>{
    req.body.userId = req.session.user._id; // attach logged-in user
    const newExercises = await Exercises.create(req.body)
    res.redirect('/exercises')
})

// Show edit form
router.get('/:id/edit', async (req, res) => {
  const exercise = await Exercises.findById(req.params.id);
  res.render('exercises/editExercise.ejs', {exercise});
});

// Update exercise
router.put('/:id', async (req, res) => {
  const updatedExercise = await Exercises.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/exercises');
});

// Delete exercise
router.delete('/:id', async (req, res) => {
  const deletedExercise = await Exercises.findByIdAndDelete(req.params.id);
  res.redirect('/exercises');
});



module.exports = router