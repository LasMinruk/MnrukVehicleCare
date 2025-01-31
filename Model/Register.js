//monoose ekata add karaganawa
const mongoose = require('mongoose');

//add karagatta mongose eka scema ekata assign karaganawa
const Schema = mongoose.Schema;

const regiSchema = new Schema({
    name:{
        type:String,    //dataType
        required:true, //validate
    },

    gmail:{
        type:String,    //dataType
        required:true, //validate
    },



    password:{
        type:String,    //dataType
        required:true, //validate
    }
});

module.exports = mongoose.model(
    "Register5", //file Name
    regiSchema // function name
)