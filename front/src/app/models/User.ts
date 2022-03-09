import { Agency } from "./Agency";

export class User{
    _id:string;
    firstname : string;
    lastname : string;
    username : string;
    password : string;
    passwordAgain : string;
    city: string;
    birthdate : Date;
    phone_number : string;
    mail : string;
    agency : Agency;
    licence_number : string;
    value:string;
    type:string;
    favorites:string[];
    request:string;
}