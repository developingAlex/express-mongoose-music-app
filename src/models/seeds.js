const Artist = require('./artist')

//list all artists
Artist.find() //mongodb calls .all .find, (… .find is mongodb version of rails' .all)
  .then((artists) => {
    console.log('Artists:', artists)
  })

// Artist.create({ name: 'Tiesto'})
//   //when the creation is done, the below will be called
//   .then((artist) => {
//     console.log('created artist', artist)
//   })

// Artist.create({ name: 'CirezD'})
//   //when the creation is done, the below will be called
//   .then((artist) => {
//     console.log('created artist', artist)
//   })