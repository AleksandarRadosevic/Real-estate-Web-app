import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { User } from '../models/User';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-estates',
  templateUrl: './seller-estates.component.html',
  styleUrls: ['./seller-estates.component.css']
})
export class SellerEstatesComponent implements OnInit {

  constructor(private service:SellerService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="seller"){
      this.router.navigate(['']);
    }    
    this.service.getAllEstates(this.user.firstname,this.user.lastname).subscribe((msg:Estate[])=>{
      this.estates=msg;
    })
  }
  sold(estate:Estate){
    alert(estate.Realestate.Name);
    this.service.sellEstate(estate._id).subscribe((msg)=>{
      this.ngOnInit();
    })
  }
  update(es:Estate){
    localStorage.setItem("estateUpdate",JSON.stringify(es));
    this.router.navigate(['sellerEstatesUpdate']);
  }
  user:User;
  estates:Estate[];
}
