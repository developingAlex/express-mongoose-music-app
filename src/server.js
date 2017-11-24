const express = require('express')
const server = express()
const bodyParser = require('body-parser')

//
server.use(bodyParser.json())

server.use([
  require('./routes/artists')
])

server.listen( 8001, () => {
  console.log('started at http://localhost:8001')
})