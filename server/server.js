const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/School');

var schoolModel = mongoose.model('School', {
    name: { type: String, required: true, minlength: 1, trim: true },
    age: { type: Number, required: true, default: 5 },
    secondLang: { type: String, required: true, default: 'Bengali' }
});

var newSchoolModel = new schoolModel({
    name: ' Ronav ', location:'Kolkata'
});

newSchoolModel.save()
    .then((res) => { console.log(JSON.stringify(res, undefined, 2)); }, (err) => { console.log(err); });