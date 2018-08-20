var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'ThingsToDo'
var ObjectId = Schema.Types.ObjectId

let commentSchema = new Schema({
  author: { type: String },
  comment: { type: String, required: true },
  photo: { type: String },
  userId: { type: String },
  long: { type: String },
  lat: { type: String }
})

let todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  gallery: [{ type: String }],
  categories: [{
    type: String, required: true
  }],
  place_id: { type: String, required: true },
  rating: { type: Number },
  published: { type: Boolean, default: true },
  long: { type: String},
  lat: { type: String},
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: ObjectId,
    ref: 'Trip',
    required: true
  },
  destinationId: {
    type: ObjectId,
    ref: 'Destination',
    required: true
  },
  comments: [commentSchema]
})

todoSchema.pre('save', function(next) {
  this.markModified('comments')
  next()
})

module.exports = mongoose.model(schemaName, todoSchema)