const mongoose = require('mongoose')
const {model, Schema} = mongoose


const userData = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    exerciseId: [
        {
        type: Schema.Types.ObjectId,
        ref: "Exercises",
        }
    ],
    planId: 
        {
        type: Schema.Types.ObjectId,
        ref: "Plans",  
        },
})

const User = model('User', userData)

module.exports = User