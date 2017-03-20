/*jshint node: true*/
"use strict";

var app = require('./src/js/express');
var port = process.env.PORT || 1337;

app.listen(port, function () {
    console.log('Listening on http://localhost:' + port)
});
