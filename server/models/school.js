const mongoose = require('mongoose');

var SchoolModel = mongoose.model('School', {
    name: { type: String, required: true, minlength: 1, trim: true },
    age: { type: Number, required: true, default: 5 },
    secondLang: { type: String, required: true, default: 'Bengali' }
});

module.exports = {SchoolModel};