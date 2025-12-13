const mongoose = require('mongoose')
const {model, Schema} = mongoose


const userExercise = new Schema ({
    exerciseName: {
        type: String,
        required: true,
    },
    muscleName: {
        type: String,
    },

    sets: {
        type: Number
    },
    reps: {
        type: Number
    },
    weight: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Exercises = model('Exercises', userExercise)

module.exports = Exercises