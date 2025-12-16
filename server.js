// imports
const express = require("express") //importing express package
const app = express() // creates a express application
require("dotenv").config() // allows us to use the .env variables
const mongoose = require("mongoose") // importing mongoose
const morgan = require("morgan")
const methodOverride = require("method-override")
const User = require('./models/user')
const authCtrl = require('./controllers/auth')
const session = require('express-session')
const isSignIn = require('./middleware/isSignIn')
const {MongoStore} = require("connect-mongo");
const passUserToView = require("./middleware/pass-user-to-view.js");
const mealsCtrl = require('./controllers/meals.js')
const exercisesCtrl = require('./controllers/exercises.js')
const publicCtrl = require('./controllers/public.js');
const userPlansCtrl = require('./controllers/userPlans.js')
const userCtrl = require('./controllers/profile.js')


// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);
app.use((req, res, next) => {
  res.locals.path = req.path
  next()
})

async function conntectToDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}
conntectToDB() // connect to database


app.use(passUserToView);

// Public routes
app.use('/', publicCtrl);
app.use('/auth', authCtrl);


// Protected routes
app.use(isSignIn);
app.use('/profile', userCtrl);
app.use('/meals', mealsCtrl);
app.use('/exercises', exercisesCtrl);
app.use('/plans', userPlansCtrl)

app.listen(3000,()=>{
    console.log('App is running on port 3000')
})
