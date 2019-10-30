'use strict';

const mongoose = require('mongoose');

/**
 * The products schema is created using mongoose
 * This enables the schema to be able to use mongo's methods to perform CRUD operations
 */
const products = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

/**
 * The products model is exported with all of the mongoose/mongo functionality attached
 * The model is attached to the products collection within this db, as indicated by the arguments passed in
 */
module.exports = mongoose.model('products', products);
