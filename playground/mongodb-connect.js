const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/MyDB', (err, db) => {
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
    });

    db.collection('Users').insertOne({
        name: 'Ayan',
        age: 32,
        location: 'Kolkata'
    }, (err, res) => {
        if (err){
            return console.log('Unable to insert data', err);
        }
        console.log(JSON.stringify(res.ops, undefined, 2));
    })

    db.close();
});