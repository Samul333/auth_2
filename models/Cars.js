const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    brand:{
        type:String,
        required:true,
        
    },
    year:{
        type:Number,
        required:true
    }
})

const Car = mongoose.model('Car',carSchema)
module.exports={Car}