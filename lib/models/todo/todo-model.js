'use strict';

const Model = require('../model.js');
const schema = require('./todo-schema.js');

/**
 * The Todo class is extended from the Model class
 * The todo schema is passed to its constructor function so that it can be constructe according to its specific schema
 */
class Todo extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = Todo;
