import mongoose from 'mongoose'

const Schema=mongoose.Schema;
let Agency=new Schema({
    Type :
    {
        type:String
    },
    Name :
    {
        type:String
    },
    PIB :
    {
        type:String
    },
    City :
    {
        type:String
    },
    Address :
    {
        type:String
    },
    Phone :
    {
        type:String
    },
    
})
export default mongoose.model('Agency',Agency,'agency')