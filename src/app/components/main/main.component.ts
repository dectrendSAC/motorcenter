import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger, keyframes, state } from '@angular/animations';
import { Router } from '@angular/router';

//JS functions
declare function randomWord(): any;

var ranWordInterval = null;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('1s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('slideUpDown', [ 
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('.3s ease-in-out', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
    trigger('slideDownUp', [ 
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('.3s ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.7s ease-in-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({}),
        animate('.5s ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('fadeOut', [ 
      transition(':leave', [
        style({}),
        animate('.5s ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('bounceIn', [
      state('fall', style({ transform: 'inherit' })),
      transition('* => fall', [
        style({ transform: 'translateY(-100%)' }),
        animate('.7s ease-in-out', style({ transform: 'inherite' }))
      ]),
      state('bounce', style({ transform: 'inherite' })),
      transition('* => bounce', [
        animate('1s', keyframes([
          style({ transform: 'scale(1,1) translateY(0)' }),
          style({ transform: 'scale(1.1, 0.9) translateY(0)' }),
          style({ transform: 'scale(0.9, 1.1) translateY(-100px)' }),
          style({ transform: 'scale(1.05, 0.95) translateY(0)' }),
          style({ transform: 'scale(1,1) translateY(-7px)' }),
          style({ transform: 'scale(1,1) translateY(0)' }),
        ]))
      ]),
    ])
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
  tiggerVehiclesEvent:boolean;

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  constructor(private router: Router) { }

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

    //Animation sequence
    this.displayTerrain = 'fall';
    setTimeout(() => { this.displayTerrain = 'bounce' }, 500);
    setTimeout(() => { this.displayRoad = 'fall' }, 1200);
    setTimeout(() => { this.displayRoad = 'bounce' }, 1900);
    setTimeout(() => { this.displayLines = true }, 2900);
    setTimeout(() => { this.displayLogo = true }, 2900);
    setTimeout(() => { this.displayPhrase= true }, 3400);
    setTimeout(() => { this.displayVehicles = true }, 3400);
    setTimeout(() => { this.tiggerVehiclesEvent = true }, 4100);
    setTimeout(() => { this.router.navigateByUrl('/concesionario'); }, 5000);
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
