import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayLogin:boolean=false;
  displayMore:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  //Login component
  showLogin(){
    this.displayLogin = true;
  }

  hideLogin(status:boolean) {
    this.displayLogin = status;
  }

  //More component
  showMore(status:boolean) {
    console.log(status);
    this.displayMore = status;
  }

}
