const Artist = require('./artist')

//list all artists
Artist.find() //mongodb calls .all .find, (… .find is mongodb version of rails' .all)
  .then((artists) => {
    console.log('Artists:', artists)
  })