const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId
//const cors = require("cors");

var { PostMessage } = require('../../models/postMessage')

//router.use(cors);

router.get('/', (req, res) => {
    PostMessage.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error, no se ha encontrado ningun registro ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new PostMessage({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error al crear la nota : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No se ha encontrado el registro : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error al actualizar el registro : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No se ha encontrado ningun registro: ' + req.params.id)

    PostMessage.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error al eliminar el registro: ' + JSON.stringify(err, undefined, 2))
    })
})


module.exports = router