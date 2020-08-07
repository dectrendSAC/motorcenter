import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionsComponent } from './sections.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WorkshopComponent } from './workshop/workshop.component';
import { MoreComponent } from './more/more.component';

const routes: Routes = [
  {
    path: 'concesionario', component: SectionsComponent, children: [
      {
        path: 'vehiculos', component: VehiclesComponent
      },
      {
        path: 'taller', component: WorkshopComponent
      },
      {
        path: 'especificaciones', component: MoreComponent
      },
      {
        path: 'concesionario', redirectTo: 'vehiculos', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }