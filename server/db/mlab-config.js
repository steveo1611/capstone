var mongoose = require('mongoose')
var connectionString = 'mongodb://user:test123@ds129821.mlab.com:29821/capstone-ramsey'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})