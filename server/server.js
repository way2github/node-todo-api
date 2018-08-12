var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Student } = require('./models/student');

var app = express();

app.use(bodyParser.json());

app.post('/student', (req, res) => {
    console.log(req.body);
    var newStudent = new Student({
        name: req.body.name,
        age: req.body.age
    });
    newStudent.save().then((doc) => {res.status(201).send(doc);}, (err) => {res.status(400).send(err);})
});

app.listen(3000, () => {
    console.log('Started on Port 3000');
});

module.exports = {app};