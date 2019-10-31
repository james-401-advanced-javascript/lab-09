'use strict';

/**
 * Middleware to handle 500 errors
 * If there is an error connecting to the server, this function will send out the appropriate response in json format
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
  let error = { error: err };
  res
    .status(500)
    .json(error)
    .end();
};
