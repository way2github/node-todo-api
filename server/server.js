var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { SchoolModel } = require('./models/school');

var app = express();

app.use(bodyParser.json());

app.post('/school', (req, res) => {
    console.log(req.body);
    var newSchool = new SchoolModel({
        name: req.body.name
    });
    newSchool.save().then((doc) => {res.status(201).send(doc);}, (err) => {res.status(400).send(err);})
});

app.listen(3000, () => {
    console.log('Started on Port 3000');
});