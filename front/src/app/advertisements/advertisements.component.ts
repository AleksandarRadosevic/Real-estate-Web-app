import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { User } from '../models/User';
import { EstateService } from '../services/estate.service';
import { Location } from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css']
})
export class AdvertisementsComponent implements OnInit {

  constructor(private router:Router,private service:EstateService,private location:Location) { }
  private user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="customer"){
      this.router.navigate(['']);
    }
    let search=JSON.parse(localStorage.getItem("basicSearch"));
    if (search==null || search=="" || search==undefined){
      this.location.back();
    }
    // localStorage.setItem("basicSearch",null);
    let type=search.type;
    let cities=search.city;
    let mun=search.mun;
    let micro=search.micro;
    let price=search.price;
    let size=search.area;
    let rooms=search.rooms;
    this.advertisements=[];
    this.service.getBasicResults(type,cities,mun,micro,price,size,rooms).subscribe((adv:Estate[])=>{
      this.allAdvertisements=adv;
      this.maxPage=Math.floor(this.allAdvertisements.length/10);
      this.allAdvertisements.forEach((element:Estate) => {
        this.service.getAveragePriceM2(element.Realestate.Type,element.Realestate.Microlocation).subscribe((res:any)=>{
          element.Realestate.Avg=Math.round(res['avg']);
        })
      });
      for(let i =0;i<10 && i<this.allAdvertisements.length;i++){
        this.advertisements.push(this.allAdvertisements[i]);
      }
    })
    
  }
  comeIn(adv:Estate){
    localStorage.setItem("adv",JSON.stringify(adv));
  }
  advertisements:Estate[];
  allAdvertisements:Estate[];
  maxPage:number;
  pageNow=0;

  prev(){
    if (this.pageNow==0)
      return;
    else
    {
      this.pageNow--;
      this.advertisements=[];
      for(let i=(10)*this.pageNow;i<(10)*(this.pageNow+1) && i<this.allAdvertisements.length;i++)
        this.advertisements.push(this.allAdvertisements[i]);
    }
  }

  next(){
    if (this.pageNow==this.maxPage)
      return;
    else {
      this.pageNow++;
      this.advertisements=[];
      for(let i=(10)*this.pageNow;i<(10)*(this.pageNow+1) && i<this.allAdvertisements.length;i++)
        this.advertisements.push(this.allAdvertisements[i]);
    }
  }
}
