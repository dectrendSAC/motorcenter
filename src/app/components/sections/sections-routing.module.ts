import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SectionsComponent } from './sections.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PartsComponent } from './parts/parts.component'
import { WorkshopComponent } from './workshop/workshop.component';
import { MoreComponent } from './more/more.component';

const routes: Routes = [
  { path: 'concesionario', component: SectionsComponent, data: {animation: 'Concesionario'}, children: [
      {
        path: 'vehiculos', component: VehiclesComponent, data: {animation: 'Vehiculos'}
      },
      {
        path: 'repuestos', component: PartsComponent, data: {animation: 'Repuestos'}
      },
      {
        path: 'taller', component: WorkshopComponent, data: {animation: 'Taller'}
      },
      {
        path: 'especificaciones', component: MoreComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }