import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayOnListVisible:boolean = true;

  @Input() displayRegisterFromSection: boolean;

  @Output() verifyClientFromVehicle = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegisterFromVehicle = new EventEmitter<boolean>();
  @Output() displayMoreFromVehicle = new EventEmitter<boolean>();
  @Output() showSuccessFromVehicle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
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
