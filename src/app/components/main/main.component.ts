import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { multipleAnimations } from '../../animations';
import { Router } from '@angular/router';
import { RouterExtService } from 'src/app/services/previous-url.service';

//JS functions
declare function randomWord(): any;

var ranWordInterval = null;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    multipleAnimations.slideOneTrigger,
    multipleAnimations.slideTwoTrigger,
    multipleAnimations.slideThreeTrigger,
    multipleAnimations.fadeOneTrigger,
    multipleAnimations.fadeTwoTrigger,
    multipleAnimations.bounceTrigger
  ]
})
export class MainComponent implements OnInit {
  phrase: string;
  displayLogin:boolean=false;
  displayLogo:boolean;
  displayBtns:boolean;
  displayTerrain:string;
  displayRoad:string;
  displayLines:boolean;
  displayVehicles: boolean;
  displayPhrase: boolean;
  displaySignIn:boolean;
  showProfileStatus:boolean;
  noRegisteredClient:boolean;
  triggerVehiclesEvent:boolean;
  previousUrl: string;

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  constructor(private routerExtService: RouterExtService, private router: Router) { }

  ngOnInit(): void {
    //Random word js function
    clearInterval(ranWordInterval);
    ranWordInterval = setInterval(()=>{
      this.phrase = randomWord();
    }, 300);

    //Check if comes from login url
    this.previousUrl = this.routerExtService.getPreviousUrl();

    if(history.state.navigationId > 1){
      clearInterval(ranWordInterval);
      ranWordInterval = setInterval(()=>{
        this.phrase = randomWord();
      }, 300);
      if(this.previousUrl != undefined){
        setTimeout(() => {
          var noLoginExists = document.getElementById("noLogin");
          if(noLoginExists){
            this.displayLogin = true;
          }
        }, 1500);
      }
      this.displayBtns = true;
      this.displaySignIn = true;
      this.displayTerrain = 'fadeIn';
      this.displayRoad = 'fadeIn';
      this.displayLines = true;
      this.displayLogo = true;
      this.displayPhrase= true;
      this.displayVehicles = true;
    } else {
      //Animation sequence
      if(this.previousUrl != undefined && this.previousUrl.includes('/concesionario')){
        this.triggerVehiclesEvent = false;
        setTimeout(() => { this.displayTerrain = 'fall' }, 500);
        setTimeout(() => { this.displayTerrain = 'bounce' }, 1000);
        setTimeout(() => { this.displayBtns = true }, 2900);
        setTimeout(() => { this.displaySignIn = true }, 3600);
      } else {
        this.displayTerrain = 'fall';
        setTimeout(() => { this.displayTerrain = 'bounce' }, 500);
        setTimeout(() => { this.triggerVehiclesEvent = true }, 4100);
        setTimeout(() => { this.router.navigateByUrl('/concesionario/vehiculos'); }, 5000);
      }
      setTimeout(() => { this.displayRoad = 'fall' }, 1200);
      setTimeout(() => { this.displayRoad = 'bounce' }, 1900);
      setTimeout(() => { this.displayLines = true }, 2900);
      setTimeout(() => { this.displayLogo = true }, 2900);
      setTimeout(() => { this.displayPhrase= true }, 3400);
      setTimeout(() => { this.displayVehicles = true }, 3400);
    }
  }

  //Toggle video function
  playVideo() {
    clearInterval(ranWordInterval);
    const video: HTMLVideoElement = this.videoplayer.nativeElement;
    video.muted = true;
    video.play();
  }

  pauseVideo(){
    clearInterval(ranWordInterval);
    ranWordInterval = setInterval(()=>{
      this.phrase = randomWord();
    }, 300);
    const video: HTMLVideoElement = this.videoplayer.nativeElement;
    video.pause();
  }

  //Login methods
  showLogin($event){
    var noLoginExists = document.getElementById("noLogin");
    if(noLoginExists){
      this.displayLogin = $event.status;
      this.showProfileStatus = !$event.status;
      this.noRegisteredClient = !$event.status;
    } else {
      this.showProfileStatus = $event.status;
    }
  }

  showProfile(status:boolean){
    this.showProfileStatus = status;
  }

  hideLogin(status:boolean) {
    clearInterval(ranWordInterval);
    ranWordInterval = setInterval(()=>{
      this.phrase = randomWord();
    }, 300);
    this.displayLogin = status;
  }
}
