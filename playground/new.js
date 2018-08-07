//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/School', (err, db) => {
    if (err) {
        return console.log('Unable to connect');
    }
    console.log('Connected');
    // Delete all
    db.collection('Students').deleteMany();

    // Create
    db.collection('Students').insertMany([
        { name: 'Ronav', gender: 'M', secondLanguage: 'Hindi' },
        { name: 'Arnesh', gender: 'M', secondLanguage: 'Hindi' },
        { name: 'Avery', gender: 'F', secondLanguage: 'Bengali' },
        { name: 'Debangi', gender: 'F', secondLanguage: 'Bengali' }],
        (err, res) => {
            if (err) { return console.log('Unable to insert'); }
            console.log(JSON.stringify(res.ops, undefined, 2));
            console.log(JSON.stringify(res.ops[0]._id.getTimestamp()));
            console.log('### Create done ###');
        });


    // Read
    db.collection('Students')
        .find({ secondLanguage: 'Hindi' })
        .toArray()
        .then(
            (docs) => {
                console.log(JSON.stringify(docs, undefined, 2));
                console.log('### Read-1 done ###');
            }, (err) => {
                console.log('Unable to find ', err);
            });


    // Delete
    db.collection('Students').findOneAndDelete({ secondLanguage: 'Bengali' })
        .then((res) => {
            console.log(JSON.stringify(res.value.name, undefined, 2));
            console.log('### Delete done ###');
        },
            (err) => { console.log(err); });


    // Read
    db.collection('Students')
        .find()
        .toArray()
        .then(
            (docs) => {
                console.log(JSON.stringify(docs, undefined, 2));
                console.log('### Read-2 done ###');
            }, (err) => {
                console.log('Unable to find ', err);
            });

    // Update

    db.close();
});