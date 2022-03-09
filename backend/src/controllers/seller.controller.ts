import e, * as express from 'express';
import User from '../models/user';
import Realestate from '../models/Realestate';
import Agency from '../models/agency';
import Location from '../models/location';
import { ObjectId } from 'bson';

export class SellerController {

    getAllEstates=(req:express.Request,res:express.Response)=>{
        let firstname=req.body.firstname;
        let lastname=req.body.lastname
        Realestate.find({"Advertiser":{$elemMatch:{"FirstName":firstname,"LastName":lastname}}},(err,estates)=>{
            if (err)
                console.log(err);
            else 
            {
                res.json(estates);
            }
        })
    }
    sellEstate=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let DateSold=new Date();
        Realestate.collection.updateOne({"_id":new ObjectId(id)},{$set:{"Realestate.Sold":"yes","Realestate.DateSold":DateSold}});
    }

    addEstate=(req:express.Request,res:express.Response)=>{
        let Name=req.body.Name;
        let City=req.body.City;
        let Type=req.body.Type;
        let Municipality=req.body.Municipality;
        let Microlocation=req.body.Microlocation;
        let Street=req.body.Street;
        let Area=req.body.Area;
        let Rooms=req.body.Rooms;
        let ConstructionYear=req.body.ConstructionYear;
        let State=req.body.State;
        let Heating=req.body.Heating;
        let Floor=req.body.Floor;
        let TotalFloors=req.body.TotalFloors;
        let Parking=req.body.Parking;
        let MonthlyUtilities=req.body.MonthlyUtilities;
        let Price=req.body.Price
        let About=req.body.About;
        let Sold="no";
        let LastModified=new Date();
        let Characteristics=req.body.Characteristics;
        let Bus=req.body.Bus;
        let Advertiser=req.body.Advertiser;
        let Pictures=req.body.Pictures;
        
        Realestate.collection.insertOne({
            "Realestate" : {
                "Name" : Name,
                "City" : City,
                "Type" : Type,
                "Municipality" : Municipality,
                "Microlocation" : Microlocation,
                "Street" : Street,
                "Area" : Area,
                "Rooms" : Rooms,
                "ConstructionYear" : ConstructionYear,
                "State" : State,
                "Heating" : Heating,
                "Floor" : Floor,
                "TotalFloors" : TotalFloors,
                "Parking" : Parking,
                "MonthlyUtilities" : MonthlyUtilities,
                "Price" : Price,
                "About" : About,
                "Sold" : Sold,
                "DateSold":null,
                "LastModified" : LastModified,
                "Characteristics" :Characteristics,
                "Bus" : Bus
            },
            "Advertiser" : Advertiser,
            "Pictures" : Pictures
        },(err,estate:any)=>{
            if (err)
                console.log(err);
            else {
                res.json({"id":estate['insertedId']});
            }
        });
    }
    updateEstate=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let Name=req.body.Name;
        let City=req.body.City;
        let Type=req.body.Type;
        let Municipality=req.body.Municipality;
        let Microlocation=req.body.Microlocation;
        let Street=req.body.Street;
        let Area=req.body.Area;
        let Rooms=req.body.Rooms;
        let ConstructionYear=req.body.ConstructionYear;
        let State=req.body.State;
        let Heating=req.body.Heating;
        let Floor=req.body.Floor;
        let TotalFloors=req.body.TotalFloors;
        let Parking=req.body.Parking;
        let MonthlyUtilities=req.body.MonthlyUtilities;
        let Price=req.body.Price
        let About=req.body.About;
        let Sold="no";
        let LastModified=new Date();
        let Characteristics=req.body.Characteristics;
        let Bus=req.body.Bus;
        let Advertiser=req.body.Advertiser;
        let Pictures=req.body.Pictures;

        Realestate.collection.updateOne({"_id":new ObjectId(id)},{$set:{
            "Realestate" : {
                "Name" : Name,
                "City" : City,
                "Type" : Type,
                "Municipality" : Municipality,
                "Microlocation" : Microlocation,
                "Street" : Street,
                "Area" : Area,
                "Rooms" : Rooms,
                "ConstructionYear" : ConstructionYear,
                "State" : State,
                "Heating" : Heating,
                "Floor" : Floor,
                "TotalFloors" : TotalFloors,
                "Parking" : Parking,
                "MonthlyUtilities" : MonthlyUtilities,
                "Price" : Price,
                "About" : About,
                "Sold" : Sold,
                "LastModified" : LastModified,
                "Characteristics" :Characteristics,
                "Bus" : Bus
            },
            "Advertiser" : Advertiser,
            "Pictures" : Pictures}
        });
        res.json('Uspesno azuriran oglas');
    }

    setPictures=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;  
        let arr=req.body.arr;
        Realestate.collection.updateOne({"_id":new ObjectId(id)},{$set:{"Pictures":arr}});
        res.json('Uspesno dodat oglas');
    }

    getLocation=(req:express.Request,res:express.Response)=>{
        let city=req.body.city;
        let mun=req.body.mun;  
        let micro=req.body.micro;
        Location.findOne({"City":city,"Municipality":mun,"Microlocation":micro},(err,loc)=>{
            if (err)
                console.log(err);
            else {
                res.json(loc);
            }
        });
    }

    updateInfo=(req:express.Request,res:express.Response)=>{
        let mail=req.body.mail;
        let phone=req.body.phone;  
        let agency=req.body.agency;
        let username=req.body.username;
        User.collection.updateOne({"username":username},{$set:{
            "mail":mail,
            "phone_number":phone,
            "agency":agency           
        }},(err,user)=>{
            if (err)
                console.log(err);
            else {
                res.json("Uspeh");               
            }
        });
    }

    SellerSoldEstates=(req:express.Request,res:express.Response)=>{
        let city=req.body.city;
        let mun=req.body.mun;  
        let micro=req.body.micro;
        Realestate.find({"Realestate.City":city,"Realestate.Municipality":mun,"Realestate.Microlocation":micro,"Realestate.Sold":"yes","Advertiser":{$elemMatch:{"Type":"Vlasnik"}}},(err,estate)=>{
            if (err)
                console.log(err);
            res.json(estate);
        })
    }
    AgencySoldEstate=(req:express.Request,res:express.Response)=>{
        let city=req.body.city;
        let mun=req.body.mun;  
        let micro=req.body.micro;
        let name=req.body.name;
        Realestate.find({"Realestate.City":city,"Realestate.Municipality":mun,"Realestate.Microlocation":micro,"Realestate.Sold":"yes","Advertiser":{$elemMatch:{"Type":"Agencija","Name":name}}},(err,estate)=>{
            if (err)
                console.log(err);
            res.json(estate);
        })
    }
}

