import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/Agency';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-agency',
  templateUrl: './admin-agency.component.html',
  styleUrls: ['./admin-agency.component.css']
})
export class AdminAgencyComponent implements OnInit {
  constructor(private service:AdminService,private router:Router) { }
  user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
    this.service.getAgencies().subscribe((agencies:Agency[])=>{
      this.agencies=agencies;
    })
  }
    
  agencies:Agency[];
}
