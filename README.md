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
1. [There is a good illustration of the differences between MongoDB and rails' active records](https://github.com/Coder-Academy-Patterns/mongoose-vs-activerecord)
1. 