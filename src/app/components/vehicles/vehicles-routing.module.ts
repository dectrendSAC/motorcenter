import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'vehiculos', component: VehiclesComponent, children: [
            {
                path: 'search', component: RegisterComponent
            }
        ]   
    }
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VehiclesRoutingModule { }