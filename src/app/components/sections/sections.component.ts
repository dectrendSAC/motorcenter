import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  displayLogin:boolean = false;
  displayMore:boolean = false;
  showProfileStatus:boolean = false;
  showRegisterStatus:boolean = false;
  changeToolbarClassStatus:boolean = false;
  noRegisteredClient: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  //Login functions
  showLogin($event){
    this.displayLogin = $event.status;
    this.showProfileStatus = false;
    if($event.extra == "vehicles"){
      this.noRegisteredClient = $event.status;
    }
  }

  showProfile(status:boolean){
    this.showProfileStatus = status;
  }

  hideLogin(status:boolean) {
    this.displayLogin = status;
  }

  //Vehicles functions
  showRegister(status:boolean){
    this.showRegisterStatus = status;
  }

  hideRegister(status:boolean){
    this.showRegisterStatus = status;
    this.changeToolbarClassStatus = status;
  }

  //Toolbar functions
  changeToolbarClass(status:boolean){
    this.changeToolbarClassStatus = status;
  }

  //More functions
  showMore(status:boolean){
    this.displayMore = status;
  }
}
