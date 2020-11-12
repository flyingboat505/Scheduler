const mongoose = require('mongoose');
const URL = 'mongodb+srv://JasonThan:1234@cluster0.s0kwt.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(URL, (err) => {
    if (!err)
        console.log('MongoDB connection succeeded..');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;