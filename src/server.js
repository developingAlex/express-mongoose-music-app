const express = require('express')
const server = express()


server.use([
  require('./routes/artists')
])

server.listen( 8001, () => {
  console.log('started at http://localhost:8001')
})