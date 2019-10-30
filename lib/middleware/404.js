'use strict';

/**
 * If the user goes to an unspecified route, this function will deliver a 404 error
 * The error is then sent via json and the action is terminated
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  let error = { error: 'Resource Not Found' };
  res
    .status(404)
    .json(error)
    .end();
};
