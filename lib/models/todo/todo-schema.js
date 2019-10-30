'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

/**
 * The todo schema is created using mongoose
 * This enables the schema to be able to use mongo's methods to perform CRUD operations
 */
const todo = mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String },
  assignee: { type: String, required: true },
  difficulty: { type: Number, required: true, default: 3 },
  complete: { type: Boolean, required: true, default: false },
});

/**
 * The todo model is exported with all of the mongoose/mongo functionality attached
 * The model is attached to the todo collection within this db, as indicated by the arguments passed in
 */
module.exports = mongoose.model('todo', todo);
