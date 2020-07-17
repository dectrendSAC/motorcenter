import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayLogin:boolean=false;
  displayList:boolean=true;
  displayRegister:boolean = false;
  displayMore:boolean=false;
  displaySuccess:boolean=false;
  noRegisteredClient:boolean;


  constructor() { }

  ngOnInit(): void {
  }

  //Login component
  showLogin(){
    this.noRegisteredClient = false;
    this.displayLogin = true;
  }

  hideLogin(status:boolean) {
    this.displayLogin = status;
  }

  //More component
  showMore(status:boolean) {
    this.displayMore = status;
  }

  //Check if client is registered
  isClientRegistered(status:boolean){
    var login = document.getElementById("noLogin");
    if(login){      
      this.displayLogin = status;
      this.noRegisteredClient = true;
    } else {
      this.displaySuccess = status;
    }
  }

  //Show register form
  showRegister(status:boolean){
    this.displayList = !status;
    this.displayRegister = status;
  }

}
