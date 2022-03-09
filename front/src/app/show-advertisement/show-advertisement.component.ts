import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { User } from '../models/User';
import { EstateService } from '../services/estate.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-advertisement',
  templateUrl: './show-advertisement.component.html',
  styleUrls: ['./show-advertisement.component.css']
})
export class ShowAdvertisementComponent implements OnInit {

  constructor(private router: Router, private service: EstateService, private location: Location) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("logged"));
    if (this.user == null || this.user.type != "customer") {
      this.router.navigate(['']);
    }
    this.advertisement = JSON.parse(localStorage.getItem("adv"));
    if (this.advertisement == null || this.advertisement == undefined)
      this.location.back();
    this.pictureFirst = this.advertisement.Pictures[0];
    for (let i = 1; i < this.advertisement.Pictures.length; i++) {
      this.picturesNumber.push(i);
      this.pictures.push(this.advertisement.Pictures[i]);
    }
    this.hide = false;
    this.avg = Math.round(this.advertisement.Realestate.Price / this.advertisement.Realestate.Area);
    this.user = JSON.parse(localStorage.getItem("logged"));
  }
  show() {
    this.hide = !this.hide;
  }
  addToFavorites() {
    let i = true;
    if (this.user.favorites.length >= 5) {
      alert("Maksimalan broj omiljenih oglasa je 5");
      return;
    }
    else {
      this.user.favorites.forEach((element) => {
        if (this.advertisement._id == element) {
          i = false;
        }
      });
      if (i == true) {
        this.service.addToFavorites(this.advertisement._id, this.user.username).subscribe((msg) => {
          alert(msg['message']);
          this.user.favorites.push(this.advertisement._id);
          localStorage.setItem("logged", JSON.stringify(this.user));
        });
      }
      else {
        alert("Oglas je vec dodat u omiljene");
      }
    }
  }
  avg: number;
  hide: boolean;
  elements: string[];
  advertisement: Estate;
  user: User;
  pictureFirst: string;
  picturesNumber = [];
  pictures = [];
}
