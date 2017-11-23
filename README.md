* installed mongodb by following the instructions on [MongoDBs site](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
* mongo has good replication and high availability
* In project directory (which is pretty empty initially) ran `yarn init`
* run `yarn add express`
* This repository's init commit is an example of a standard starting point for my apps
* run `yarn add nodemon --dev` (the dev means it will only apply when we're developing)
* create boilerplate code in src/server.js
* Add to the package.json file (which is created by the `yarn init` command) the alias for `yarn dev` as a shorthand for `nodemon /src/server.js`
  ```javascript
  ,
  "scripts": {
    "dev": "nodemon src/server.js"
  }
  ```
