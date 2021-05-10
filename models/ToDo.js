const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        unique: true,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    }
});



module.exports = ToDo = mongoose.model("todo", todoSchema);