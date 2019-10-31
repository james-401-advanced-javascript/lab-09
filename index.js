'use strict';

require('dotenv').config();

/**
 * Simply import the server.js file and start the server.
 * 
 */
require('./lib/server.js').start(process.env.PORT);
