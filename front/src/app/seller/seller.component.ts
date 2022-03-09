import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { User } from '../models/User';
import { CustomerService } from '../services/customer.service';
import { RegLoginService } from '../services/reg-login.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  constructor(private service:RegLoginService,private router:Router,private sellerService:SellerService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="seller"){
      this.router.navigate(['']);
    }    
    this.service.getPicture(this.user.username).subscribe((res:string)=>{
      this.picture=res;
    });
    

  }
  user:User;
  picture:string;
  estates:Estate[];
}
