import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profiles',
    loadChildren: () => import('./modules/profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'analysis',
    loadChildren: () => import('./modules/analysis/analysis.module').then(m => m.AnalysisModule)
  },
  {
    path: 'parameters',
    loadChildren: () => import('./modules/parameters/parameters.module').then(m => m.ParametersModule)
  },
  { 
    path: '**', //If path doesn't match anything reroute to /authentication/signin
    redirectTo: '/home/dashboard', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
