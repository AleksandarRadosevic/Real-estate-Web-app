import mongoose from 'mongoose'

const Schema=mongoose.Schema;
let Location=new Schema({
    _id:{
        type:String
    },
    City:{
        type:String
    },
    Municipality:{
        type:String
    },
    Microlocation:{
        type:String
    },
    Street: {
        type:Array
    }
    
})
export default mongoose.model('Location',Location,'location')