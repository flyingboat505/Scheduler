const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    location: { type: String },
    id: { type: Number },
    date: { type: String },
    time: { type: String }
});

module.exports = { Employee };