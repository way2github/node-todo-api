mongod --dbpath d:\MONGODB\mongo-data\

mongo
db.Todos.insert({text: 'Create new Node course'})
db.Todos.find()

==========================================================================
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    db.collection('Todos').insertOne({
        text: 'Something to work on',
        completed: false
    }, (err, res) => {
        if (err) {
            return console.log('Unable to insert data', err);
        }
        console.log(JSON.stringify(res.ops, undefined, 2));
		console.log(JSON.stringify(res.ops[0]._id.getTimestamp()))
    });
	
	db.close();
});
==========================================================================
Object destructuring: 
var user = {name: 'ayan', age: '32'};
var {name} = user; // name will contain 'ayan'

const {MongoClient, ObjectID} =  require('mongodb');
var obj = new ObjectID();

==========================================================================
Fetch docs:

db.collection('Students').find({name: 'some name'}).toArray().then(
        (docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to find ', err);
        });
		
db.collection('Students').find({_id: new ObjectID('some id')}).toArray().then(
        (docs) => {
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to find ', err);
        });

db.collection('Students').find().count().toArray().then(
        (docs) => {
            console.log(`count: ${count}`);
        }, (err) => {
            console.log('Unable to find ', err);
        });
==========================================================================
Delete docs:

db.collection('Students').deleteOne({ secondLanguage: 'Bengali' })
        .then((res) => {
            console.log(JSON.stringify(res, undefined, 2));
            console.log('### Delete done ###');
        },
            (err) => { console.log(err); });

// Delete all
db.collection('Students').deleteMany();

db.collection('Students').findOneAndDelete({ secondLanguage: 'Bengali' })
        .then((res) => {
            console.log(JSON.stringify(res.value.name, undefined, 2));
            console.log('### Delete done ###');
        },
            (err) => { console.log(err); });

==========================================================================

// Update
    db.collection('Students')
        .findOneAndUpdate({name: 'Ronav'}, {$set: {name: 'Arya', home: 'Bangur'}, {$inc: {age: 1}}}, {returnOriginal: false})
        .then(
            (docs) => {
                console.log(JSON.stringify(docs, undefined, 2));
                console.log(`### Update done ### \nname changed to ${docs.value.name}`);
            }, (err) => {
                console.log('Unable to find ', err);
            });
			
==========================================================================

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/School');

var schoolModel = mongoose.model('School', {
    name: { type: String, required: true, minlength: 1, trim: true },
    age: { type: Number, required: true, default: 5 },
    secondLang: { type: String, required: true, default: 'Bengali' }
});

var newSchoolModel = new schoolModel({
    name: ' Ronav '
});

newSchoolModel.save()
    .then((res) => { console.log(JSON.stringify(res, undefined, 2)); }, (err) => { console.log(err); });
	

===========================================================================

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
    newSchool.save().then((doc) => {res.send(doc);}, (err) => {res.status(400).send(err);})
});

app.listen(3000, () => {
    console.log('Started on Port 3000');
});