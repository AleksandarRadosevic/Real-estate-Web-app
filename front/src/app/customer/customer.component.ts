import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { CustomerService } from '../services/customer.service';
import { RegLoginService } from '../services/reg-login.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private service:RegLoginService,private router:Router,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="customer"){
      this.router.navigate(['']);
    }
    
    this.service.getPicture(this.user.username).subscribe((res:string)=>{
      this.picture=res;
    });
    
  }
  changePassword(){
    this.router.navigate(['changePass']);
  }
  user:User;
  picture:string;
}
