import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/Agency';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';
import { RegLoginService } from '../services/reg-login.service';

@Component({
  selector: 'app-admin-update-user',
  templateUrl: './admin-update-user.component.html',
  styleUrls: ['./admin-update-user.component.css']
})
export class AdminUpdateUserComponent implements OnInit {

  constructor(private router:Router,private service:RegLoginService,private adminService:AdminService) { }

  ngOnInit(): void {
    this.validUser=JSON.parse(localStorage.getItem("logged"));
    if (this.validUser==null || this.validUser.type!="admin"){
      this.router.navigate(['']);
    }
    this.service.get_all_agencies().subscribe((agencies: Agency[]) => {
      this.agencies = agencies;
    });
    this.user=JSON.parse(localStorage.getItem("updateUser"));
  }
  validUser:User;
  user:User;
  agencies: Agency[];
  message:string;
  agency:string;
  onItemChange(value) {
    this.user.type = value;
  }
  update() {
    this.checkInput();
    if (this.message != "")
      return;
    let ag=this.agencies.find(element=>element.Name==this.agency);
      if (ag==undefined){
        ag=null;
      }
    this.user.agency=ag;
    this.adminService.updateUser(this.user).subscribe((msg)=>{
      alert(msg);
      localStorage.removeItem("updateUser");
      this.router.navigate(['adminUsers']);
    })
  }

  checkInput() {

    this.message = "";
    this.requiredFileds();
    if (this.isEmpty(this.message))
      return; 

    if (/^[a-zA-Z]+$/.test(this.user.firstname)==false){
      this.message="Ime mora sadrzati samo slova";
      return;
    }
    if (/^[a-zA-Z]+$/.test(this.user.lastname)==false){
      this.message="Prezime mora sadrzati samo slova";
      return;
    }
    let current_date = new Date();
    let form_data = new Date(this.user.birthdate);
    if ((form_data.getFullYear() > current_date.getFullYear()) ||
      (form_data.getFullYear() == current_date.getFullYear() && form_data.getMonth() > current_date.getMonth()) ||
      (form_data.getFullYear() == current_date.getFullYear() && form_data.getMonth() == current_date.getMonth() && form_data.getDate() > current_date.getDate())) {
      this.message = "Datum je pogresan";
      return;
    }
    if (this.validateEmail(this.user.mail)==false){
      this.message = "Mejl je neispravan";
      return;
    }
    if (this.validatePhone(this.user.phone_number)==false){
        this.message="Telefon je neispravan";
        return;
    }

  }
  requiredFileds() {
    if (this.isEmpty(this.user.firstname)) {
      this.message = "Ime je obavezno";
      return;
    }
    if (this.isEmpty(this.user.lastname)) {
      this.message = "Prezime je obavezno";
      return;
    }
    if (this.isEmpty(this.user.username)) {
      this.message = "Korisnicko ime je obavezno";
      return;
    }
    if (this.isEmpty(this.user.password)) {
      this.message = "Lozinka je obavezna";
      return;
    }
    if (this.isEmpty(this.user.city)) {
      this.message = "Polje za grad je obavezno";
      return;
    }
    if (this.isEmpty(this.user.birthdate)) {
      this.message = "Polje za datum rodjenja je obavezno";
      return;
    }
    if (this.isEmpty(this.user.mail)) {
      this.message = "Polje za mejl je obavezno";
      return;
    }
    if (this.isEmpty(this.user.phone_number)) {
      this.message = "Polje za broj telefona je obavezno";
      return;
    }
    if (this.isEmpty(this.user.licence_number) && this.user.type=="seller"){
      this.message = "Polje za broj licence je obavezno";
      return;
    }
    if (this.isEmpty(this.agency) && this.user.type=="seller"){
      this.message = "Izabrati agenciju";
      return;
    }
  }
  isEmpty(str) {
    return (!str || str.length === 0);
  }
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
  }
}
