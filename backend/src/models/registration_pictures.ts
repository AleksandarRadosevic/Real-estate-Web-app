import mongoose from 'mongoose'

const Schema=mongoose.Schema;
let RegPicture=new Schema({
    filename :
    {
        type:String
    },
    username :
    {
        type:String
    }
    
})
export default mongoose.model('RegPicture',RegPicture,'registration_pictures')