import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgChartsModule } from 'ng2-charts';

export const homeRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    GoogleMapsModule,
    NgChartsModule,
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1QAe_TPquPkEbRb_GPk3Hf2F0-rz76Dw',
      libraries: ['places']
    }),*/
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeModule { }
