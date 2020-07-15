import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayLogin:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  //Show login component
  showLogin(){
    this.displayLogin = true;
  }

  hideLogin(status:boolean) {
    this.displayLogin = status;
  }

}
