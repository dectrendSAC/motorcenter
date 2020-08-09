import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { multipleAnimations } from '../../../animations';
import { DataService } from "src/app/services/pass-data.service";
import { RouterExtService } from 'src/app/services/previous-url.service';
import { Router } from '@angular/router';

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
  displayRegisterFromSection: boolean;

  @Input() awaitAnimation: boolean;
  @Input() goToMain:boolean;

  @Output() verifyClient = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegister = new EventEmitter<boolean>();
  @Output() displayMoreFromVehicle = new EventEmitter<boolean>();
  @Output() showSuccessFromVehicle = new EventEmitter<boolean>();

  constructor(private routerExtService: RouterExtService, private data: DataService, private router: Router) { 
    this.data.currentData.subscribe(data => this.displayRegisterFromSection = data)
    console.log(this.displayRegisterFromSection)
  }

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
        if(changes.goToMain){
          if(changes.goToMain.currentValue){
            setTimeout(() => { this.router.navigateByUrl('/'); }, 2800);
          }
        } else {
          setTimeout(() => { this.displayTop = false }, 2900);
        }
      }
  }

  //More component
  showMore(status:boolean) {
    this.displayMoreFromVehicle.emit(status);
  }

  //Check if client is registered
  isClientRegistered(status:boolean){
    this.verifyClient.emit({status: status, extra: 'vehicles'});
  }

  //Show list component
  showList(status:boolean){
    this.hideRegister.emit(!status);
  }

}
