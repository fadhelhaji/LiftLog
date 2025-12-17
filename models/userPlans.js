const mongoose = require('mongoose')
const { model, Schema } = mongoose

const planSchema = new Schema({
  goal: {
    type: String,
    enum: ['maintainWeight', 'loseWeight', 'gainWeight'],
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
