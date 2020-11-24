import { Component, OnInit } from '@angular/core';

import * as _moment from 'moment';

const moment = _moment;
let workshopArray = [];

@Component({
  selector: 'app-client-workshop',
  templateUrl: './client-workshop.component.html',
  styleUrls: ['./client-workshop.component.scss']
})
export class ClientWorkshopComponent implements OnInit {
  updatedDates = [];
  showDetailsStatus: boolean = false;

  clientVehiclesWorkshop = [
    {service: 'Escaneo', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z'},
    {service: 'Planchado y pintura', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-12-12T12:47:55Z'},
    {service: 'Reparación', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z'}
  ];

  constructor() { }

  ngOnInit(): void {
    moment.locale('es');
    workshopArray = this.clientVehiclesWorkshop;

    for(let i=0; i<this.clientVehiclesWorkshop.length; i++){
      this.updatedDates.push(moment(this.clientVehiclesWorkshop[i].lastUpdate).format('LL h:mm A'));
    }
  }

  showWorkshopStatus(i:any){
    this.showDetailsStatus = true;

    console.log(this.clientVehiclesWorkshop[i]);

  }

  filterMethod(element:any){
    const allowed = [element];

    if (element == 'default'){
      this.clientVehiclesWorkshop = workshopArray;
    } else {
      this.clientVehiclesWorkshop = workshopArray;
      this.clientVehiclesWorkshop = this.clientVehiclesWorkshop.filter( i => allowed.includes( i.service ) );
    }
  }
}
