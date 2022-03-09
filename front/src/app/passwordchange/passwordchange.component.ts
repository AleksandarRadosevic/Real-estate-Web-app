import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { RegLoginService } from '../services/reg-login.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  constructor(private router:Router,private service:RegLoginService) { }

  ngOnInit(): void {
    this.admin=false;
    this.customer=false;
    this.seller=false;
    this.user = JSON.parse(localStorage.getItem("logged"));
    if (this.user==null){
      this.router.navigate(['']);
    }
    if (this.user.type=="admin")
      this.admin=true;
    else if (this.user.type=="seller")
    this.seller=true;
    else if (this.user.type=="customer")
      this.customer=true;
  }
  admin:boolean;
  customer:boolean;
  seller:boolean;
  pass_again: string;
  old: string;
  password: string;
  user: User;
  message: string;
  change() { 
    this.message="";
    if (this.user.password == this.old) {
      if (this.pass_again == this.password) {
        this.service.changePass(this.user.username,this.password).subscribe((res)=>{
          alert(res['message']);
          localStorage.setItem("logged",null);
          this.router.navigate(['login']);
          return;
        })
      }
      else {
        this.message="Lozinke se ne poklapaju";
      }
    }
    else {
      this.message = "Pogresna stara lozinka";
      return;
    }
  }

}
