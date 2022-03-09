import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private service: AdminService, private router: Router) { }
  private user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
    this.service.getAllRequests().subscribe((req: User[]) => {
      this.pending_requests = req;
    });
    this.service.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      let admin=this.users.find(element=>element.username=="admin");
      const index = this.users.indexOf(admin);
      if (index > -1) {
        this.users.splice(index, 1); 
      }
    })
  }
  accept(user) {
    this.service.acceptUser(user).subscribe((msg) => {
      alert(msg);
    })
  }
  deny(user) {
    this.service.denyUser(user).subscribe((msg) => {
      alert(msg);
    })
  }

  update(user: User) {
    localStorage.setItem("updateUser", JSON.stringify(user));
    this.router.navigate(['updateUser']);
  }

  delete(user) {
    this.service.deleteUser(user).subscribe((msg) => {
      alert(msg);
    });
  }
  removeImages() {
    
  }
  pending_requests: User[];
  users: User[];

}
