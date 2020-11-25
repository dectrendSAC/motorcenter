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
  detailsIndex: number;

  clientVehiclesWorkshop = [
    {service: 'Escaneo', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z', step: 2},
    {service: 'Planchado y pintura', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-12-12T12:47:55Z', step: 5},
    {service: 'Reparación', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z', step: 3}
  ];

  servicesSteps = [
    {service: 'Escaneo', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:true}, {title: 'Proceso de escaneo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}]}
  ]

  constructor() { }

  ngOnInit(): void {
    moment.locale('es');
    workshopArray = this.clientVehiclesWorkshop;

    for(let i=0; i<this.clientVehiclesWorkshop.length; i++){
      this.updatedDates.push(moment(this.clientVehiclesWorkshop[i].lastUpdate).format('LL h:mm A'));
    }
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

  showWorkshopStatus(i:any){
    this.detailsIndex = i;
    this.showDetailsStatus = true;
  }

  backToServices(){
    this.showDetailsStatus = false;
  }
}
