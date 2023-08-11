import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from 'src/app/services/lookup/lookup.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  profileForm: FormGroup;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();

  imageSrc: string[] = [];
  selectedFileToUpload = new File([""], "img");
  errMes: string = '';

  openVehicleProfile: boolean = true;

  selectedRowIndex: any = 0;

  constructor(private lookupservice: LookupService, private uploadService: UploadService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) { 
    this.profileForm = new FormGroup({ 
      profileNo: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      surname: new FormControl('', []),
      birthdate: new FormControl('', [Validators.required]),
      cprNbr: new FormControl('', [Validators.required]),
      profileType: new FormControl('', [Validators.required]),
      add1: new FormControl('', []),
      add2: new FormControl('', []),
      add3: new FormControl('', []), 
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', []),
      vehicleProfiles: new FormArray([]),
    });
    const vehProfile = new FormGroup({
      dOperatorNo: new FormControl('', [Validators.required]),
      dName: new FormControl('', [Validators.required]),
      dNumber: new FormControl('', [Validators.required]),
      dModel: new FormControl('', [Validators.required]),
      dMake: new FormControl('', [Validators.required]),
      dMemberType: new FormControl('S', [Validators.required]),
      dEngType: new FormControl('', []),
      dEngBore: new FormControl('', []),
      dEngStroke: new FormControl('', []),
      dEngDisplacement: new FormControl('', [Validators.required]),
      dImage: new FormControl('', [Validators.required])

    });
    this.vehicleProfiles.push(vehProfile);
  }

  checkDependents(profileType: string) {
    if (profileType === 'V') {
      this.openVehicleProfile = true;
    } 
    else if (profileType === 'P') {
      this.openVehicleProfile = false;
    }
    else if (profileType === 'F') {
      this.openVehicleProfile = false;
    }
  }

  addDependentProfile(type: string,) {
    if (type === 'V') {
      const vehProfile = new FormGroup({
        dOperatorNo: new FormControl('', [Validators.required]),
        dName: new FormControl('', [Validators.required]),
        dNumber: new FormControl('', [Validators.required]),
        dModel: new FormControl('', [Validators.required]),
        dMake: new FormControl('', [Validators.required]),
        dMemberType: new FormControl('S', [Validators.required]),
        dEngType: new FormControl('', []),
        dEngBore: new FormControl('', []),
        dEngStroke: new FormControl('', []),
        dEngDisplacement: new FormControl('', [Validators.required]),
        dImage: new FormControl('', [Validators.required])
      });
      this.vehicleProfiles.push(vehProfile);
    }
    else if (type === 'P') {
      
    }
    else if (type === 'F') {
      
    }
  }

  deleteDependentProfile(type: string, index: number) {
    if (type === 'V') {
      if(this.vehicleProfiles.length === 1){
        console.log(this.vehicleProfiles)
      } else {
        this.vehicleProfiles.removeAt(index);
      }
    }
    else if (type === 'P') {
      
    }
    else if (type === 'F') {
      
    }
  }

  onFileChange(event: any, index: number) {
    var filesList: FileList = event.target.files;
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const fileToUpload: any = filesList.item(0);
      console.log(fileToUpload.name);
      const imgNm: string = fileToUpload.name;
      console.log(imgNm);
      reader.readAsDataURL(fileToUpload);
      reader.onload = () => {
          this.imageSrc.push(reader.result as string); 
          this.profileForm.patchValue({
            //image: reader.result
            image: imgNm
          });
      };
      this.selectedFileToUpload = fileToUpload;
    }
  }

/*
  uploadImage() {
    if (!this.selectedFileToUpload) {
      alert('Please select a file first!'); // or any other message to the user to choose a file
      return;
    } else {
      console.log('attempt to upload')
      this.uploadService.uploadImage(this.selectedFileToUpload);
    }
  }

*/
  submitForm() {
    console.log(this.profileForm.value)
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


  get vehicleProfiles(): FormArray {
    return this.profileForm.get('vehicleProfiles') as FormArray
  }


}
