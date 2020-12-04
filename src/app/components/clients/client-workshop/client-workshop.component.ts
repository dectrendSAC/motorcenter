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
  selectedStep: number;
  stepStatus: string = 'done';

  clientVehiclesWorkshop = [
    {service: 'Escaneo', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z', step: 2},
    {service: 'Planchado y pintura', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-12-12T12:47:55Z', step: 5},
    {service: 'Reparación', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z', step: 3}
  ];

  servicesSteps = [
    {service: 'Escaneo', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:true}, {title: 'Proceso de escaneo', content:'Se procede a escanear el vehículo', media:'', date:'2020-02-12T12:47:55Z', status:true}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}]},
    {service: 'Mantenimiento', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:true}, {title: 'Proceso de escaneo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}]},
    {service: 'Reparación', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:true}, {title: 'Proceso de escaneo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}]},
    {service: 'Planchado y pintura', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:true}, {title: 'Proceso de escaneo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.', media:'', date:'2020-02-12T12:47:55Z', status:false}]}
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
    if(this.clientVehiclesWorkshop[i].service == 'Escaneo'){
      this.detailsIndex = 0;
    } else if (this.clientVehiclesWorkshop[i].service == 'Mantenimiento') {
      this.detailsIndex = 1;
    } else if (this.clientVehiclesWorkshop[i].service == 'Reparación') {
      this.detailsIndex = 2;
    } else {
      this.detailsIndex = 3;
    }

    this.showDetailsStatus = true;
    this.selectedStep = this.clientVehiclesWorkshop[i].step;

    //Verify step status
    const steps = [...Array(this.servicesSteps[this.detailsIndex].steps).keys()]
    steps.forEach(index => {
      if (this.servicesSteps[this.detailsIndex].stepsDetails[index]){
        if(this.servicesSteps[this.detailsIndex].stepsDetails[index].status){
          document.querySelector("body").style.cssText = "--my-var1: #1eb980"; this.stepStatus = 'done';
        } else {
          document.querySelector("body").style.cssText = "--my-var1: #d32f2f"; this.stepStatus = 'schedule';
        }
      } else {
        document.querySelector("body").style.cssText = "--my-var1: #b3b3b3"; this.stepStatus = 'block';
      }
    });
    /*this.cdRef.detectChanges();*/
  }

  backToServices(){
    this.showDetailsStatus = false;
  }
}
