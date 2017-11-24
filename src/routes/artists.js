const express = require('express')

const router = express.Router()
const Artist = require('../models/artist.js')

router.get('/artists', (req,res) => {
  //ask the model to list all the documents
  Artist.find() //<-- might take a while to get back to us so use .then to specify what to do when it returns the result.
    .then((artists) => { //send the results back in the response once it's loaded
      res.json(artists)
    })
})

router.get('/artists/:id', (req,res) => {
  //get the id from the url
  const id = req.params.id
  //ask the model for the document with this id
  Artist.findById(id)
    .then((artist) => {
      if (artist){
        res.json(artist)
      }
      else {
        res.status(404).json({error: `Artist not found with id: ${id}`})  
      }
    })
    .error((errorMessage) => {
      res.status(400).json({error: errorMessage})
    })
})

module.exports = router