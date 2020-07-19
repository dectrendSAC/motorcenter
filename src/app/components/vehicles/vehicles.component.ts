import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displaySearch:boolean=true;
  displayLogin:boolean=false;
  displayList:boolean=true;
  displayRegister:boolean = false;
  displayMore:boolean=false;
  displaySuccess:boolean=false;
  noRegisteredClient:boolean;
  disableFilter:boolean;

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
    this.displaySearch = !status;
    this.displayRegister = status;
  }

  //Show list
  showList(status:boolean){
    this.displayRegister = !status;
    this.displaySearch = status;
    this.displayList = status;
  }

  //Disable filter
  disableFilterMethod(status:boolean){
    this.disableFilter = status;
  }

}
