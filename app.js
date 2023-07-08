const express = require('express');
const app = express();

app.use('/', function (req, res, next) {
    res.status(200).sendFile('index.html', { root: __dirname })
})

app.use(function (req, res, next) {
    res.status(403).send('403 Forbidden')
});

module.exports = app;
