let router = require('express').Router()
var Trip = require('../models/Trip')
let Destination = require('../models/Destination')
let Todo = require('../models/ThingToDo')
//var User = require('../models/User')

//GET BY ID
router.get('/api/trips/:id', (req, res, next) => {
  Trip.findById(req.params.id)
    .then(trip => {
      res.status(200).send(trip)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//Get Users Trips  
router.get('/api/trips/user/:id', (req, res, next) => {
  Trip.find({ userId: req.session.uid })
    .then(trips => {
      res.send(trips)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})


//ADD
router.post('/api/trips', (req, res, next) => {
  var trip = req.body
  trip.userId = req.session.uid
  Trip.create(trip)
    .then(newTrip => {
      res.status(200).send(newTrip)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/trips/:id', (req, res, next) => {
  Trip.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(trip => {
      res.status(200).send({ message: "Successfully Updated", trip })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/trips/:id', (req, res, next) => {
  Trip.findByIdAndRemove(req.params.id)
    .then(data => {
      Destination.deleteMany({"tripId": req.params.id})
        .then(data => {
          Todo.deleteMany({"tripId": req.params.id})
           .then(data => {
             res.status(200).send({message: "successfully deleted", data})
           })
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.put('/api/trip/publish/:id', (req, res) => {
  var options = {
    multi: true,
  }
  Trip.update({ _id: req.params.id, userId: req.session.uid }, { published: req.body.published }, options)
    .then(trip => {
      Destination.update({ tripId: req.params.id }, { published: req.body.published }, { multi: true })
        .then(destination => {
          Todo.update({tripId: req.params.id }, { published: req.body.published }, {multi: true})
            .then(todo => {
              res.status(200).send({ trip, destination, todo })
            })
        })
        .catch(err => {
          res.status(400).send({ message: 'An Error occured!', err })
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}