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
  displayProfile:boolean = false;
  displayLogo:boolean;
  displayBtns:boolean;
  displayTerrain:string;
  displayRoad:string;
  displayLines:boolean;
  displayVehicles: boolean;
  displayPhrase: boolean;
  displaySignIn:boolean;
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
    if(history.state.data){  
      clearInterval(ranWordInterval);
      this.phrase = 'RESPONSABLES';
      this.displayLogin = true; 
    }

    this.previousUrl = this.routerExtService.getPreviousUrl();
    //Animation sequence
    this.displayTerrain = 'fall';
    if(this.previousUrl != undefined && this.previousUrl.includes('/concesionario')){
      this.triggerVehiclesEvent = false;
      setTimeout(() => { this.displayBtns = true }, 2900);
      setTimeout(() => { this.displaySignIn = true }, 3600);
    } else {
      setTimeout(() => { this.triggerVehiclesEvent = true }, 4100);
      setTimeout(() => { this.router.navigateByUrl('/concesionario/vehiculos'); }, 5000);
    }
    setTimeout(() => { this.displayTerrain = 'bounce' }, 500);
    setTimeout(() => { this.displayRoad = 'fall' }, 1200);
    setTimeout(() => { this.displayRoad = 'bounce' }, 1900);
    setTimeout(() => { this.displayLines = true }, 2900);
    setTimeout(() => { this.displayLogo = true }, 2900);
    setTimeout(() => { this.displayPhrase= true }, 3400);
    setTimeout(() => { this.displayVehicles = true }, 3400);
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

  //Show login component
  showLogin(){
    var nologin = document.getElementById("noLogin");
    if(nologin){
      this.displayLogin = true;
    }
  }

  hideLogin(status:boolean) {
    clearInterval(ranWordInterval);     
    ranWordInterval = setInterval(()=>{   
      this.phrase = randomWord();
    }, 300);
    this.displayLogin = status;
  }

  //LogOut
  logOut(){
    this.displayProfile = false;
  }

  onOpenMenu(): void {}

  //Show profile
  showProfile(status:boolean){
    this.displayProfile = status;
  }

}
