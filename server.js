'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    morgan = require('morgan'),
    bodyparser = require('body-parser'),
    csv = require('csv-parser'),
    fs = require('fs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json);

app.use(function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if('OPTIONS' === req.method){
        res.send(200)
    }

    next();
});

app.get('/', function(req, res){
    res.status(200);
    res.json({ message: 'Sort.io: Basic service for extracting data from CSV and classifying it.'});
});

app.use(function(req, res){
    res.status(404).send({ 404: `${req.originalUrl} not found!` });
});

app.listen(port);

console.log(`Sort.io started on ${port}`);
var _data = [];
fs.createReadStream("/Users/banso/Desktop/Dev/Sort.io/HACK BHU '18.csv")
  .pipe(csv())
  .on('data', function (data) {
      _data.push(data);
  });

  setTimeout(() => {
      console.log(_data);
  }, 5000);