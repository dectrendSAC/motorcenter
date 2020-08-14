import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  displayForMainScreen: boolean;
  displayForUserScreen: boolean;
  time:number = 0;

  @Input() changeTopLinksClass: boolean;
  @Input() changeLoginClass: boolean;
  @Input() displayProfile: boolean;

  @Output() displayLoginFromToolbar = new EventEmitter<{status: boolean, extra: string}>();
  @Output() awaitAnimation = new EventEmitter<boolean>();
  @Output() slideStatus = new EventEmitter<string>();
  @Output() homeBtn = new EventEmitter<boolean>();

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(document.getElementById('mainScreen')){
      this.displayForMainScreen = true;
    } else {
      this.displayForMainScreen = false;
    }

    if(document.getElementById('clientScreen')){
      this.displayProfile = true;
      this.displayForUserScreen = true;
    } else {
      this.displayForUserScreen = false;
    }
  }

  navigateTo(element:string, url:string){
    if (this.router.url.indexOf(url.replace('..','')) < 0) {
      this.awaitAnimation.emit(true);
      if (document.getElementById('vehicles')) { this.time = 2500 }
      if (document.getElementById('parts')) { this.time = 1000 }
      if (document.getElementById('workshop')) { this.time = 1000 }
      setTimeout(() => {
        this.slideStatus.emit(element);
        this.router.navigate([url]);
      }, this.time);
    }
  }

  //Login component
  showLogin(){
    var nologin = document.getElementById("noLogin");
    if(nologin){
      this.displayLoginFromToolbar.emit({status: true, extra: 'toolbar'});
    }
  }

  //Menu methods
  openMenu(){
    this.menuTrigger.openMenu();
  }

  logOut(){
    this.displayLoginFromToolbar.emit({status: false, extra: 'toolbar'});
  }

  //Main methods
  goToMain(){
    this.homeBtn.emit(true);
  }
}
