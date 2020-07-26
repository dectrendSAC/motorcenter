import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() disableFilter: boolean;
  @Input() displayProfile: boolean;

  @Output() displayLoginFromToolbar = new EventEmitter<{status: boolean, extra: string}>();

  constructor() { }

  ngOnInit(): void {
  }

  //Login component
  showLogin(){
    var nologin = document.getElementById("noLogin");
    if(nologin){
      this.displayLoginFromToolbar.emit({status: true, extra: 'toolbar'});
    }
  }

  //LogOut
  logOut(){
    this.displayLoginFromToolbar.emit({status: false, extra: 'toolbar'});
  }
}
