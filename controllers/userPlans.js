const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Plan = require('../models/userPlans')


router.get('/', (req, res) => {
  res.render('plans/createPlan.ejs')
})

router.post('/new', async (req, res) => {
  try {
    req.body.userId = req.session.user._id;
    const newPlan = await Plan.create(req.body)

    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
