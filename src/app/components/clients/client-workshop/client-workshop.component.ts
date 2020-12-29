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
  vehicleWorkshopIndex: number;
  detailsIndex: number;
  selectedStep: number;
  stepStatus = [];

  clientVehiclesWorkshop = [
    {service: 'Escaneo', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z', details:[{step: 1, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 2, content:'', date:'2020-02-12T12:47:55Z', status:false}]},
    {service: 'Planchado y pintura', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-12-12T12:47:55Z', details:[{step: 1, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 2, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 3, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 4, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 5, content:'', date:'2020-02-12T12:47:55Z', status:true}]},
    {service: 'Reparación', vehicle: 'Ford Ranger 2018', lastUpdate: '2020-02-12T12:47:55Z', details:[{step: 1, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 2, content:'', date:'2020-02-12T12:47:55Z', status:true}, {step: 3, content:'', date:'2020-02-12T12:47:55Z', status:false}]}
  ];

  servicesSteps = [
    {service: 'Escaneo', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Proceso de escaneo', content:'Se procede a escanear el vehículo'}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.'}]},
    {service: 'Mantenimiento', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Proceso de escaneo', content:'Se procede a escanear el vehículo'}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.'}]},
    {service: 'Reparación', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Proceso de escaneo', content:'Se procede a escanear el vehículo'}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.'}]},
    {service: 'Planchado y pintura', steps: 5, stepsDetails: [{title: 'Ingreso', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Proceso de escaneo', content:'Se procede a escanear el vehículo'}, {title: 'Escaneo finalizado', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Corrección de códigos de falla', content:'Estado de la carrocería e inventario de objetos personales.'}, {title: 'Listo para recojo', content:'Estado de la carrocería e inventario de objetos personales.'}]}
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
    this.stepStatus = [];
    this.vehicleWorkshopIndex = i;

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
    this.selectedStep = this.clientVehiclesWorkshop[i].details.length;

    //Verify step status
    const steps = [...Array(this.servicesSteps[this.detailsIndex].steps).keys()]
    steps.forEach(index => {
      if (this.clientVehiclesWorkshop[i].details[index]){
        if(this.clientVehiclesWorkshop[i].details[index].status){
          document.querySelector("body").style.cssText = "--my-var1: #1eb980";
          this.stepStatus.push('done');
        } else {
          document.querySelector("body").style.cssText = "--my-var1: #d32f2f"; this.stepStatus.push('schedule');
        }
      } else {
        document.querySelector("body").style.cssText = "--my-var1: #b3b3b3"; this.stepStatus.push('block');
      }
    });
    console.log(this.stepStatus);
    /*this.cdRef.detectChanges();*/
  }

  backToServices(){
    this.showDetailsStatus = false;
  }
}
