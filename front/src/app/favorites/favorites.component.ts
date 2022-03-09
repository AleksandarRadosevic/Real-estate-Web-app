import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { User } from '../models/User';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private service: EstateService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("logged"));
    if (this.user == null || this.user.type != "customer") {
      this.router.navigate(['']);
    }
    this.service.getAll().subscribe((e: Estate[]) => {
      this.advertisements = [];
      this.user.favorites.forEach(fav => {
        let elem = e.find(elem => elem._id == fav);
        this.advertisements.push(elem);
      });
      this.advertisements.forEach((element: Estate) => {
        this.service.getAveragePriceM2(element.Realestate.Type, element.Realestate.Microlocation).subscribe((res: any) => {
          element.Realestate.Avg = Math.round(res['avg']);
        })
      });
    })
  }

  dropFromFavorites(adv: Estate) {
    this.service.dropFromFavorites(this.user.username, adv._id).subscribe((msg) => {
      alert(msg['message']);
      const index = this.advertisements.indexOf(adv);
      if (index > -1) {
        this.advertisements.splice(index, 1); // 2nd parameter means remove one item only
      }
      const indexS = this.user.favorites.indexOf(adv._id);
      if (indexS > -1) {
        this.user.favorites.splice(index, 1); // 2nd parameter means remove one item only
      }
      localStorage.setItem("logged", JSON.stringify(this.user));
    })
  }
  comeIn(adv: Estate) {
    localStorage.setItem("adv", JSON.stringify(adv));
  }

  user: User;
  advertisements: Estate[];
}
