var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Destination'
var ObjectId = Schema.Types.ObjectId

let destinationSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  author: {type: String},
  photo: {type: String},
  place_id: {type: String, required: true},
  published: {type: Boolean, default: false},
  long: {type: String},
  lat:{type: String},
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: ObjectId,
    ref: 'Trip',
    required: true
  }
})

destinationSchema.pre('save', function(next) {
  this.markModified('published')
  next()
})

module.exports = mongoose.model(schemaName, destinationSchema)