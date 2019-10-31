'use strict';

const Model = require('../model.js');
const schema = require('./products-schema.js');

/**
 * The Products class is extended from the Model class
 * The products schema is passed to its constructor function so that it can be constructe according to its specific schema
 */
class Products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Products;
