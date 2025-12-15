const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Plan = require('../models/userPlans')

router.get('/', (req, res) => {
  res.render('plans/userPlans.ejs')
})

router.post('/new', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const newPlan = await Plan.create(req.body)
    console.log(newPlan);
    
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const plan = await Plan.find({ userId: user._id }).populate('userId');
    console.log(plan);
    
    res.render('plans/userPlansDashboard.ejs', { user, plan })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
