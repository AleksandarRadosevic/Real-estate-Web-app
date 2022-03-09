import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-basic-search',
  templateUrl: './basic-search.component.html',
  styleUrls: ['./basic-search.component.css']
})
export class BasicSearchComponent implements OnInit {

  constructor(private router:Router) { }
  private user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="customer"){
      this.router.navigate(['']);
    }
    this.type = "Izaberi tip (obavezno)";
    this.default_type = this.type;
  }

  type: string;
  default_type: string;
  city:string;
  mun:string;
  micro:string;
  price: number;
  area: number;
  rooms: number;
  message: string;

  search() {
    this.message = "";
    if (this.isEmpty(this.type) || (this.type == this.default_type)) {
      this.message = "Tip nekretnine je obavezno polje";
      return;
    }
    // let pattern = /^[A-Za-z]+\/[A-Za-z]+\/[A-Za-z]+$/;
    // if (!pattern.test(this.location) && this.isEmpty(this.location) == false) {
    //   this.message = "Uneta lokacija nije u dobrom formatu."
    //   return;
    // }
    let cities=[];
    let micros=[];
    let muns=[];
    if (this.isEmpty(this.city) == false) {
      cities = this.city.split(','); 
    }
    if (this.isEmpty(this.mun) == false) {
      muns = this.mun.split(','); 
    }
    if (this.isEmpty(this.micro) == false) {
      micros = this.micro.split(','); 
    }
    if (!this.area){
      this.area=0;
    }
    if (!this.rooms){
      this.rooms=0;
    }
    if (!this.price){
      this.price=9007199254740991;
    }
    let data ={
      "type":this.type,
      "city":cities,
      "mun":muns,
      "micro":micros,
      "price":this.price,
      "area":this.area,
      "rooms":this.rooms
    };
    localStorage.setItem("basicSearch",JSON.stringify(data));
    localStorage.setItem("search",JSON.stringify("success"));
    this.router.navigate(['advertisements']);
  }
  isEmpty(str) {
    return (!str || str.length === 0);
  }
}
