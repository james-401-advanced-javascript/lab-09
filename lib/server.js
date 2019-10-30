'use strict';

// Get the current working directory for the application
const cwd = process.cwd();

// Prepare the Express app
const express = require('express');
const app = express();

// External Resources
const mongoose = require('mongoose');
const errorHandler = require(`${cwd}/lib/middleware/500.js`);
const notFound = require(`${cwd}/lib/middleware/404.js`);
const router = require(`${cwd}/lib/router.js`);

/**
 * This function ensures that all requests and responses to and form the server are converted to JSON objects
 * This is an express specific function
 * @function express.json()
 */
app.use(express.json());

/**
 * This is a built-in middleware function in Express that parses incoming requests with urlencoded payloads and is based on body-parser.
 * It returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
 * @function express.urlencoded()
 * @param {object}
 */
app.use(express.urlencoded({ extended: true }));

/**
 * This is allowing express routing to be used within the server.js file
 * A collection of endpoints related to a specified route or path
 */
app.use(router);

// TODO: Comment
app.use(notFound);
app.use(errorHandler);

// TODO: JSDoc Comment
const start = port => {
  app.listen(port || process.env.PORT || 3000, () => {
    console.log(`Server Running on Port ${port || process.env.PORT || 3000}`);
  });

  const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.MONGODB_URI, config);
};

module.exports = { server: app, start: start };
