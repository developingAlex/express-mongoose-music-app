## Models

### Artist
* name

## steps performed in class:
1. installed mongodb by following the instructions on [MongoDBs site](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) (linux/ubuntu context)
    1. You can ensure that it's running (on linux) by using the command `ps -aux | grep mongo`
1. mongo has good replication and high availability
1. In project directory (which is pretty empty initially) ran `yarn init`
1. run `yarn add express`
1. This repository's 2nd commit is an example of a standard starting point for my apps
1. run `yarn add nodemon --dev` (the dev means it will only apply when we're developing)
1. create boilerplate code in src/server.js
    ```javascript
    const express = require('express')
    const server = express()

    server.listen( 8001, () => {
      console.log('started at http://localhost:8001')
    })
    ```
1. Add to the package.json file (which is created by the `yarn init` command) the alias for `yarn dev` as a shorthand for `nodemon /src/server.js`
    ```javascript
    ,
    "scripts": {
      "dev": "nodemon src/server.js"
    }
    ```
1. check the server works by executing `yarn dev`
1. In order to make use of mongodb we run `yarn add mongoose` (we'll be using it in a manner analogous to our simple hard coded array in yesterdays exercise) (**mongoose** is preferred because it adds some 'extra stuff'(validation, castin & business logic) over **mongodb**)
1. if you get an error when you attempt to do a `yarn add …` it could be that you have a typo in your **package.json** file.
1. create a file in a **src/models** folder called **init.js** and add the following code taken from [mongoosejs site](http://mongoosejs.com/):
    ```javascript
    const mongoose = require('mongoose')

    //localhost/test for our development but would be specified with env variables for production…
    mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
    // use the built in promise library/functionality built into node.js
    mongoose.Promise = global.Promise;

    module.exports = mongoose
    ```
1. created our **src/models/artist.js** file. making use of the mongoose library and following the example at the [mongoosejs site](http://mongoosejs.com/)
1. our src/models/artist.js file now looks like:
    ```javascript
    //ensure we have an established connection to the db
    const mongoose = require('./init') // works from the 'module.exports = mongoose' line in init.js

    // (This code came from the example at mongoosejs.com)
    // define our model
    const Artist = mongoose.model('Artist', {name: String});

    module.exports = Artist
    ```
1. create a seeds file like we used in rails (in src/models/seeds.js)
    ```javascript
    const Artist = require('./artist')

    //list all artists
    Artist.find() //mongodb calls .all .find, (… .find is mongodb version of rails' .all)
      .then((artists) => {
        console.log('Artists:', artists)
      })
    ```
1. Test that it all works properly by executing `node src/models/seeds.js`
    1. if it doesn't output something like `Artists: []` then it could mean that your mongodb service isn't running, check with `ps -aux | grep mongo` (if on linux) and if not running run `sudo service mongod start` (again if on linux)
    1. Other (linux) commands that may be useful:
        * `sudo service mongod stop` - stop the MongoDB background service
        * `sudo service mongod restart` - restart the MongoDB background service
1. (Note that we don't need to do anything analogous to rails' **db:migrate** with MongoDB)
1. Add some new artists to the seeds file:
    ```javascript
    Artist.create({ name: 'Tiesto'})
    //when the creation is done, the below will be called
    .then((artist) => {
      console.log('created artist', artist)
    })
    ```
1. ran `node src/models/seeds.js` for the second time, too long to type so adding it to our **package.json** scripts for `yarn seed` shorthand
    ```javascript
    "seed": "node src/models/seeds.js"`
    ```
1. Note: MongoDB stores the model id is as a randomly hashed id (as oppposed to incrementing integer id like we had before in our rails apps) so there is no risk of there being a conflict when you have multiple mongodb servers working away adding different new data to themselves.
1. After we ran the `node src/models/seeds.js` or `yarn seed` command we want to comment out the create statements that were run so that they don't run in subsequent runs.
    * The output after a few creations the execution of `yarn seed` produces an output like this:
        ```
        Artists: [ { _id: 5a1768a337d7dc78cca67953, name: 'Tiesto', __v: 0 },
        { _id: 5a176abe9450297b1c736a54, name: 'CirezD', __v: 0 } ]
        ```
    * The `__v` is used to help the mongo db resolve conflicts when it gets multiple instructions to update a particular model.
    * The double underscore in the name `__v` is convention to say, 'dear programmer: don't mess with this manually'
1. [There is a good illustration of the differences between MongoDB and rails' active records](https://github.com/Coder-Academy-Patterns/mongoose-vs-activerecord)
1. created a routes folder **src/routes**
1. create **src/routes/artists.js**
1. bring in express to that and create a new instance of express router:
    ```javascript
    const express = require('express')

    const router = express.Router()

    router.get('/artists', (req,res) => {

    })

    module.exports = router
    ```
1. Prettier is a useful tool to make your code look better recommended in class.
1. After 'bringing in' our Artist model, our code now looks like this:
    ```javascript
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

    module.exports = router
    ```
1.  Added a find artist by id function to **src/routes/artists.js**:
    ```javascript
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
    ```
1. Make the server.js file aware of our new Artist routes by adding the following above the server.listen block:
      ```javascript
      server.use([
        require('./routes/artists')
      ])
      ```
1. You should now be able to visit your localhost in a browser and see something at `http://localhost:8001/artists` (where 8001 is the port number you declared in your **server.js** file)
1. Moving onto making a post method for the artists route to create a new artist, we need to add the ability to parse the content of the request from the user browser<br>
Run in a terminal:
    ```
    yarn add body-parser
    ```
1. on the server.js file you can then bring it in with these lines of code:
    ```javascript
    const bodyParser = require('body-parser')


    server.use(bodyParser.json())

    ```
1. in the routes/artists.js file:
    ```javascript
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
    ```
1. Challenges were to create on our own the Delete and Update methods
1. My **delete** method was this:
    ```javascript
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
    ```
1. and my **update** method was this:
    ```javascript
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
    ```
    * A note on the way I've implemented the update method:<br>This was taken from some code examples I found either online or in the mongoosejs documentation.<br>It is considered the older way of handling the errors with the function (err, raw) within the parameters of the Artist.update call.<br>The modern way is to use the .then and .catch functions you see elsewhere in this code.