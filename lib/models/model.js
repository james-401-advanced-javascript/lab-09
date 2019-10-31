'use strict';

/**
 * The Model class is constructed
 * @param {object} - JSON Schema
 */
class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * This function first console logs the type of object jsonSchema is
   * Then if jsonSchema is a function, the function is called
   * If jsonSchema is not a function, and empty object is returned
   * @function jsonSchema()
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  /**
   * This function takes an id as a parameter
   * If there is an id, that value is placed in a queryObject variables, otherwise that variable is an empty object
   * That object is then passed to mongo's find function and the operation is performed on the current instances db
   * @function get(_id)
   * @param {id} _id
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
   * This function takes an object as a parameter
   * It then console logs the argument passed in
   * Then it validates the object according to the current model's schema and places that in a newRecord variable
   * The newRecord variable is then console logged and saved in the model's db
   * @function create()
   * @param {object} record
   */
  create(record) {
    console.log('r', record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   * This function takes an id and an object as parameters
   * It then finds the document within the db that matches that id and updates the document with the object passed on
   * Then an object with "new" property with a value of true is also added to the document
   * @function update
   * @param {id} _id
   * @param {object} record
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * This function takes an id as a parameter
   * It then finds the document in the db matching that id and deletes it from the model
   * @function delete
   * @param {id} _id
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;
