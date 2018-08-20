var router = require('express').Router()
var Destination = require('../models/Destination')
var ThingToDo = require('../models/ThingToDo')

router.get('/api/destinations/:userId/user', (req, res) => {
  Destination.find({
    userId: req.session.uid
  })
    .then(destination => {
      res.status(200).send(destination)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})
//get all published
router.get('/api/destinations/:placeId/place', (req, res) => {
  Destination.find({
    place_id: req.params.placeId,
    published: true
  })
    .then(destinations => {
      res.status(200).send(destinations)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//GET BY ID
router.get('/api/destinations/:id', (req, res, next) => {
  Destination.findById(req.params.id)
    .then(destination => {
      res.status(200).send(destination)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//get by trip Id
router.get('/api/trips/:id/destinations', (req, res, next) => {
  Destination.find({ tripId: req.params.id })
    .then(trips => {
      console.log(trips)
      res.send(trips)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

//ADD
router.post('/api/destinations', (req, res, next) => {
  var destination = req.body
  destination.userId = req.session.uid
  Destination.create(destination)
    .then(newDestination => {
      res.status(200).send(newDestination)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//EDIT
router.put('/api/destinations/:id', (req, res, next) => {
  Destination.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(destination => {
      res.status(200).send({ message: "Successfully Updated", destination })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//DESTROY
router.delete('/api/destinations/:id', (req, res, next) => {
  Destination.findByIdAndRemove(req.params.id)
    .then(data => {
      ThingToDo.deleteMany({ "tripId": req.params.id })
        .then(data => {
          res.status(200).send({ message: "successfully deleted", data })
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})



//make a destination public
router.put('/api/destination/publish/:id', (req, res) => {
  Destination.update({ destinationId: req.params.id, userId: req.session.uid }, { published: req.body.published }, { multi: true })
    .then(destination => {
      ThingToDo.update({ destinationId: req.params.id }, { published: req.body.published }, { multi: true })
        .then(todos => {
          res.status(200).send({ todos, destination })
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