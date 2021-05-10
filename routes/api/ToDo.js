
 
 const express = require("express");
 const app = express();
 var router = express.Router();
 //const bodyParser = require("body-parser");
 //router.use(bodyParser.json());
 var ObjectID = require('mongoose').Types.ObjectId;

 const ToDo  = require("../../models/ToDo");


 router.get("/", async (req, res, next) => {
  ToDo.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
})
})


router.post('/', (req, res) => {
  var newRecord = new ToDo({
      task: req.body.task,
      completed: req.body.completed
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
      task: req.body.task,
      completed: req.body.completed
  }

  ToDo.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
      if (!err) res.send(docs)
      else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
  })
})


router.delete('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id))
      return res.status(400).send('No record with given id : ' + req.params.id)

  ToDo.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs)
      else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
  })
})



router.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});


 module.exports = router;