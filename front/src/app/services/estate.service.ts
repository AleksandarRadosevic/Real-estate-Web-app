import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estate } from '../models/Estate';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(private http:HttpClient) { }
  getAll(){
    return this.http.get('http://localhost:4000/realestate/getAll');    
  }

  getBasicResults(type:string,city:any,mun:any,micro:any,price:number,area:number,rooms:number){
    const data = {
      type:type,
      city:city,
      mun:mun,
      micro:micro,
      price:price,
      area:area,
      rooms:rooms
    };
    return this.http.post(`http://localhost:4000/realestate/getBasicResults`,data);    
  }

  getAveragePriceM2(type:string,micro:string){
    const data={
      type:type,
      micro:micro
    };
    return this.http.post(`http://localhost:4000/realestate/getAveragePriceM2`,data);    
  }
  getEstateId(id){
    const data={
      id:id
    };
    return this.http.get(`http://localhost:4000/realestate/getEstateId?id=${id}`);    
  }
  getUserFavorites(username){
    return this.http.get(`http://localhost:4000/realestate/getUserFavorites?username=${username}`);    
  }
  getEstatesById(id){
    return this.http.get(`http://localhost:4000/realestate/getEstatesById?id=${id}`);    

  }
  addToFavorites(id,user){
    const data={
      user:user,
      id:id
    }
    return this.http.post(`http://localhost:4000/realestate/addToFavorites`,data);    
  }
  dropFromFavorites(user,id){
    const data={
      user:user,
      id:id
    };
    return this.http.post(`http://localhost:4000/realestate/dropFromFavorites`,data);    
  }
  getAdvancedResults(data){
    return this.http.post(`http://localhost:4000/realestate/getAdvancedResults`,data);
  }
}
