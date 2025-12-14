const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bCrypt = require("bcrypt")


router.get('/sign-up', async (req, res)=>{
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res)=>{
    const {name, password, confirmPassword} = req.body;
    const userInDataBase = await User.findOne({name});
    if (userInDataBase) {
        return res.send('username or password is invalid')
    }
    if (password !== confirmPassword) {
        return res.send('username or password is invalid')
    }
    const hashPassword = bCrypt.hashSync(password, 10)

    req.body.password = hashPassword;
    delete req.body.confirmPassword
    req.body.isPublic = req.body.isPublic === 'on';
    const user =  await User.create(req.body)
    req.session.user = {
        name: user.name,
        _id: user._id,
        isPublic: user.isPublic
    }
    req.session.save(() => {
    res.redirect("/");
})})

router.get('/sign-in', async (req, res)=>{
    res.render('auth/sign-in.ejs')
})

router.post('/sign-in', async (req, res)=>{
    const {name, password, confirmPassword} = req.body;
    const userInDataBase = await User.findOne({name});
    if (!userInDataBase) {
        return res.send('username or password is invalid')
    }
    const isValidPassword = bCrypt.compareSync(password, userInDataBase.password)
    if (!isValidPassword){
        return res.send('username or password is invalid')
    }
    req.session.user = {
        name: userInDataBase.name,
        _id: userInDataBase._id
    } 
    req.session.save(() => {
    res.redirect("/");
})})

router.get('/sign-out', async (req, res)=>{
    req.session.destroy(() => {
        res.redirect("/");
    });
})

module.exports = router;