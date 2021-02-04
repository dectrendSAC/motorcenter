import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './/employees.component'
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeVehiclesComponent } from './employee-vehicles/employee-vehicles.component';
import { EmployeeUsersComponent } from './employee-users/employee-users.component'
import { EmployeePromotionsComponent } from './employee-promotions/employee-promotions.component';
import { EmployeeNotificationsComponent } from './employee-notifications/employee-notifications.component';
import { EmployeeCalendarComponent } from './employee-calendar/employee-calendar.component';
import { EmployeeProspectsComponent } from './employee-prospects/employee-prospects.component';
import { EmployeeClientsComponent } from './employee-clients/employee-clients.component';
import { EmployeeWorkshopComponent } from './employee-workshop/employee-workshop.component';

const routes: Routes = [
  { path: 'empleados', component: EmployeesComponent, data: {animation: 'Empleados'}, children: [
      {
        path: 'perfil', component: EmployeeProfileComponent, data: {animation: 'EmpleadoPerfil'}
      },
      {
        path: 'vehiculos', component: EmployeeVehiclesComponent, data: {animation: 'EmpleadoVehiculos'}
      },
      {
        path: 'usuarios', component: EmployeeUsersComponent, data: {animation: 'EmpleadoUsuarios'}
      },
      {
        path: 'promociones', component: EmployeePromotionsComponent, data: {animation: 'EmpleadoPromociones'}
      },
      {
        path: 'notificaciones', component: EmployeeNotificationsComponent, data: {animation: 'EmpleadoNotificaciones'}
      },
      {
        path: 'calendario', component: EmployeeCalendarComponent, data: {animation: 'EmpleadoCalendario'}
      },
      {
        path: 'prospectos', component: EmployeeProspectsComponent, data: {animation: 'EmpleadoProspectos'}
      },
      {
        path: 'clientes', component: EmployeeClientsComponent, data: {animation: 'EmpleadosClientes'}
      },
      {
        path: 'taller', component: EmployeeWorkshopComponent, data: {animation: 'EmpleadoTaller'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
