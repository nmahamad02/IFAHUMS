import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { LookupService } from 'src/app/services/lookup/lookup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  runtimeData: any[] = [];
  mapOptions: google.maps.MapOptions = {};
  marker: any;

  imgSrc = ''
  message = ''
  dtcArr: any[] = []

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCurMonth = this.formatMonth(this.utc);

  constructor(private lookupDataService: LookupService) {
    this.lookupDataService.getBatchData('05-2023').subscribe((res: any) => {
      console.log(res);
      this.runtimeData = res.recordset;
      console.log(this.runtimeData);

      if ((this.runtimeData[0].SMOKE === 'NO') && (this.runtimeData[0].ALCOHOL === 'NO') && (this.dtcArr.length === 0)) {
        this.imgSrc = 'assets/pics/green.png'
        this.message = "The Green light indicates that all systems are normal and your vehicle is in perfect working order."
      } else if ((this.runtimeData[0].SMOKE === 'NO') && (this.runtimeData[0].ALCOHOL === 'NO') && (this.dtcArr.length != 0)) {
        this.imgSrc = 'assets/pics/amber.png'
        this.message = "The Amber light indicates that there is a presence of Diagnostic Trouble Codes that may indicate problems in your car. Please move to Analysis section to get a full report."
      } else if ((this.runtimeData[0].SMOKE === 'NO') || (this.runtimeData[0].ALCOHOL === 'NO')) {
        this.imgSrc = 'assets/pics/red.png'
        this.message = "The Red light indicates that a critical parameter has exceeded the optimum threshold and must be looked into immeadiately. Please refer to the table below to check which component has to be immeadiately looked into."
      } else {
        this.imgSrc = 'assets/pics/green.png'
        this.message = "The Green light indicates that all systems are normal and your vehicle is in perfect working order."
      }

      this.mapOptions = {
        center: { lat: Number(this.runtimeData[0].LATITUDE), lng: Number(this.runtimeData[0].LONGITUDE) },
        zoom: 13
      }
      this.marker = {
        position: { lat: Number(this.runtimeData[0].LATITUDE), lng: Number(this.runtimeData[0].LONGITUDE) },
      }
    })
  }

  ngOnInit(): void {
    
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }

  formatMonth(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [month, year].join('-');
  }

}
