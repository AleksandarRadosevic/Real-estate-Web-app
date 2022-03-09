import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Locations } from '../models/Locations'
import { Street } from '../models/Street';
import { User } from '../models/User';
@Component({
  selector: 'app-admin-microlocation',
  templateUrl: './admin-microlocation.component.html',
  styleUrls: ['./admin-microlocation.component.css']
})
export class AdminMicrolocationComponent implements OnInit {

  constructor(private service: AdminService, private router: Router) { }
  user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
    this.service.getAllLocations().subscribe((agencies: Locations[]) => {
      this.locations = agencies;
      this.locations.forEach((element: Locations) => {
        element.Street.forEach(street => {
          let s = new Street();
          s.City = element.City;
          s.Microlocation = element.Microlocation;
          s.Municipality = element.Municipality;
          s.Street = street;
          this.streets.push(s);
        });
      });
    })
  }

  locations: Locations[];
  streets = [];
  remove(event: any, location: Locations) {
    this.service.deleteMicrolocation(location.Microlocation).subscribe((msg) => {
      if (msg == null) {
        alert("U bazi postoje oglasi sa ovom mikrolokacijom");
        return;
      }
      else {
        this.ngOnInit();
      }
    })
  }
  addStreet(location) {
    localStorage.setItem("street", JSON.stringify(location));
    this.router.navigate(['adminAddStreet']);
  }
  deleteStreet(event: any, location: Street) {
    this.service.deleteStreet(location).subscribe((msg) => {
      alert(msg);
      this.streets=[];
      this.ngOnInit();

    })
  }
}
