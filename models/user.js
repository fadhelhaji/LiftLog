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

    age: {
        type: Number
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
})

const User = model('User', userData)

module.exports = User