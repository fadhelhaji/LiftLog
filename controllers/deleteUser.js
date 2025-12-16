const express = require('express');
const router = express.Router();
const User = require('../models/user')
const Meal = require('../models/meals')
const Plan = require('../models/userPlans')
const Exercise = require('../models/exercises')

router.delete('/delete-account', async (req, res) => {
  try {
    const userId = req.session.user._id
    const deleteMeal = await Meal.deleteMany({ userId })
    const deleteExercise = await Exercise.deleteMany({ userId })
    const deletePlan = await Plan.deleteMany({ userId })
    const deleteUser = await User.findByIdAndDelete(userId)
    req.session.destroy(() => {
      res.redirect('/')
    })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
