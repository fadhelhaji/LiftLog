const isSignIn = (req, res, next) => {
    if (req.session.user) {
    // res.send(`Welcome to the VIP area. ${req.session.user.name}.`);
    next()
    } else {
    res.redirect('/auth/sign-in')
    }
}

module.exports = isSignIn