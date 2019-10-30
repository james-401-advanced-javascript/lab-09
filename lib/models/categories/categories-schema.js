'use strict';

const mongoose = require('mongoose');

/**
 * The categories schema is created using mongoose
 * This enables the schema to be able to use mongo's methods to perform CRUD operations
 */
const categories = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

/**
 * A virtual property named "tasks" is added to the categories model
 */
categories.virtual('tasks', {
  ref: 'todo',
  localField: 'name',
  foreignField: 'category',
  justOne: false,
});

/**
 * This function will try to call the populate function on the model passing in the string 'tasks' as an argument
 * If this isn't able to happen, the error is printe to the console
 * @function populateTasks()
 */
const populateTasks = function() {
  try {
    this.populate('tasks');
  } catch (e) {
    console.error('Find Error', e);
  }
};

/**
 * A pre hook is added to the categories model
 * Before any find operation is performed, the populateTasks function is called
 */
categories.pre('find', populateTasks);

/**
 * Finally, the categories model is exported with all of the mongoose/mongo functionality attached
 * The model is attached to the categories collection within this db, as indicated by the arguments passed in
 */
module.exports = mongoose.model('categories', categories);
