const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    location: { type: String },
    dateAndTime:{ type: String },
    student_id: { type: Number }
});

module.exports = { Employee };