import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  displayLogin:boolean=false;
  displayProfile:boolean = false;

  @Input() disableFilter: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  //Login component
  showLogin(){
    var nologin = document.getElementById("noLogin");
    if(nologin){
      this.displayLogin = true;
      this.noRegisteredClient = false;
    }
  }

  hideLogin(status:boolean) {
    this.displayLogin = status;
  }

  //LogOut
  logOut(){
    this.displayProfile = false;
  }

  //Show profile
  showProfile(status:boolean){
    this.displayProfile = status;
  }

}
