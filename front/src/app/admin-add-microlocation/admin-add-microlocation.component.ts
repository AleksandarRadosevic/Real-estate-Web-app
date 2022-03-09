import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';
import {Locations} from '../models/Locations'
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-add-microlocation',
  templateUrl: './admin-add-microlocation.component.html',
  styleUrls: ['./admin-add-microlocation.component.css']
})
export class AdminAddMicrolocationComponent implements OnInit {

  constructor(private router:Router,private service:AdminService) { }
  user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
    this.locations=[];
    this.service.getAllLocations().subscribe((locs:Locations[])=>{
      let v=locs;
      v.forEach(element1 => {
        let f=this.locations.find(element=>(element.City==element1.City && element.Municipality==element1.Municipality));
        if (f==undefined){
          this.locations.push(element1);
        }
      });
    });
  }
  add(){
    this.message="";
    this.location=this.locations.find(element=> element._id==this.choose);
    if (this.location==undefined){
      this.message="Izaberite grad i opstinu";
      return;
    }
    if (this.name==""){
      this.message="Unesite ime";
      return;
    }
    this.service.addMicrolocation(this.location.City,this.location.Municipality,this.name).subscribe((msg)=>{
      alert(msg);
      this.ngOnInit();
    })
  }
  message:string;
  choose="Izaberi grad i opstinu";
  name="";
  locations:Locations[];
  location:Locations;
}
