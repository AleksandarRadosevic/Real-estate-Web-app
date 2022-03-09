import e, * as express from 'express';
import User from '../models/user';
import Realestate from '../models/Realestate';
import Agency from '../models/agency';
import RegPicture from '../models/registration_pictures'
import { Document, Query } from 'mongoose';
import Location from '../models/location';
import registration_pictures from '../models/registration_pictures';
import { ObjectId } from 'bson';

export class AdminController {

    getAllRequests = (req: express.Request, res: express.Response) => {
        User.find({ "request": "pending" }, (err, users) => {
            if (err)
                console.log(err);
            else
                res.json(users);
        })
    }
    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({}, (err, users) => {
            if (err)
                console.log(err);
            else
                res.json(users);
        })
    }

    acceptUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.collection.updateOne({ "username": username }, { $set: { "request": "accept" } });
        res.json("prihvacen korisnik");
    }
    denyUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.collection.updateOne({ "username": username }, { $set: { "request": "deny" } });
        res.json("odbijen korisnik");
    }

    deleteUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.collection.deleteOne({ "username": username });
        registration_pictures.collection.deleteOne({"username":username});
        res.json("Uspesno obrisan korisnik");
    }

    updateUser = (req: express.Request, res: express.Response) => {
        let id=req.body.id;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let password = req.body.password;
        let city = req.body.city;
        let birthdate = req.body.birthdate;
        let phone_number = req.body.phone_number;
        let mail = req.body.mail;
        let agency = req.body.agency;
        let licence_number = req.body.licence_number;
        let type = req.body.type;
        User.collection.updateOne({ "_id": new ObjectId(id) }, {
            $set: {
                "firstname": firstname,
                "lastname": lastname,
                "username": username,
                "password": password,
                "city": city,
                "birthdate": birthdate,
                "phone_number": phone_number,
                "mail": mail,
                "agency": agency,
                "licence_number": licence_number,
                "type": type
            }
        });
        
        res.json("Korisnik uspesno azuriran");
    }

    registerUser = (req: express.Request, res: express.Response) => {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let username = req.body.username;
        let password = req.body.password;
        let city = req.body.city;
        let birthdate = req.body.birthdate;
        let phone_number = req.body.phone_number;
        let mail = req.body.mail;
        let agency = req.body.agency;
        let licence_number = req.body.licence_number;
        let type = req.body.type;
        User.findOne({ $or: [{ 'mail': mail }, { 'username': username }] }, (err, user) => {
            if (user) {
                res.json({ 'message': 'Korisnik vec postoji' });
                return;
            }
            else {
                if (err) {
                    console.log(err);
                }
                else {
                    User.collection.insertOne(
                        {
                            "firstname": firstname,
                            "lastname": lastname,
                            "username": username,
                            "password": password,
                            "city": city,
                            "birthdate": birthdate,
                            "phone_number": phone_number,
                            "mail": mail,
                            "agency": agency,
                            "licence_number": licence_number,
                            "type": type,
                            "request": "accept",
                            "favorites": []
                        }
                    );
                    res.json({ 'message': 'Uspesna registracija' });
                }
            }
        })
    }

    addAgency = (req: express.Request, res: express.Response) => {
        let Name = req.body.Name;
        let PIB = req.body.PIB;
        let City = req.body.City;
        let Address = req.body.Address;
        let Phone = req.body.Phone;
        Agency.findOne({ "PIB": PIB }, (err, user) => {
            if (err)
                console.log(err);
            else {
                if (user) {
                    res.json(null);
                    return;
                }
                Agency.collection.insertOne({
                    "Type": "Agencija",
                    "Name": Name,
                    "PIB": PIB,
                    "City": City,
                    "Address": Address,
                    "Phone": Phone
                });
                res.json("Uspesno dodata agencija");
            }
        })
    }

    getAgencies = (req: express.Request, res: express.Response) => {
        Agency.find({}, (err, users) => {
            if (err)
                console.log(err);
            else
                res.json(users);
        })
    }

    getAllLocations = (req: express.Request, res: express.Response) => {
        Location.find({}, (err, locations) => {
            if (err)
                console.log(err);
            else
                res.json(locations);
        })
    }
    addMicrolocation = (req: express.Request, res: express.Response) => {
        let city = req.body.city;
        let mun = req.body.mun;
        let micro = req.body.micro;
        Location.collection.insertOne({
            "City": city,
            "Municipality": mun,
            "Microlocation": micro,
            "Street":[]
        });
        res.json("Uspesno dodata mikrolokacija");
    }
    deleteMicrolocation = (req: express.Request, res: express.Response) => {
        let micro = req.body.micro;
        Realestate.find({ "Realestate.Microlocation": micro }, (err, user) => {
            if (err)
                console.log(err);
            
            else if (user.length>0) {
                res.json(null);
                return;
            }
            else {
                Location.collection.deleteOne({ "Microlocation": micro });
                res.json("Uspesno obrisana");
            }
        })

    }

    addStreet=(req: express.Request, res: express.Response) => {
        let city = req.body.city;
        let mun = req.body.mun;
        let micro = req.body.micro;
        let street = req.body.street;
        Location.collection.updateOne({"City":city,"Municipality":mun,"Microlocation":micro},{$push:{"Street":street}},(err,user)=>{
            if (err)
                console.log(err);
            else {
                res.json("Uspesno dodata ulica");
            }
        })
    }
    deleteStreet=(req: express.Request, res: express.Response) => {
        let city = req.body.city;
        let mun = req.body.mun;
        let micro = req.body.micro;
        let street = req.body.street;
        Location.collection.updateOne({"City":city,"Municipality":mun,"Microlocation":micro},{$pull:{"Street":street}},(err,user)=>{
            if (err)
                console.log(err);
            else {
                res.json("Uspesno obrisana ulica");
            }
        })
    }
}