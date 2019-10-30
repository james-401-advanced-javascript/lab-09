'use strict';

const Model = require('../model.js');
const schema = require('./categories-schema.js');

/**
 * The Categories class is extended from the Model class
 * The categories schema is passed to its constructor function so that it can be constructe according to its specific schema
 */
class Categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Categories;
