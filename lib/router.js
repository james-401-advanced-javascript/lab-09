'use strict';

const cwd = process.cwd();
const express = require('express');
const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);
const router = express.Router();

/**
 * Adds callback triggers to model route
 * When a request is sent to the /model route, the modelFinder.load function is executed
 */
router.param('model', modelFinder.load);

/**
 * Base route on server. Simply returns the string "Homepage".
 * @route GET /
 * @security basicAuth
 * @returns {string} - Homepage
 */
router.get('/', (req, res, next) => {
  res.send('Homepage');
});

/**
 * Describes behavior for accessing /models route
 * Calls list function in the model-finder module
 * The function then returns a 200 status and the results of the modelFinder list function in json format
 * @route GET /models
 * @security basicAuth
 * @returns {200} - Successful connection
 * @returns {json} - model
 */
router.get('/models', (req, res, next) => {
  modelFinder.list().then(models => res.status(200).json(models));
});

/**
 * Describes behavior for sending a get request to the /:model/schema endpoint
 * A status 200 is sent with the response
 * Then a json response is send the return value of the jsonSchema method located on the model property on the request
 * @route GET /:model/schema
 * @security basicAuth
 * @returns {200} - Successful connection
 * @returns {jsonSchema}
 */
router.get('/:model/schema', (req, res, next) => {
  res.status(200).json(req.model.jsonSchema());
});

/**
 * Describes behavior for sending a get request to the /:model endpoint
 * The handleGetAll function is called when the particular model is accessed at this path
 * @route GET /:model
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.get('/:model', handleGetAll);

/**
 * Describes behavior for sending a post request /:model endpoint
 * The handlePost function is called when the particular model is accessed at this path
 * @route POST /:model
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.post('/:model', handlePost);

/**
 * Describes behavior for sending a get request to the /:model endpoint
 * The handleGetOne function is called when the particular model is accessed at this path
 * @route GET /:model/:id
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.get('/:model/:id', handleGetOne);

/**
 * Describes behavior for sending a put request to the /:models endpoint
 * The handlePut function is called when the particular model is accessed at this path
 * @route PUT /:model/:id
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.put('/:model/:id', handlePut);

/**
 * Describes behavior for sending a delete request to the /:model/:id endpoint
 * The handleDelete function is called when the particular model is accessed at this path
 * @route DELETE /:model/:id
 * @security basicAuth
 * @returns {200} - Successful connection
 */
router.delete('/:model/:id', handleDelete);

/**
 * This asynchronous function calls the get method located on the model property of the request object
 * The results are then put into and object called output which holds a count property and a results property
 * The count property contains the length property of the returned data
 * The results property stores the data itself
 * A response of 200 is sent back to the client
 * And the output object is sent back as well in json format
 * @function handleGetAll()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handleGetAll(req, res, next) {
  req.model
    .get()
    .then(data => {
      const output = {
        count: data.length,
        results: data,
      };
      res.status(200).json(output);
    })
    .catch(next);
}

/**
 * This asynchronous function calls the get method located on the model property of the request object
 * The id located on the params property is passed to the get function
 * A response of 200 is sent back to the client
 * And the first index in the results array is sent back in JSON format
 * @function handleGetOne()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handleGetOne(req, res, next) {
  req.model
    .get(req.params.id)
    .then(result => res.status(200).json(result[0]))
    .catch(next);
}

/**
 * This asynchronous function calls the create method located on the model property of the request object
 * The body of the request is passed to the create function
 * A response of 200 is sent back to the client
 * And the results are sent back in JSON format
 * @function handlePost()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handlePost(req, res, next) {
  req.model
    .create(req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * This asynchronous function calls the update method located on the model property of the request object
 * The id located on the params property is passed to the get function along with the request body
 * A response of 200 is sent back to the client
 * And the results are sent back in JSON format
 * @function handlePut()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handlePut(req, res, next) {
  req.model
    .update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(next);
}

/**
 * This asynchronous function calls the delete method located on the model property of the request object
 * The id located on the params property is passed to the get function
 * A response of 200 is sent back to the client
 * And the results are sent back in JSON format
 * @function handleDelete()
 * @param {object} req
 * @param object res
 * @param object next
 */
function handleDelete(req, res, next) {
  req.model
    .delete(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(next);
}

module.exports = router;
