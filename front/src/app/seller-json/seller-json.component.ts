import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { RealEstate } from '../models/RealEstate';
import { User } from '../models/User';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-json',
  templateUrl: './seller-json.component.html',
  styleUrls: ['./seller-json.component.css']
})
export class SellerJSONComponent implements OnInit {

  constructor(private serviceSeller:SellerService,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="seller"){
      this.router.navigate(['']);
    }    
  }
  file:any;
  fileChanged(e) {
      this.file = e.target.files[0];
  }

selectMultiple(event) {
  if (event.target.files.length > 0) {
    this.images = event.target.files;
  }
}
images = [];
message:string;
user:User;
addAdvertisement(){

  let fileReader = new FileReader();
  fileReader.onload = (event) => {
    let { estateDescription, jsonObject }: { estateDescription: RealEstate; jsonObject: string; } = this.readJSON(event);
    try {
      estateDescription=JSON.parse(jsonObject);
    } catch (error) {
      this.message="Fajl nije uspesno obradjen";
      return;
    }
    
    this.checkAllFields(estateDescription);
    if (this.message==""){

      let advertiser = [];
      if (this.isEmpty(this.user.agency)) {
        advertiser.push({
          "Type": "Vlasnik",
          "FirstName": this.user.firstname,
          "LastName": this.user.lastname,
          "Phone": this.user.phone_number
        });
      }
      else {
        advertiser.push(this.user.agency);
        advertiser.push({
          "FirstName": this.user.firstname,
          "LastName": this.user.lastname,
          "Phone": this.user.phone_number
        });
      }
      const data = {
        Name: estateDescription.Name,
        City: estateDescription.City,
        Type: estateDescription.Type,
        Municipality: estateDescription.Municipality,
        Microlocation: estateDescription.Microlocation,
        Street: estateDescription.Street,
        Area: estateDescription.Area,
        Rooms: estateDescription.Rooms,
        ConstructionYear: estateDescription.ConstructionYear,
        State: estateDescription.State,
        Heating: estateDescription.Heating,
        Floor: estateDescription.Floor,
        TotalFloors: estateDescription.TotalFloors,
        Parking: estateDescription.Parking,
        MonthlyUtilities: estateDescription.MonthlyUtilities,
        Price: estateDescription.Price,
        About: estateDescription.About,
        Characteristics: estateDescription.Characteristics,
        Bus: estateDescription.Bus,
        Advertiser: advertiser,
        Pictures: []
      };
      this.serviceSeller.addEstate(data).subscribe((msg: any) => {
        let id = msg['id'];
        const formData = new FormData();
        for (let img of this.images) {
          formData.append("files", img);
        }
        this.http.post("http://localhost:4000/files", formData).subscribe((msg:any) => {
          this.serviceSeller.setPictures(id,msg).subscribe((msg)=>{
            alert(msg);
            this.router.navigate(['seller']);
          })
        });
      })
    }

    else {
      return;
    }
  }
  fileReader.readAsText(this.file);
}
  private readJSON(event: ProgressEvent<FileReader>) {
    let str = (event.target.result).toString();
    let arr = str.split(/\r?\n/);
    let estateDescription: RealEstate;
    let estate: Estate;
    let jsonObject = "";
    for (let i = 0; i < arr.length; i++) {
      jsonObject += arr[i];
    }
    return { estateDescription, jsonObject };
  }

checkAllFields(estateDescription:RealEstate) {
  let i = 0;
  this.message = "";
  if (this.images.length < 3 || this.images.length > 6) {
    this.message = "Minimalan broj slika je 3, a maksimalan 6";
    return;
  }
  if (this.isEmpty(estateDescription.Name)) {
    this.message = "Naziv je obavezno polje";
    return;
  }
  if (this.isEmpty(estateDescription.Type) || estateDescription.Type == "Izaberi tip") {
    this.message = "Tip je obavezno polje";
    return;
  }
  if (this.isEmpty(estateDescription.City) || (this.isEmpty(estateDescription.Municipality)) || (this.isEmpty(estateDescription.Microlocation))) {
    this.message = "Lokacija je obavezno polje";
    return;
  }
  if (this.isEmpty(estateDescription.Street)) {
    this.message = "Ulica je obavezno polje";
    return;
  }
  if (this.isEmpty(estateDescription.Area)) {
    this.message = "Kvadratura je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.Rooms)) {
    this.message = "Broj soba je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.ConstructionYear)) {
    this.message = "Godina izgradnje je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.State)) {
    this.message = "Stanje je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.Heating)) {
    this.message = "Tip grejanja je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.Floor)) {
    this.message = "Spratnost je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.TotalFloors)) {
    this.message = "Ukupna spratnost je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.Parking)) {
    this.message = "Parking je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.MonthlyUtilities)) {
    this.message = "Mesecne rezije je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.Price)) {
    this.message = "Cena je obavezno polje"
    return;
  }
  if (this.isEmpty(estateDescription.About)) {
    this.message = "Opis je obavezno polje"
    return;
  }
}
isEmpty(str) {
  return (!str || str.length === 0);
}
}