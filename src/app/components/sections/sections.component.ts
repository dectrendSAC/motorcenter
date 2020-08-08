import { Component, OnInit, HostListener } from '@angular/core';
import { multipleAnimations } from '../../animations';
import { RouterExtService } from 'src/app/services/previous-url.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  animations: [
    multipleAnimations.fadeTwoTrigger,
    multipleAnimations.fadeThreeTrigger,
    multipleAnimations.slideThreeTrigger
  ]
})
export class SectionsComponent implements OnInit {
  displayToolbar:boolean;
  displaySideScroll:boolean;
  displaySections:boolean;
  displayLogin:boolean = false;
  displayMore:boolean = false;
  displaySuccess:boolean = false;
  showProfileStatus:boolean = false;
  showRegisterStatusForVehicles:boolean = false;
  showRegisterStatusForWorkshop:boolean = false;
  changeTopLinksClassStatus:boolean = false;
  changeLoginClassStatus:boolean = false;
  noRegisteredClient: boolean;
  changeSuccessContent:boolean;
  activePane: string = 'vehiclesView';
  wheelDirection: string = '';
  awaitAnimationOnScroll: boolean;
  time:number;
  previousUrl: string;

  constructor(private routerExtService: RouterExtService) { }

  ngOnInit(): void {
    this.previousUrl = this.routerExtService.getPreviousUrl();
    //Animation sequence
    if(this.previousUrl = '/'){
      setTimeout(() => { this.displaySections = true }, 100);
      setTimeout(() => { this.displayToolbar = true }, 1600);
      setTimeout(() => { this.displaySideScroll = true }, 1600);
    }
  }

  //Login methods
  showLogin($event){
    var noLoginExists = document.getElementById("noLogin");
    if ($event.extra == "workshop"){
      this.changeSuccessContent = true;
    } else {
      this.changeSuccessContent = false;
    }
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
    if(document.getElementById('vehicles')){
      this.showRegisterStatusForVehicles = status;
    }
    if(document.getElementById('workshop')){
      this.showRegisterStatusForWorkshop = status;
    }
  }

  hideRegister(status:boolean){
    if(document.getElementById('vehicles')){
      this.showRegisterStatusForVehicles = status;
    }
    if(document.getElementById('workshop')){
      this.showRegisterStatusForWorkshop = status;
    }
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

  //Slide panels methods
  changeActivePane(status:string){
    this.activePane = status;
    if(status == 'vehiclesView'){
      this.showRegisterStatusForWorkshop = false;
      this.changeLoginClassStatus = false;
    } else {
      this.showRegisterStatusForVehicles = false;
      this.changeTopLinksClassStatus = false;
      this.changeLoginClassStatus = true;
    }
  }

  awaitAnimation(status:boolean){
    this.awaitAnimationOnScroll = status;
    setTimeout(() => { this.awaitAnimationOnScroll = !status }, 500);
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(evento: WheelEvent) {
    setTimeout(() => { this.wheelDirection = ''; },1500);

    if (document.getElementById('vehicles')) { this.time = 3100 }
    if (document.getElementById('parts')) { this.time = 800 }
    if (document.getElementById('workshop')) { this.time = 2500 }

    var children = document.getElementsByClassName('children');
    var parent = document.getElementsByClassName('appChild')[0].parentNode;

    for(var i = 0; i < children.length;i++)
    {
      if(children[i] == parent)
      {
        var previous = children[i - 1];
        var next = children[i + 1];
      }
    }

    if (evento.deltaY > 0 && next) {
      if(this.wheelDirection !== 'down'){
        this.awaitAnimationOnScroll = true;
        setTimeout(() => {
          this.activePane = next.id;
          next.scrollIntoView({ behavior: "smooth" });
        }, this.time);
        setTimeout(() => { this.awaitAnimationOnScroll = false }, 500);
        this.wheelDirection = 'down';
      }
    }

    if (evento.deltaY < 0 && previous) {
      if(this.wheelDirection !== 'up'){
        this.awaitAnimationOnScroll = true;
        setTimeout(() => {
          this.activePane = previous.id;
          previous.scrollIntoView({ behavior: "smooth" });
        }, this.time);
        setTimeout(() => { this.awaitAnimationOnScroll = false }, 500);
        this.wheelDirection = 'up';
      }
    }

    if(this.activePane == 'vehiclesView'){
      this.showRegisterStatusForWorkshop = false;
      this.changeLoginClassStatus = false;
    } else {
      this.showRegisterStatusForVehicles = false;
      this.changeTopLinksClassStatus = false;
      this.changeLoginClassStatus = true;
    }
  }
}
