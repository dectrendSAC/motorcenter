import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  displayUserName: boolean;
  time:number = 0;

  @Input() changeTopLinksClass: boolean;
  @Input() changeLoginClass: boolean;
  @Input() displayProfile: boolean;

  @Output() displayLoginFromToolbar = new EventEmitter<{status: boolean, extra: string}>();
  @Output() awaitAnimation = new EventEmitter<boolean>();
  @Output() slideStatus = new EventEmitter<string>();
  @Output() homeBtn = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(document.getElementById('mainScreen')){
      this.displayUserName = true;
    } else {
      this.displayUserName = false;
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

  //LogOut
  logOut(){
    this.displayLoginFromToolbar.emit({status: false, extra: 'toolbar'});
  }

  //Main methods
  goToMain(){
    this.homeBtn.emit(true);
  }
}
