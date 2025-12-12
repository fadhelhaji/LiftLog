const mongoose = require('mongoose')
const {model, Schema} = mongoose


const userMeal = new Schema ({
    mealName: {
        type: String,
        required: true,
    },
    protein: {
        type: Number,
    },

    carbs: {
        type: Number
    },
    fat: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Meals = model('Meals', userMeal)

module.exports = Meals