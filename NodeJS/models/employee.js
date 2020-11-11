const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    position: { type: String },
    location: { type: String },
    student_id: { type: Number },
    dateAndTime: { type: String }
});

module.exports = { Employee };