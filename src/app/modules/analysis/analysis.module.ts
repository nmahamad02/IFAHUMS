import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance/performance.component';
import { DtcComponent } from './dtc/dtc.component';
import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';


export const analysisRoutes = [
  {
    path: 'performance',
    component: PerformanceComponent
  },
  {
    path: 'dtc',
    component: DtcComponent
  },
]

@NgModule({
  declarations: [
    PerformanceComponent,
    DtcComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
   // GoogleMapsModule,
    NgChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB1QAe_TPquPkEbRb_GPk3Hf2F0-rz76Dw',
      libraries: ['places']
    }),
    RouterModule.forChild(analysisRoutes)
  ]
})
export class AnalysisModule { }
