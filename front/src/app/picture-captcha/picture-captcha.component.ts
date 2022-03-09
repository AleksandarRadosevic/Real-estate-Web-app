import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegLoginService } from '../services/reg-login.service';

@Component({
  selector: 'app-picture-captcha',
  templateUrl: './picture-captcha.component.html',
  styleUrls: ['./picture-captcha.component.css']
})
export class PictureCaptchaComponent implements OnInit {

  constructor(private service:RegLoginService,private router:Router) { }

  
  ngOnInit(): void {
    let r=JSON.parse(localStorage.getItem("register"));
    if (r!="true"){
      this.router.navigate(['']);
    }
    this.code();

  }
  
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
          this.correct_size=true;
        }
      else {
        this.correct_size=false;
      }
  }
  
}
code(){
  let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.captcha_str="";
    for (let i = 0; i<7;i++){
      let char=alphaNums[Math.floor(Math.random() * alphaNums.length)];
      this.captcha_str=this.captcha_str+""+char;
      this.correct_size=false;
    }
}
uploadFileToActivity() {
  this.message="";
  if (this.captcha!=this.captcha_str){
    this.message="Uneti captcha kod je pogresan";
    return;
  }
  if (this.correct_size==true){
    this.service.upload(this.fileToUpload).subscribe(res=>{
      alert('Uspeh');
      localStorage.setItem("register",JSON.stringify("false"));
      this.router.navigate(['']);
    });
  }
  else {
    this.message="Slika nije u odgovarajucem formatu";
  }
}
  message:string;
  correct_size:boolean;
  captcha:string;
  captcha_str:string;
  
}
