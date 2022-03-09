import { Component, OnInit } from '@angular/core';
import { Locations } from '../models/Locations';
import { Street } from '../models/Street';
import { AdminService } from '../services/admin.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seller-estates-update',
  templateUrl: './seller-estates-update.component.html',
  styleUrls: ['./seller-estates-update.component.css']
})
export class SellerEstatesUpdateComponent implements OnInit {

  constructor(private service: AdminService, private http: HttpClient, private serviceSeller: SellerService, private router: Router, private fb: FormBuilder
    ,private location:Location) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="seller"){
      this.router.navigate(['']);
    }    
    this.estate = JSON.parse(localStorage.getItem("estateUpdate"));
    if (this.estate==null || this.estate==undefined){
        this.location.back();
    }
    this.name = this.estate.Realestate.Name;
    this.type = this.estate.Realestate.Type;
    this.state = this.estate.Realestate.State;
    this.heating = this.estate.Realestate.Heating;
    this.parking = this.estate.Realestate.Parking;
    this.streets = [];
    this.street = this.estate.Realestate.Street;
    this.area = this.estate.Realestate.Area;
    this.rooms = this.estate.Realestate.Rooms;
    this.year = this.estate.Realestate.ConstructionYear;
    this.totalFloor = this.estate.Realestate.TotalFloors;
    this.floor = this.estate.Realestate.Floor;
    this.monthly = this.estate.Realestate.MonthlyUtilities;
    this.price = this.estate.Realestate.Price;
    this.about = this.estate.Realestate.About;
    this.charsString = this.estate.Realestate.Characteristics;
    this.buses = this.estate.Realestate.Bus;
    let i = 0;
    this.characteristicsStr.forEach(element => {
      if (this.estate.Realestate.Characteristics.includes(element)) {
        this.characteristics[i] = true;
      }
      i++;
    });
    this.service.getAllLocations().subscribe((loc: Locations[]) => {
      this.locations = loc;
      this.selectedLocation = this.locations.find(element => (element.City == this.estate.Realestate.City && element.Microlocation == this.estate.Realestate.Microlocation && element.Municipality == this.estate.Realestate.Municipality));
      this.idLocation = this.selectedLocation._id;
      this.streets = this.selectedLocation.Street;
    });
    this.dropdownList = [
      { item_id: 2, item_text: '16' },
      { item_id: 3, item_text: '17' },
      { item_id: 4, item_text: '18' },
      { item_id: 5, item_text: '23' },
      { item_id: 6, item_text: '26' },
      { item_id: 7, item_text: '37' },
      { item_id: 8, item_text: '40' },
      { item_id: 9, item_text: '41' },
      { item_id: 10, item_text: '49' },
      { item_id: 11, item_text: '50' },
      { item_id: 12, item_text: '52' },
      { item_id: 13, item_text: '53' },
      { item_id: 15, item_text: '56' },
      { item_id: 16, item_text: '83' },
      { item_id: 17, item_text: '84' },
      { item_id: 18, item_text: '85' },
      { item_id: 19, item_text: '95' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };
    this.selectedItems;
    this.dropdownList.forEach(element => {
      this.buses.forEach(elementB => {
        if (element.item_text == elementB) {
          this.selectedItems.push(element);
        }
      });
    });

    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
    });
  }
  selectedItems = [];
  dropdownList = [];
  val = [];
  buses = [];
  estate: Estate;
  dropDownForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  locations: Locations[];
  selectedLocation: Locations;
  streets: string[];
  idLocation: string;
  streetShow: Street;
  name: string;
  city: string;
  type: string;
  mun: string;
  micro: string;
  street: string;
  area: number;
  rooms: number;
  year: number;
  state: string;
  heating: string;
  floor: number;
  totalFloor: number;
  parking: string;
  monthly: number;
  price: number;
  about: string;
  message: string;
  characteristics = [false, false, false, false, false, false, false, false, false, false, false];
  characteristicsStr = ['Terasa', 'Lodja', 'Balkon', 'Lift', 'Podrum', 'Garaza', 'Sa bastom', 'Klima', 'Internet', 'Interfon', 'Telefon'];
  charsString = [];
  user: User;


  selectMultiple(event) {
    if (event.target.files.length > 0) {
      this.images = event.target.files;
    }
  }
  images = [];
  addAdvertisement() {
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
    this.checkAllFields();
    if (this.message == "") {
      const data = {
        id: this.estate._id,
        Name: this.name,
        City: this.selectedLocation.City,
        Type: this.type,
        Municipality: this.selectedLocation.Municipality,
        Microlocation: this.selectedLocation.Microlocation,
        Street: this.street,
        Area: this.area,
        Rooms: this.rooms,
        ConstructionYear: this.year,
        State: this.state,
        Heating: this.heating,
        Floor: this.floor,
        TotalFloors: this.totalFloor,
        Parking: this.parking,
        MonthlyUtilities: this.monthly,
        Price: this.price,
        About: this.about,
        Characteristics: this.charsString,
        Bus: this.buses,
        Advertiser: this.estate.Advertiser,
        Pictures: this.estate.Pictures
      };
      this.serviceSeller.updateEstate(data).subscribe((msg: any) => {
        let id = this.estate._id;
        if (this.estate.Pictures.length == 0) {
          const formData = new FormData();
          for (let img of this.images) {
            formData.append("files", img);
          }
          this.http.post("http://localhost:4000/files", formData).subscribe((msg: any) => {
            this.serviceSeller.setPictures(id, msg).subscribe((msg) => {
              alert('Uspesno azuriran oglas');
              this.router.navigate(['seller']);
            })
          });
        }
        else {
          alert(msg);
          this.router.navigate(['seller']);
        }
      })


    }

  }


  checkAllFields() {
    let i = 0;
    this.characteristics.forEach(element => {
      if (this.charsString.includes(this.characteristicsStr[i]) == false && element == true) {
        this.charsString.push(this.characteristicsStr[i]);
      }
      else if (this.charsString.includes(this.characteristicsStr[i]) == true && element == false) {
        const index = this.charsString.indexOf(this.characteristicsStr[i]);
        if (index > -1) {
          this.charsString.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      i++;
    });
    this.message = "";

    let timeNow = new Date();
    let timeUpdate = this.estate.Realestate.LastModified;
    timeNow.setHours(timeNow.getHours() - 1);
    if (Date.parse(timeNow.toString()) <= Date.parse(timeUpdate.toString())) {
      this.message = "Maksimalan broj azuriranja u satu je 1";
      return;
    }


    if (this.isEmpty(this.name)) {
      this.message = "Naziv je obavezno polje";
      return;
    }
    if (this.isEmpty(this.type) || this.type == "Izaberi tip") {
      this.message = "Tip je obavezno polje";
      return;
    }
    if (this.isEmpty(this.selectedLocation)) {
      this.message = "Lokacija je obavezno polje";
      return;
    }
    if (this.isEmpty(this.street)) {
      this.message = "Ulica je obavezno polje";
      return;
    }
    if (this.isEmpty(this.area)) {
      this.message = "Kvadratura je obavezno polje"
      return;
    }
    if (this.isEmpty(this.rooms)) {
      this.message = "Broj soba je obavezno polje"
      return;
    }
    if (this.isEmpty(this.year)) {
      this.message = "Godina izgradnje je obavezno polje"
      return;
    }
    if (this.isEmpty(this.state)) {
      this.message = "Stanje je obavezno polje"
      return;
    }
    if (this.isEmpty(this.heating)) {
      this.message = "Tip grejanja je obavezno polje"
      return;
    }
    if (this.isEmpty(this.floor)) {
      this.message = "Spratnost je obavezno polje"
      return;
    }
    if (this.isEmpty(this.totalFloor)) {
      this.message = "Ukupna spratnost je obavezno polje"
      return;
    }
    if (this.isEmpty(this.parking)) {
      this.message = "Parking je obavezno polje"
      return;
    }
    if (this.isEmpty(this.monthly)) {
      this.message = "Mesecne rezije je obavezno polje"
      return;
    }
    if (this.isEmpty(this.price)) {
      this.message = "Cena je obavezno polje"
      return;
    }
    if (this.isEmpty(this.about)) {
      this.message = "Opis je obavezno polje"
      return;
    }
    if ((this.images.length < 3 || this.images.length > 6) && this.estate.Pictures.length == 0) {
      this.message = "Minimalan broj slika je 3, a maksimalan 6";
    }

  }


  chooseLocation() {
    if (this.streets.length > 0) {
      this.streets = [];
      this.street = "";
    }
  }
  chooseStreet() {
    let loc = this.locations.find(element => element._id == this.idLocation);
    this.selectedLocation = loc;
    if (loc == undefined) {
      alert('Izaberite lokaciju');
    }
    this.streets = loc.Street;
  }
  onItemSelect(item: any) {
    this.buses.push(item.item_text);
  }
  onItemDeSelect(item: any) {
    let it = item.item_text;
    const index = this.buses.indexOf(it);
    if (index > -1) {
      this.buses.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
  onSelectAll(items: any) {
    items.forEach(element => {
      this.buses.push(element.item_text);
    });
  }
  onUnSelectAll() {
    this.buses = [];
  }
  isEmpty(str) {
    return (!str || str.length === 0);
  }
  removeImages() {
    this.estate.Pictures = [];
    this.images = [];
  }
}
