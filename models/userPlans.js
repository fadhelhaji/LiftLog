const mongoose = require('mongoose')
const { model, Schema } = mongoose

const planSchema = new Schema({
  goal: {
    type: String,
    enum: ['Maintain-weight', 'Lose-weight', 'Gain-weight'],
    required: true,
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

const Plans = model('Plans', planSchema)

module.exports = Plans
