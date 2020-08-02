import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  displayVehicles:boolean = false;
  displayWorkshop:boolean = true;
  displayLogin:boolean = false;
  displayMore:boolean = false;
  displaySuccess:boolean = false;
  showProfileStatus:boolean = false;
  showRegisterStatus:boolean = false;
  changeTopLinksClassStatus:boolean = false;
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
      if($event.extra == "vehicles" || $event.extra == "workshop"){
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
    if(document.getElementById('vehicles')){
      this.changeTopLinksClassStatus = status;
    }
  }

  //Toolbar methods
  changeTopLinksClass(status:boolean){
    if(document.getElementById('vehicles')){
      this.changeTopLinksClassStatus = status;
    }
  }

  //More methods
  showMore(status:boolean){
    this.displayMore = status;
  }

  //Success methods
  toggleSuccess(status:boolean){
    this.displaySuccess = status;
  }

}
