import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient) { }


  getAllEstates(firstname,lastname){
    const data={
      firstname:firstname,
      lastname:lastname
    }
    return this.http.post("http://localhost:4000/seller/getAllEstates",data);
  }
  sellEstate(id){
    const data={
      id:id
    };
    return this.http.post("http://localhost:4000/seller/sellEstate",data);
  }
  updateEstate(data){
    return this.http.post("http://localhost:4000/seller/updateEstate",data);
  }
  addEstate(data){
    return this.http.post("http://localhost:4000/seller/addEstate",data);
  }

  setPictures(id,arr){
    const data={
      id:id,
      arr:arr
    };
    return this.http.post("http://localhost:4000/seller/setPictures",data);
  }
  updateInfo(data){
    return this.http.post("http://localhost:4000/seller/updateInfo",data);
  }

  AgencySoldEstate(data){
    return this.http.post("http://localhost:4000/seller/AgencySoldEstate",data);
  }
  
  SellerSoldEstates(data){
    return this.http.post("http://localhost:4000/seller/SellerSoldEstates",data);
  }
}
