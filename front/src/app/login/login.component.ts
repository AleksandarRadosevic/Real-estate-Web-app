import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { RegLoginService } from '../services/reg-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:RegLoginService,private router:Router) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;
  message:string;
  login(){
    this.message="";
    this.service.login(this.username,this.password).subscribe((user:User)=>{
      if (user){
        if (user.request=="accept"){
        this.router.navigate([user.type]);
        localStorage.setItem("logged",JSON.stringify(user));
        }
        else if (user.request=="pending"){
          this.message="Zahtev za registraciju je na cekanju";
        }
        else {
          this.message="Zahtev za registraciju je odbijen";
        }
      }
      else {
        this.message="Pogrešni kredencijali";
      }
    })
  }
}
