const mongoose = require('mongoose');
const URL =
//replacing UserName/Password to avoid hackers 
mongoose.connect(URL, (err 'mongodb+srv://FakeUserName:123123123@cluster0.s0kwt.mongodb.net/testDB?retryWrites=true&w=majority';) => {
    if (!err)
        console.log('MongoDB connection succeeded..');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;