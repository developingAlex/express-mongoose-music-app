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
    .catch((errorMessage) => {
      res.status(400).json({error: errorMessage})
    })
})

router.post('/artists', (req, res) =>{
  const attributes = req.body
  Artist.create(attributes)
    .then((artist) => {
      res.status(201).json(artist)
    })
    .catch((errorMessage) => {
      res.status(400).json({error: errorMessage})
    })
})

router.patch('/artists/:id', (req, res) => {
  const id = req.params.id
  const attributes = req.body

  Artist.findById(id)
    .then((artist) => {
      if (artist){
        //this form of code, where you have function(err, raw) within the parameters of Artist.update is the older style of handling the errors, the .then and .catch are the modern way of handling the errors and they are interchangeable.
        Artist.update(artist, attributes, function (err, raw) {
          if (err){
            res.status(400).json({error: err})
          } 
            res.json(artist)
            console.log('The raw response from Mongo was ', raw);
        });

      }
      else{
        res.status(404).json({error: `Artist not found with id: ${id}`})
      }
    })


    // .then((artist) => {
    //   res.status(200).json(artist)
    // })
    // .catch((errorMessage) => {
    //   res.status(400).json({error: errorMessage})
    // })
})

router.delete('/artists/:id', (req, res) => {
  const id = req.params.id
  Artist.findById(id)
  .then((artist) => {
    if (artist){
      Artist.remove(artist, function(err) {
        if (err) {
          res.status(400).json({error: err}) 
        }
        //deleted by this point
      })
      res.json(artist)
    }
    else {
      res.status(404).json({error: `Artist not found with id: ${id}`})  
    }
  })
  .catch((errorMessage) => {
    res.status(400).json({error: errorMessage})
  })
})

module.exports = router