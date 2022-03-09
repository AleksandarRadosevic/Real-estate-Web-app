import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from '../models/Estate';
import { EstateService } from '../services/estate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:EstateService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.estates=[];
    this.service.getAll().subscribe((est:Estate[])=>{
      est.sort((a,b)=>{
        if(a.Realestate.LastModified<b.Realestate.LastModified){
          return 1;
        }else{
          if(a.Realestate.LastModified==b.Realestate.LastModified){
            return 0;
          }
          else{
            return -1;
          }
        }
      });
      for (let i =0;i<5 && i<est.length;i++){
        this.estates.push(est[i]);
      }
    })
  }
  estates:Estate[];

  
}
