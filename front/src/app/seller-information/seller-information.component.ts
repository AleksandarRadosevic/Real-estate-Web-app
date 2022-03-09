import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/Agency';
import { User } from '../models/User';
import { RegLoginService } from '../services/reg-login.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-information',
  templateUrl: './seller-information.component.html',
  styleUrls: ['./seller-information.component.css']
})
export class SellerInformationComponent implements OnInit {

  constructor(private router:Router,private service:RegLoginService,private sellerService:SellerService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="seller"){
      this.router.navigate(['']);
    }    
    this.service.get_all_agencies().subscribe((user: Agency[]) => {
      this.agencies = user;
    });
    this.mail=this.user.mail;
    this.phone=this.user.phone_number;
    if (this.user.agency!=null){
      this.agency=this.user.agency.Name;
    }
  }
  mail: string;
  phone: string;
  user: User;
  agency:string;
  message: string;
  agencies:Agency[];
  change() { 
    this.message="";
    if (this.isEmpty(this.mail)) {
      this.message = "Polje za mejl je obavezno";
      return;
    }
    if (this.isEmpty(this.phone)) {
      this.message = "Polje za broj telefona je obavezno";
      return;
    }
    let ag=this.agencies.find(element=>element.Name==this.agency);
    if (ag==undefined){
      ag=null;
    }
    const data={
      username:this.user.username,
      phone:this.phone,
      mail:this.mail,
      agency:ag
    };
    this.sellerService.updateInfo(data).subscribe((m)=>{
      this.user.phone_number=this.phone;
      this.user.mail=this.mail;
      this.user.agency=data.agency;
      localStorage.setItem("logged",JSON.stringify(this.user));
      this.router.navigate(['seller']);
    })
  }
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  }
  isEmpty(str) {
    return (!str || str.length === 0);
  }
}
