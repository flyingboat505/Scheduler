const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Personal} = require('../models/personal');

// => localhost:3000/personals/
router.get('/', (req, res) => {
    Personal.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Personals :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Personal.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Personal :' + JSON.stringify(err, undefined, 2)); }
    });
});

/*
router.get('/date/:id', (req, res) => {
    //const arr = await Personal.find( {"name": req.params.id}).exec();
    Personal.find({ name: req.params.id.toString()}, function (err, docs) {
        if(!err) {res.send(docs);}
        else {res.status.send('Error')}
    });
});
*/

router.post('/', (req, res) => {
    var emp = new Personal({
        name: req.body.name,
        position: req.body.position,
        location: req.body.location,
        id: req.body.id,
        date: req.body.date,
        time: req.body.time
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Personal Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        position: req.body.position,
        location: req.body.location,
        id: req.body.id,
        date: req.body.date,
        time: req.body.time
    };
    Personal.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Personal Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Personal.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Personal Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;