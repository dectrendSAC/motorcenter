import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  displayLogin:boolean = false;
  displayMore:boolean = false;
  displaySuccess:boolean = false;
  showProfileStatus:boolean = false;
  showRegisterStatus:boolean = false;
  changeToolbarClassStatus:boolean = false;
  noRegisteredClient: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  //Login methods
  showLogin($event){
    var noLoginExists = document.getElementById("noLogin");
    if(noLoginExists){
      this.displayLogin = $event.status;
      this.showProfileStatus = !$event.status;
      if($event.extra == "vehicles"){
        this.noRegisteredClient = $event.status;
      } else {
        this.noRegisteredClient = !$event.status;
      }
    } else {
      this.showProfileStatus = $event.status;
      this.displaySuccess = $event.status;
    }
  }

  showProfile(status:boolean){
    this.showProfileStatus = status;
  }

  hideLogin(status:boolean) {
    this.displayLogin = status;
  }

  //Vehicles methods
  showRegister(status:boolean){
    this.showRegisterStatus = status;
  }

  hideRegister(status:boolean){
    this.showRegisterStatus = status;
    this.changeToolbarClassStatus = status;
  }

  //Toolbar methods
  changeToolbarClass(status:boolean){
    this.changeToolbarClassStatus = status;
  }

  //More methods
  showMore(status:boolean){
    this.displayMore = status;
  }

  //Success methods
  hideSuccess(status:boolean){
    this.displaySuccess = status;
  }

}
