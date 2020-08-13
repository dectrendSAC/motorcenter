import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component'
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientVehiclesComponent } from './client-vehicles/client-vehicles.component';
import { ClientNotificationsComponent } from './client-notifications/client-notifications.component'
import { MotorPointsComponent } from './motor-points/motor-points.component';
import { QuotesComponent } from './quotes/quotes.component';
import { ClientCalendarComponent } from './client-calendar/client-calendar.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { ClientPromotionsComponent } from './client-promotions/client-promotions.component';
import { ClientWorkshopComponent } from './client-workshop/client-workshop.component';

const routes: Routes = [
  { path: 'clientes', component: ClientsComponent, data: {animation: 'Clientes'}, children: [
      {
        path: 'perfil', component: ClientProfileComponent, data: {animation: 'ClientePerfil'}
      },
      {
        path: 'vehiculos', component: ClientVehiclesComponent, data: {animation: 'ClienteVehiculos'}
      },
      {
        path: 'notificaciones', component: ClientNotificationsComponent, data: {animation: 'ClienteNotificaciones'}
      },
      {
        path: 'motor-puntos', component: MotorPointsComponent, data: {animation: 'MotorPuntos'}
      },
      {
        path: 'cotizaciones', component: QuotesComponent, data: {animation: 'Cotizaciones'}
      },
      {
        path: 'calendario', component: ClientCalendarComponent, data: {animation: 'ClienteCalendario'}
      },
      {
        path: 'compras', component: PurchasesComponent, data: {animation: 'Compras'}
      },
      {
        path: 'promociones', component: ClientPromotionsComponent, data: {animation: 'ClientePromociones'}
      },
      {
        path: 'taller', component: ClientWorkshopComponent, data: {animation: 'ClienteTaller'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }