var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Trip'
var ObjectId = Schema.Types.ObjectId
var Destination = require('./Destination')


let tripSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  author: { type: String },
  published: { type: Boolean, default: false },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model(schemaName, tripSchema)