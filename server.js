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
const foodRoute = require('./models/')

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
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

app.use(passUserToView);


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}
conntectToDB() // connect to database








// Routes go here
app.get('/', async (req,res)=>{
    const user = req.session.user;
    res.render('index.ejs')    
})


app.use('/auth', authCtrl)

app.use(isSignIn)

app.use('/dashboard', foodRoute)
















app.listen(3000,()=>{
    console.log('App is running on port 3000')
}) // app will be waiting for requests on port 3000
