var router = require('express').Router()

let axios = require('axios')

var api = axios.default.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/',
  timeout: 3000,
  withCredentials: true
})

let apiKey = 'AIzaSyAnjgM-XGIhA--DrN6jiplEl1Jk04k8CHI'

router.get('/api/locations/:query', (req, res) => {
  api.get('textsearch/json?query=' + req.params.query + '&key=' +apiKey)
    .then(place => {
      var newPlace = place.data.results.map(local => {
        return {
          formatted_address: local.formatted_address,
          geometry: local.geometry,
          name: local.name,
          place_id: local.place_id,
          photo: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +local.photos[0].photo_reference+ "&key=" + apiKey
        }
      })
      res.status(200).send(newPlace)
    })
})

router.post('/api/nearby/places', (req, res) => {
  api.get('nearbysearch/json?location='+req.body.coords+'&rankby=distance&type='+req.body.categories+'&key=' +apiKey)
  .then(place => {
    res.status(200).send(place.data)
  })
})

module.exports = {
  router
}

///nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&type=food&key=YOUR_API_KEY