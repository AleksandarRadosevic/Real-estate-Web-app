import { Component, OnInit } from '@angular/core';
import { Locations } from '../models/Locations';
import { User } from '../models/User';
import { Location } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-street',
  templateUrl: './add-street.component.html',
  styleUrls: ['./add-street.component.css']
})
export class AddStreetComponent implements OnInit {

  constructor(private goBack:Location,private service:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
    this.name="";
    this.location=JSON.parse(localStorage.getItem("street"));
    if (this.user.type!='admin' || this.location==undefined || this.location==null){
        this.goBack.back();
    }
  }
  addStreet(){
    if (this.name==""){
      this.message="Unesite ime ulice";
    }
    this.service.addStreet(this.location,this.name).subscribe((msg)=>{
      alert(msg);
      this.name="";
    })
  }

  message:string;
  name:string;
  user:User;
  location:Locations;
}
