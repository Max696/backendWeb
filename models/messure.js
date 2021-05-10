const mongoose = require('mongoose')

var Messure = mongoose.model('Messure',
{
    title : {type:String},
    message : {type:String},
},'messure')

module.exports = { Messure}