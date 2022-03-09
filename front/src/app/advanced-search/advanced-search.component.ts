import { Component, OnInit,Input, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { User } from '../models/User';
import { EstateService } from '../services/estate.service';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(private router: Router,private service:EstateService) { }
  private user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="customer"){
      this.router.navigate(['']);
    }
  }
  message: string;
  priceFrom: number;
  priceTo: number;
  areaFrom: number;
  areaTo: number;
  roomsFrom: number;
  roomsTo: number;
  yearMin: number;
  yearMax: number;
  seller="Agencija";
  floorFrom: number;
  floorTo: number;
  monthlyTo: number;
  monthlyFrom: number;
  advertisements:Estate[];
  stateEstates = [false, false, false];
  statesEstatesStr=['izvorno','renovirano','lux'];
  heating = [false, false, false, false, false, false];
  heatingStr=['CG','EG','TA','gas','podno','toplotne pumpe'];

  characteristics = [false, false, false, false, false, false, false, false, false, false, false];
  characteristicsStr=['Terasa','Lodja','Balkon','Lift','Podrum','Garaza','Sa bastom','Klima','Internet','Interfon','Telefon'];

  statesString=[];
  heatingString=[];
  charsString=[];

  setSeller(s) {
    this.seller = s;
  }
  search() {
    this.checkAllFields();
    const data={
      priceFrom:this.priceFrom,
      priceTo:this.priceTo,
      areaFrom: this.areaFrom,
      areaTo: this.areaTo,
      roomsFrom: this.roomsFrom,
      roomsTo: this.roomsTo,
      yearMin: this.yearMin,
      yearMax: this.yearMax,
      seller: this.seller,
      floorFrom: this.floorFrom,
      floorTo: this.floorTo,
      monthlyTo: this.monthlyTo,
      monthlyFrom: this.monthlyFrom,
      stateEstates:this.statesString,
      heating:this.heatingString,
      chars:this.charsString
    }
    this.service.getAdvancedResults(data).subscribe((ad:Estate[])=>{
      this.advertisements=ad;
      localStorage.setItem("advertisements",JSON.stringify(this.advertisements));
      localStorage.setItem("advancedSearch",JSON.stringify("success"));
      this.router.navigate(['ads']);
      return;
    })
  }
  isEmpty(field:any) {
    return (!field || field.length === 0);
  }


  checkAllFields(){
    if (this.isEmpty(this.priceFrom)){
      this.priceFrom=0;
    }
    if (this.isEmpty(this.priceTo)){
      this.priceTo=9007199254740991;
    }
    if (this.isEmpty(this.areaFrom)){
      this.areaFrom=0;
    }
    if (this.isEmpty(this.areaTo)){
      this.areaTo=9007199254740991;
    }
    if (this.isEmpty(this.roomsFrom)){
      this.roomsFrom=0;
    }
    if (this.isEmpty(this.roomsTo)){
      this.roomsTo=9007199254740991;
    }
    if (this.isEmpty(this.yearMin)){
      this.yearMin=0;
    }
    if (this.isEmpty(this.yearMax)){
      this.yearMax=9007199254740991;
    }
    if (this.isEmpty(this.floorFrom)){
      this.floorFrom=0;
    }
    if (this.isEmpty(this.floorTo)){
      this.floorTo=9007199254740991;
    }
    if (this.isEmpty(this.monthlyFrom)){
      this.monthlyFrom=0;
    }
    if (this.isEmpty(this.monthlyTo)){
      this.monthlyTo=9007199254740991;
    }

    let i=0;
    this.stateEstates.forEach(element => {
      if (element==true)
        this.statesString.push(this.statesEstatesStr[i]);
      i++;
    });
    i=0;
    this.heating.forEach(element => {
      if (element)
        this.heatingString.push(this.heatingStr[i]);
        i++;
    });
    i=0;
    this.characteristics.forEach(element => {
      if (element)
        this.charsString.push(this.characteristicsStr[i]);
      i++;
    });
  }
}
