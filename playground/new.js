//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/School', (err, db) => {
    if (err) {
        return console.log('Unable to connect');
    }
    console.log('Connected');
    db.collection('Students')
        .find({ secondLanguage: 'Hindi' })
        .toArray()
        .then(
            (docs) => {
                console.log(JSON.stringify(docs, undefined, 2));
            }, (err) => {
                console.log('Unable to find ', err);
            });
    /*
    db.collection('Students').insertOne({
        name: 'Ronav',
        rollnum: 28,
        age: 6,
        sex: 'M',
        secondLanguage: 'Hindi'
    }, (err, res) => {
        if (err) { return console.log('Unable to insert'); }
        console.log(JSON.stringify(res.ops, undefined, 2));
        console.log(JSON.stringify(res.ops[0]._id.getTimestamp()))
    });
    */
    db.close();
});