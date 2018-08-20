var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
let server = require('http').createServer(app)
var port = process.env.PORT || 3000


app.use(express.static(__dirname + "/../www/dist"))

var whitelist = ['http://localhost:8080', 'https://i-be-trippin.herokuapp.com']; ///change the heroku address
var corsOptions = {
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};

app.use(cors(corsOptions))

require('./db/mlab-config')

app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

let auth = require('./auth/route')
app.use(auth.session)
app.use(auth.router)


//routers here
let trips = require('./routes/Trips')
let thingstodo = require('./routes/ThingsToDo')
let destinations = require('./routes/Destinations')
let googleApi = require('./routes/Api')

app.use(googleApi.router)
app.use(trips.router)
app.use(destinations.router)
app.use(thingstodo.router)



app.get('*', (req, res, next) => {
  res.status(404).send({
    error: 'No matching routes'
  })
})


app.listen(port, () => {
  console.log('server running on port', port)
})