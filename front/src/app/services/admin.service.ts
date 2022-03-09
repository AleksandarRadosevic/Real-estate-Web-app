import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '../models/Agency';
import { Locations } from '../models/Locations';
import { Street } from '../models/Street';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllRequests() {
    return this.http.get("http://localhost:4000/admin/getAllRequests");
  }
  getAllUsers() {
    return this.http.get("http://localhost:4000/admin/getAllUsers");
  }


  acceptUser(user: User) {
    const data = {
      username: user.username
    };
    return this.http.post("http://localhost:4000/admin/acceptUser", data);
  }
  denyUser(user: User) {
    const data = {
      username: user.username
    };
    return this.http.post("http://localhost:4000/admin/denyUser", data);
  }

  updateUser(user: User) {
    const data = {
      "id":user._id,
      "firstname": user.firstname,
      "lastname": user.lastname,
      "username": user.username,
      "password": user.password,
      "city": user.city,
      "birthdate": user.birthdate,
      "phone_number": user.phone_number,
      "mail": user.mail,
      "agency": user.agency,
      "licence_number": user.licence_number,
      "type": user.type
    };
    return this.http.post("http://localhost:4000/admin/updateUser", data);
  }

  deleteUser(user: User) {
    const data = {
      username: user.username
    };
    return this.http.post("http://localhost:4000/admin/deleteUser", data);

  }
  registerUser(firstname: string, lastname: string, username: string, password: string,
    city: string, birthdate: Date, phone_number: string, mail: string,
    agency: Agency, licence_number: string, type: string) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      city: city,
      birthdate: birthdate,
      phone_number: phone_number,
      mail: mail,
      agency: agency,
      licence_number: licence_number,
      type: type
    };
    return this.http.post("http://localhost:4000/admin/registerUser", data);
  }

  getAgencies(){
    return this.http.get("http://localhost:4000/admin/getAgencies");    
  }
  getAllLocations(){
    return this.http.get("http://localhost:4000/admin/getAllLocations");    
  }
  addAgency(Name,PIB,City,Address,Phone){
    const data={
      Name:Name,
      PIB:PIB,
      City:City,
      Address:Address,
      Phone:Phone
    };
    return this.http.post("http://localhost:4000/admin/addAgency",data);
  }
  addMicrolocation(city,mun,micro){
    const data={
      city:city,
      mun:mun,
      micro:micro
    };
    return this.http.post("http://localhost:4000/admin/addMicrolocation",data);
  }
  deleteMicrolocation(micro){
    const data={
      micro:micro
    };
    return this.http.post("http://localhost:4000/admin/deleteMicrolocation",data);
  }
  addStreet(location:Locations,street){
    const data={
      city:location.City,
      mun:location.Municipality,
      micro:location.Microlocation,
      street:street
    };
    return this.http.post("http://localhost:4000/admin/addStreet",data);
  }
  deleteStreet(location:Street){
    const data={
      city:location.City,
      mun:location.Municipality,
      micro:location.Microlocation,
      street:location.Street
    };
    return this.http.post("http://localhost:4000/admin/deleteStreet",data);
  }
}

