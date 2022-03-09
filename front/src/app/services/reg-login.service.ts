import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Agency } from '../models/Agency';

@Injectable({
  providedIn: 'root'
})
export class RegLoginService {

  constructor(private http:HttpClient) { }
  login(username: string, password: string) {
    const data={
      username:username,
      password:password
    };
    return this.http.post("http://localhost:4000/user/login",data);
  }
  register(firstname:string, lastname:string, username: string, password: string,
           city: string, birthdate: Date,phone_number:string,mail: string,
          agency: Agency,licence_number:string,type:string) {
    const data={
      firstname : firstname,
      lastname : lastname,
      username : username,
      password : password,
      city: city,
      birthdate : birthdate,
      phone_number : phone_number,
      mail : mail,
      agency : agency,
      licence_number : licence_number,
      type:type
    };
    return this.http.post("http://localhost:4000/user/register",data);
  }
  get_all_agencies(){
    return this.http.get("http://localhost:4000/user/get_all_agencies");
  }

upload(file:File) {
  const formData = new FormData();
  formData.append("file",file);
  return this.http.post("http://localhost:4000/file",formData);
}
getPicture(user:string){
  return this.http.get(`http://localhost:4000/user/get_picture?username=${user}`);
}

changePass(user:string,password:string){
  const data ={
    username:user,
    password:password
  };
  return this.http.post("http://localhost:4000/user/change_password",data);
}

}
