import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'node_modules/chart.js';
import { Estate } from '../models/Estate';
import { Locations } from '../models/Locations';
import { User } from '../models/User';
import { AdminService } from '../services/admin.service';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-graphs',
  templateUrl: './seller-graphs.component.html',
  styleUrls: ['./seller-graphs.component.css']
})
export class SellerGraphsComponent implements OnInit {

  constructor(private service:AdminService,private router:Router,private sellerService:SellerService) { }
//'Blue', 'Yellow', 'Green', 'Purple', 'Orange'
  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("logged"));
    if (this.user==null || this.user.type!="seller"){
      this.router.navigate(['']);
    }    

    this.idLocation="Unesite mikrolokaciju"
    this.service.getAllLocations().subscribe((loc: Locations[]) => {
      this.locations = loc;
    });
  }
  user:User;
  locations:Locations[];
  idLocation:string;
  chooseLocation(){ 
    let arr=[0,0,0,0,0,0,0,0,0,0,0,0];
    let location:Locations;
    location=this.locations.find(element=>element._id==this.idLocation);
    const data={
      city:location.City,
      mun:location.Municipality,
      micro:location.Microlocation,
      name:null
    };
    if (this.user.agency==null){
      this.sellerService.SellerSoldEstates(data).subscribe((msg:Estate[])=>{
        if(msg.length>0){
        msg.forEach(element => {
          let date=new Date(element.Realestate.DateSold);
          arr[date.getMonth()]++;
        });
      }
      this.initChart(arr);
      })
    }
    else {
      data.name=this.user.agency.Name;
      this.sellerService.AgencySoldEstate(data).subscribe((msg:Estate[])=>{
        if(msg.length>0){
          msg.forEach(element => {
            let date=new Date(element.Realestate.DateSold);
            arr[date.getMonth()]++;
          });
        }
        this.initChart(arr);
      })
    }
  }

  initChart(arr){
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Avg','Sept','Okt','Nov','Dec'],
        datasets: [{
          label: '# Prodatih',
          data: arr,
          backgroundColor: [
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)',
            'rgba(255, 0, 0, 0.9)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
