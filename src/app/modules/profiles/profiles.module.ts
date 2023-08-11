import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const profileRoutes = [
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
    MatFormFieldModule,
    MatInputModule,   
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forChild(profileRoutes)
  ]
})
export class ProfilesModule { }
