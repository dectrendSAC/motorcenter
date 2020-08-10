import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {SectionsComponent} from './components/sections/sections.component';
import {ClientsComponent} from './components/clients/clients.component';
import {LoginComponent} from './components/login/login.component';
import {SectionsRoutingModule} from './components/sections/sections-routing.module';

import { RouterExtService } from './services/previous-url.service';

const routes: Routes = [
  { path: '', children:[
      { path: '', component: MainComponent, pathMatch: 'full', data: {animation: 'Main'}},
      { path: 'concesionario', component: SectionsComponent , data: {animation: 'Concesionario'}},
      { path: 'iniciar-sesion', component: LoginComponent},
      { path: 'clientes', component: ClientsComponent},
    ]
  }
];

@NgModule({
  imports: [
    SectionsRoutingModule,
    RouterModule.forRoot(routes,{ enableTracing: false })
  ],
  exports: [RouterModule],
  providers: [RouterExtService]
})
export class AppRoutingModule { }