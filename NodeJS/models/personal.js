const mongoose = require('mongoose');

var Personal = mongoose.model('Personal', {
    name: { type: String },
    position: { type: String },
    location: { type: String },
    id: { type: Number },
    date: { type: String },
    time: { type: String }
});

module.exports = { Personal };