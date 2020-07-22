import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {SectionsComponent} from './components/sections/sections.component';
import {VehiclesComponent} from './components/sections/vehicles/vehicles.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'concesionario', component: SectionsComponent },
  { path: 'iniciar-sesion', component: LoginComponent},
  { path: 'vehiculos', component: VehiclesComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }