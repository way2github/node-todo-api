const mongoose = require('mongoose');

var Student = mongoose.model('Student', {
    name: { type: String, required: true, minlength: 1, trim: true },
    age: { type: Number, required: true, default: 5 },
    secondLang: { type: String, required: true, default: 'Bengali' }
});

module.exports = { Student };