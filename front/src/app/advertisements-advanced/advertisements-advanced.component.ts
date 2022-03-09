import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { Location } from '@angular/common';
import { EstateService } from '../services/estate.service';
import { User } from '../models/User';

@Component({
  selector: 'app-advertisements-advanced',
  templateUrl: './advertisements-advanced.component.html',
  styleUrls: ['./advertisements-advanced.component.css']
})
export class AdvertisementsAdvancedComponent implements OnInit {

  constructor(private router:Router,private location:Location,private service:EstateService) { }
  private user:User;
  ngOnInit(): void {
    this.allAdvertisements=[];
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="customer"){
      this.router.navigate(['']);
    }
    this.allAdvertisements=JSON.parse(localStorage.getItem("advertisements"));
    if (this.allAdvertisements==null || this.allAdvertisements.length==null || this.allAdvertisements==undefined){
      this.location.back();
    }
    this.allAdvertisements.forEach((element:Estate) => {
      this.service.getAveragePriceM2(element.Realestate.Type,element.Realestate.Microlocation).subscribe((res:any)=>{
        element.Realestate.Avg=Math.round(res['avg']);
      })
    });
    let isValid=JSON.parse(localStorage.getItem("advancedSearch"));
    if (isValid!="success"){
      this.location.back();
    }
    this.advertisements=[];
    this.maxPage=Math.floor(this.allAdvertisements.length/10);
    for(let i =0;i<10 && i<this.allAdvertisements.length;i++){
      this.advertisements.push(this.allAdvertisements[i]);
    }
  }

  advertisements:Estate[];
  allAdvertisements:Estate[];
  maxPage:number;
  pageNow=0;
  comeIn(adv:Estate){
    localStorage.setItem("adv",JSON.stringify(adv));
  }

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
