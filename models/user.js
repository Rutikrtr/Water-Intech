const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    date:{
        type:String,
        required: true,
    },
    WaterIntech:{
        type:Number,
        required:true,
        trim:true,
        min: 0, 
        max: 3000 
    },
    lastSubmission:{
        type:Date
    }
});

module.exports = mongoose.model("user",userSchema)