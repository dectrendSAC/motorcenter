import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1.5s ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('1s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('slideUpDown', [ 
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.7s ease-in-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({}),
        animate('.5s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class VehiclesComponent implements OnInit {
  displayTop:boolean;
  displayFilter:boolean;
  displayStack:boolean;
  displayCar: boolean;
  displayCarShadow: boolean;
  displayTitle: boolean;
  displayList: boolean;

  @Input() displayRegisterFromSection: boolean;
  @Input() awaitAnimation: boolean;

  @Output() verifyClientFromVehicle = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegisterFromVehicle = new EventEmitter<boolean>();
  @Output() displayMoreFromVehicle = new EventEmitter<boolean>();
  @Output() showSuccessFromVehicle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    //Animation sequence
    this.displayTop = true;
    this.displayFilter = true;
    setTimeout(() => { this.displayStack = true }, 1700);
    setTimeout(() => { this.displayCar = true }, 2750);
    setTimeout(() => { this.displayCarShadow = true }, 3000);
    setTimeout(() => { this.displayTitle = true }, 2800);
    setTimeout(() => { this.displayList = true }, 3200);
  }

  //Await animation sequence
  ngOnChanges(changes: SimpleChanges) {
      if(changes.awaitAnimation.currentValue){
        this.displayList = false;
        setTimeout(() => { this.displayTitle = false }, 500);
        setTimeout(() => { this.displayStack = false }, 900);
        setTimeout(() => { this.displayFilter = false }, 1900);
        setTimeout(() => { this.displayTop = false }, 2900);
      }
  }

  //More component
  showMore(status:boolean) {
    this.displayMoreFromVehicle.emit(status);
  }

  //Check if client is registered
  isClientRegistered(status:boolean){
    this.verifyClientFromVehicle.emit({status: status, extra: 'vehicles'});
  }

  //Show list component
  showList(status:boolean){
    this.hideRegisterFromVehicle.emit(!status);
  }

}
