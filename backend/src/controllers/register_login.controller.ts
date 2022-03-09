import * as express from 'express';
import User from '../models/user';
import Agency from '../models/agency';
import RegPicture from '../models/registration_pictures'
export class Register_LoginController{
    register = (req:express.Request, res: express.Response)=>{
        let firstname=req.body.firstname;
        let lastname =req.body.lastname;
        let username =req.body.username;
        let password =req.body.password;
        let city =req.body.city;
        let birthdate =req.body.birthdate;
        let phone_number =req.body.phone_number;
        let mail = req.body.mail;
        let agency =req.body.agency;
        let licence_number =req.body.licence_number;
        let type =req.body.type;
        User.findOne({$or: [{'mail': mail}, {'username': username}]},(err,user)=>{
            if (user){
                res.json({'message':'Korisnik vec postoji'});
                return ;
            }
            else {
                if (err){
                    console.log(err);
                }
                else {
                    User.collection.insertOne(
                        {
                            "firstname":firstname,
                            "lastname":lastname,
                            "username":username,
                            "password":password,
                            "city":city,
                            "birthdate":birthdate,
                            "phone_number":phone_number,
                            "mail":mail,
                            "agency":agency,
                            "licence_number":licence_number,
                            "type":type,
                            "request":"pending",
                            "favorites":[]
                        }
                    );
                    res.json({'message':'Uspesna registracija'});
                }
            }
        })
    }
    login = (req:express.Request, res: express.Response)=>{

        let username =req.body.username;
        let password =req.body.password;
        User.findOne({'username':username,'password':password},(err,user)=>{
            if (err)
                console.log(err);
            else 
                res.json(user);
        })
    }

    get_all_agencies = (req:express.Request, res: express.Response)=>{
        Agency.find({},(err,agencies)=>{
            if (err)
                console.log(err);
            else 
                res.json(agencies);
        })
    }

    get_picture_name = (req:express.Request, res: express.Response)=>{

        let username =req.query.username;
        RegPicture.findOne({'username':username},(err,user:any)=>{
            if (err)
                console.log(err);
            else 
                if (user!=null){
                    res.json(user['filename']);
                }
        })
    }

    change_password= (req:express.Request, res: express.Response)=>{

        let username =req.body.username;
        let password =req.body.password;
        User.collection.updateOne({'username':username},{$set:{password:password}},(err,user)=>{
            if (err)
                console.log(err);
            else 
                res.json({"message":"Promena lozinke je uspesna"});
        })
    }

}