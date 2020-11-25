var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({

    name:{
        type: String,
        required:true
    },
    registrationNo:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Student',StudentSchema);