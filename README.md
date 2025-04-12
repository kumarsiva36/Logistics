# MongoDB Express React NodeJS (MERN) Reference Implementation

This is an example implementation of a restaurant review application using the Express, Node.JS, React and MongoDB (MERN) stack.

The following technologies are used:

* MongoDB for the database
* Express and Node.JS for the backend API
* React for the client

## Prerequisites

The following are required:

* MongoDB Atlas account with the sample dataset loaded onto a cluster (includes database logistics)
* Node.JS (tested with v18.18.0)

The backend and frontend are setup with npm and npx

### Backend

Create with ```npm```

```
$ mkdir Logistics
$ cd Logistics
$ npm init -y
```

The following modules can then be installed

```
$ npm install express cors mongodb dotenv
$ npm install body-parser
$ npm install express-validator
$ npm install -g nodemon
```

Configure the ```.env``` file with the MongoDB Atlas connection URL. This should point to the example ```logistics``` database that is available to install when a cluster is setup. 

The URL can be obtained within the MongoDB Atlas UI. Select the cluster > Connect > Connect your application.

```
DB_URL=mongodb://localhost:27017/logistics
PORT=5000
LOCALCODE=en-IN
```
## Running this Implementation

### Start the NodeJS and Express Backend

Run

```
$ nodemon server
```

Nodemon will listen for file changes and automatically update the application without needing to restart. The server starts on port 5000.

