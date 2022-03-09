import mongoose from 'mongoose'

const Schema=mongoose.Schema;
let User=new Schema({
    firstname :
    {
        type:String
    },
    lastname :
    {
        type : String
    },
    username:{
        type : String
    },
    password:{
        type : String
    },
    type : {
        type:String
    },
    city : {
        type:String
    },
    birthdate : {
        type:String
    },
    phone_number : {
        type:String
    },
    mail : {
        type:String
    },
    agency : {
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
    },
    licence_number : {
        type:String
    },
    request:{
        type:String
    },
    favorites:{
        type:Array
    }
    
})
export default mongoose.model('User',User,'user')