import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { multipleAnimations } from '../../../animations';
import { RouterExtService } from 'src/app/services/previous-url.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  animations: [
    multipleAnimations.slideOneTrigger,
    multipleAnimations.slideTwoTrigger,
    multipleAnimations.fadeOneTrigger
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
  previousUrl: string;

  @Input() displayRegisterFromSection: boolean;
  @Input() awaitAnimation: boolean;

  @Output() verifyClientFromVehicle = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegisterFromVehicle = new EventEmitter<boolean>();
  @Output() displayMoreFromVehicle = new EventEmitter<boolean>();
  @Output() showSuccessFromVehicle = new EventEmitter<boolean>();

  constructor(private routerExtService: RouterExtService) { }

  ngOnInit(): void {
    this.previousUrl = this.routerExtService.getPreviousUrl();
    //Animation sequence
    this.displayTop = true;
    if(this.previousUrl = '/'){
      setTimeout(() => { this.displayFilter = true }, 100);
    } else {
      this.displayFilter = true;
    }
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
