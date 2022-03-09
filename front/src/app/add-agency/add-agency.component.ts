import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  constructor(private router:Router,private service:AdminService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
  }
  user:User;
  name:string;
  pib:number;
  address:string;
  city:string;
  phone:string;
  message:string;

  add(){
    this.service.addAgency(this.name,this.pib,this.city,this.address,this.phone).subscribe((msg)=>{
      if (msg==null){
        this.message="Agencija sa ovim PIBom vec postoji";
        return;
      }
      alert("Uspeh");
      this.router.navigate(['adminAgency']);
    })
  }

}
