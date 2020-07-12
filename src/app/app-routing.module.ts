import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {MainRoutingModule} from './components/main/main-routing.module';
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {VehiclesRoutingModule} from './components/vehicles/vehicles-routing.module';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'iniciar-sesion', component: LoginComponent},
  { path: 'vehiculos', component: VehiclesComponent},
];

@NgModule({
  imports: [
    MainRoutingModule,
    VehiclesRoutingModule,
    RouterModule.forRoot(routes,{ enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }