import e, * as express from 'express';
import User from '../models/user';
import Realestate from '../models/Realestate';
import Agency from '../models/agency';
import RegPicture from '../models/registration_pictures'
import { Document, Query } from 'mongoose';
export class Realestate_Controller{

    getAll = (req:express.Request, res: express.Response)=>{

        Realestate.find({"Realestate.Sold":"no"},(err,user)=>{
            if (err)
                console.log(err);
            else 
                res.json(user);
        })
    }
    getBasicResults=(req:express.Request, res: express.Response)=>{
        let type=req.body.type;
        let area=req.body.area-1;
        let price=req.body.price+1;
        let rooms=req.body.rooms-0.5;
        let city=req.body.city;
        let mun=req.body.mun;
        let micro=req.body.micro;
        if (city.length>0 || mun.length>0 || micro.length>0){
            Realestate.find({"Realestate.Type":type,"Realestate.Sold":"no","Realestate.Area":{$gte:area},
        "Realestate.Price":{$lte:price},"Realestate.Rooms":{$gte:rooms},$or:[{"Realestate.City":{$in:city}},{"Realestate.Municipality":{$in:mun}},
        {"Realestate.Microlocation":{$in:micro}}]
        },(err,user)=>{
            if (err)
                console.log(err);
            else 
                res.json(user);
        });}
        else {
            Realestate.find({"Realestate.Type":type,"Realestate.Sold":"no","Realestate.Area":{$gt:area},
        "Realestate.Price":{$lt:price},"Realestate.Rooms":{$gt:rooms}},(err,user)=>{
            if (err)
                console.log(err);
            else 
                res.json(user);
        });
        }
    }

    getAdvancedResults=(req:express.Request, res: express.Response)=>{
        let priceFrom=req.body.priceFrom-1;
        let priceTo=req.body.priceTo+1;
        let areaFrom=req.body.areaFrom-1;
        let areaTo=req.body.areaTo+1;
        let roomsFrom=req.body.roomsFrom-0.5;
        let roomsTo=req.body.roomsTo+0.5;
        let yearMin=req.body.yearMin-1;
        let yearMax=req.body.yearMax+1;
        let seller=req.body.seller;
        let floorFrom=req.body.floorFrom-1;
        let floorTo=req.body.floorTo+1;
        let monthlyFrom=req.body.monthlyFrom-1;
        let monthlyTo=req.body.monthlyTo+1;
        let stateEstates=req.body.stateEstates;

        let heating=req.body.heating;
        let chars=req.body.chars;
        if (stateEstates.length==0){
            stateEstates=['izvorno','renovirano','lux'];
        }
        if (heating.length==0){
            heating=['CG','EG','TA','gas','podno','toplotne pumpe'];   
        }
        if (chars.length==0){
            chars=['Terasa','Lodja','Balkon','Lift','Podrum','Garaza','Sa bastom','Klima','Internet','Interfon','Telefon'];
        }
        Realestate.find({"Realestate.Sold":"no","Realestate.Price":{$gt:priceFrom,$lt:priceTo},"Realestate.Area":{$gt:areaFrom,$lt:areaTo},
                         "Realestate.Rooms":{$gt:roomsFrom,$lt:roomsTo},"Realestate.ConstructionYear":{$gt:yearMin,$lt:yearMax},
                         "Realestate.Floor":{$gt:floorFrom,$lt:floorTo},"Realestate.MonthlyUtilities":{$gt:monthlyFrom,$lt:monthlyTo},
                         "Realestate.State":{$in:stateEstates},"Realestate.Heating":{$in:heating},
                         "Realestate.Characteristics":{$in:chars},"Advertiser":{$elemMatch:{"Type":seller}}},(err,estates)=>{
            if (err)
                console.log(err);
            else 
                {   
                    res.json(estates);
                }
        });
    }
    getAveragePriceM2 = (req:express.Request, res: express.Response)=>{

        let type=req.body.type;
        let micro=req.body.micro;

        Realestate.find({"Realestate.Sold":"no","Realestate.Type":type,"Realestate.Microlocation":micro},(err,user)=>{
            if (err)
                console.log(err);
            else 
            {   
                let prices=0;
                let m2=0;
                user.forEach((element:any) => {
                    prices+=element["Realestate"]["Price"];
                    m2+=element["Realestate"]["Area"];
                });

                let result=prices/m2;
                res.json({"avg":result});
            }
                
        })
    }

    addToFavorites= (req:express.Request, res: express.Response)=>{
        let user = req.body.user;
        let id = req.body.id;
        User.collection.updateOne({"username":user},{$push:{"favorites":id}});
        res.json({'message':'Uspesno dodat oglas u omiljene'});
        
    }
    dropFromFavorites= (req:express.Request, res: express.Response)=>{
        let user = req.body.user;
        let id = req.body.id;
        User.collection.updateOne({"username":user},{$pull:{"favorites":id}});
        res.json({'message':'Uspesno izbacen oglas iz omiljenih'});
        
    }
    

    getEstateId = (req:express.Request, res: express.Response)=>{

        let id =req.query.id;
        Realestate.findOne({"_id":id},(err,adv)=>{
            if (err)
                console.log(err);
            else 
            {   
              res.json(adv);
            }
                
        })
    }
    getEstatesById = (req:express.Request, res: express.Response)=>{

        let id =req.query.id;
        Realestate.find({"_id":{$in:id}},(err,adv)=>{
            if (err)
                console.log(err);
            else 
            {   
              res.json(adv);
            }
                
        })
    }

    getUserFavorites= (req:express.Request, res: express.Response)=>{
        let username =req.query.username;
        User.findOne({"username":username},(err,user:any)=>{
            if (err)
            console.log(err);
            else 
            {
                let arr=[];
                arr=user['favorites'];
                console.log(arr.length);
                Realestate.find({"_id":{$in:arr}},(err,adv)=>{
                    if (err)
                        console.log(err);
                    else 
                        res.json(adv);
                })
            }
        })    
    }
    
}
