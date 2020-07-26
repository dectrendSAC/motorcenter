import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  displayLogin:boolean=false;
  showProfileStatus:boolean = false;
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

}
