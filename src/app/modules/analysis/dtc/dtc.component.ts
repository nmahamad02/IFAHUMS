import { Component } from '@angular/core';
import { LookupService } from 'src/app/services/lookup/lookup.service';

@Component({
  selector: 'app-dtc',
  templateUrl: './dtc.component.html',
  styleUrls: ['./dtc.component.css']
})
export class DtcComponent {
  imgSrc = ''
  message = ''
  dtcArr: any[] = []

  constructor(private lookupDataService: LookupService) {
    if (this.dtcArr.length === 0) {
      this.imgSrc = 'assets/pics/green.png'
      this.message = "The Green light indicates that all systems are normal and your vehicle is in perfect working order. Moreover, no diagnostic trouble codes identified."
    } else if (this.dtcArr.length != 0) {
      this.imgSrc = 'assets/pics/amber.png'
      this.message = "The Amber light indicates that there is a presence of Diagnostic Trouble Codes that may indicate problems in your car. Please move to Analysis section to get a full report."
    } 
  }

}
