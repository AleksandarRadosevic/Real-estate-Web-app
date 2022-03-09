import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agency } from '../models/Agency';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';
import { RegLoginService } from '../services/reg-login.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  constructor(private service: RegLoginService, private router: Router,private adminService:AdminService) {
    this.service.get_all_agencies().subscribe((user: Agency[]) => {
      this.agencies = user;
    });
  }
  user:User;
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="admin"){
      this.router.navigate(['']);
    }
  }

  agencies: Agency[];
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  passwordAgain: string;
  city: string;
  birthdate: Date;
  phone_number: string;
  mail: string;
  agency: string;
  licence_number: string;
  message: string;
  type: string;
  correct_size:boolean;
  fileToUpload: File | null = null;
  handleFileInput(fileInput: any) {
    
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    
    const filesToUpload = (fileInput.target.files);
    this.fileToUpload=filesToUpload[0];
    Img.src = URL.createObjectURL(filesToUpload[0]);
    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      if (height>=100 && height<=300 &&
        width>=100 && width<=300){
          this.service.upload(this.fileToUpload).subscribe(res=>{
          });
        }
      else {
        this.message="Slika nije u odgovarajucem formatu";
      }
  }
  
}

  onItemChange(value) {
    this.type = value;
  }
  register() {
    this.checkInput();
    if (this.message != "")
      return;
      let agencyObject=null;
      if (this.isEmpty(this.agency)==false){
        agencyObject=this.agencies.find(element=>element._id==this.agency);
      }
    this.adminService.registerUser(this.firstname, this.lastname, this.username, this.password,
      this.city, this.birthdate, this.phone_number, this.mail, agencyObject, this.licence_number, this.type).subscribe((user: User) => {
        let msg=user['message'];
        if (msg==="Korisnik vec postoji"){
          this.message=msg;
          return;
        }
        this.service.upload(this.fileToUpload).subscribe(res=>{
          alert('Uspeh');
        });
        this.router.navigate(['adminUsers']);
      });
  }

  checkInput() {

    this.message = "";
    this.requiredFileds();
    if (this.isEmpty(this.message))
      return; 

    if (this.password!=this.passwordAgain){
      this.message="Lozinke moraju da se poklapaju";
    }
    if (/^[a-zA-Z]+$/.test(this.firstname)==false){
      this.message="Ime mora sadrzati samo slova";
      return;
    }
    if (/^[a-zA-Z]+$/.test(this.lastname)==false){
      this.message="Prezime mora sadrzati samo slova";
      return;
    }
    let current_date = new Date();
    let form_data = new Date(this.birthdate);
    if ((form_data.getFullYear() > current_date.getFullYear()) ||
      (form_data.getFullYear() == current_date.getFullYear() && form_data.getMonth() > current_date.getMonth()) ||
      (form_data.getFullYear() == current_date.getFullYear() && form_data.getMonth() == current_date.getMonth() && form_data.getDate() > current_date.getDate())) {
      this.message = "Datum je pogresan";
      return;
    }
    if (this.validateEmail(this.mail)==false){
      this.message = "Mejl je neispravan";
      return;
    }
    if (this.validatePhone(this.phone_number)==false){
        this.message="Telefon je neispravan";
        return;
    }

  }
  requiredFileds() {
    if (this.isEmpty(this.firstname)) {
      this.message = "Ime je obavezno";
      return;
    }
    if (this.isEmpty(this.lastname)) {
      this.message = "Prezime je obavezno";
      return;
    }
    if (this.isEmpty(this.username)) {
      this.message = "Korisnicko ime je obavezno";
      return;
    }
    if (this.isEmpty(this.password)) {
      this.message = "Lozinka je obavezna";
      return;
    }
    if (this.isEmpty(this.passwordAgain)) {
      this.message = "Polje za potvrdu lozinke je obavezna";
      return;
    }
    if (this.isEmpty(this.city)) {
      this.message = "Polje za grad je obavezno";
      return;
    }
    if (this.isEmpty(this.birthdate)) {
      this.message = "Polje za datum rodjenja je obavezno";
      return;
    }
    if (this.isEmpty(this.mail)) {
      this.message = "Polje za mejl je obavezno";
      return;
    }
    if (this.isEmpty(this.phone_number)) {
      this.message = "Polje za broj telefona je obavezno";
      return;
    }
    if (this.isEmpty(this.licence_number) && this.type=="seller"){
      this.message = "Polje za broj licence je obavezno";
      return;
    }
    if (this.isEmpty(this.agency) && this.type=="seller"){
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
