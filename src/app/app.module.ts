import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { MainComponent } from './components/main/main.component';
import { VehiclesComponent } from './components/sections/vehicles/vehicles.component';
import { WorkshopComponent } from './components/sections/workshop/workshop.component';
import { AboutUsComponent } from './components/main/about-us/about-us.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ClientsComponent } from './components/clients/clients.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { ClientVehiclesComponent } from './components/clients/client-vehicles/client-vehicles.component';
import { ClientWorkshopComponent } from './components/clients/client-workshop/client-workshop.component';
import { ClientCalendarComponent } from './components/clients/client-calendar/client-calendar.component';
import { ClientNotificationsComponent } from './components/clients/client-notifications/client-notifications.component';
import { ClientProfileComponent } from './components/clients/client-profile/client-profile.component';
import { ClientPromotionsComponent } from './components/clients/client-promotions/client-promotions.component';
import { MotorPointsComponent } from './components/clients/motor-points/motor-points.component';
import { QuotesComponent } from './components/clients/quotes/quotes.component';
import { PurchasesComponent } from './components/clients/purchases/purchases.component';
import { RegisterComponent } from './components/sections/register/register.component';
import { BookComponent } from './components/sections/workshop/book/book.component';
import { LoginComponent } from './components/login/login.component';
import { FilterComponent } from './components/sections/vehicles/filter/filter.component';
import { ListComponent } from './components/sections/vehicles/list/list.component';
import { OwlModule } from 'ngx-owl-carousel';
import { MoreComponent } from './components/sections/more/more.component';
import { SuccessComponent } from './components/sections/success/success.component';
import { SideScrollComponent } from './components/sections/side-scroll/side-scroll.component';
import { SectionsComponent } from './components/sections/sections.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ServicesComponent } from './components/sections/workshop/services/services.component';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { PartsComponent } from './components/sections/parts/parts.component';
import { RouterExtService } from './services/previous-url.service';
import { DataService } from './services/pass-data.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ClientDialogComponent } from './components/clients/client-dialog/client-dialog.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    VehiclesComponent,
    WorkshopComponent,
    AboutUsComponent,
    EmployeesComponent,
    ClientsComponent,
    MotorPointsComponent,
    QuotesComponent,
    PurchasesComponent,
    RegisterComponent,
    BookComponent,
    LoginComponent,
    FilterComponent,
    ListComponent,
    MoreComponent,
    SuccessComponent,
    SideScrollComponent,
    SectionsComponent,
    ToolbarComponent,
    ServicesComponent,
    PartsComponent,
    UnderConstructionComponent,
    ClientVehiclesComponent,
    ClientWorkshopComponent,
    ClientCalendarComponent,
    ClientNotificationsComponent,
    ClientProfileComponent,
    ClientPromotionsComponent,
    SidebarComponent,
    ClientDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    MatPasswordStrengthModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-Es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private routerExtService: RouterExtService){}
 }
