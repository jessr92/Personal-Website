/*jshint node: true, esversion: 6 */
"use strict";

const app = require('./src/js/express');
const port = process.env.PORT || 1337;

app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
});
