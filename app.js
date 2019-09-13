const express = require('express');
const app = express();

/**
 * The index route.
 */
const routeIndex = require('./routes/index');
app.use('/', routeIndex);

/**
 * Launches the server.
 */
app.listen(80);