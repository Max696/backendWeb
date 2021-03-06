const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
//const cors = require("cors");

var { Messure } = require('../../models/messure')

//router.use(cors);

router.get('/', (req, res) => {
    Messure.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error al buscar los parametros : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new Messure({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    Messure.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    Messure.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})


module.exports = router