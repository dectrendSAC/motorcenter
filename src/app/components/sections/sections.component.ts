import { Component, OnInit, HostListener } from '@angular/core';
import { multipleAnimations } from '../../animations';
import { RouterExtService } from 'src/app/services/previous-url.service';
import { DataService } from "src/app/services/pass-data.service";
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
  animations: [
    multipleAnimations.routeTrigger,
    multipleAnimations.fadeTwoTrigger,
    multipleAnimations.fadeThreeTrigger,
    multipleAnimations.slideThreeTrigger,
    multipleAnimations.slideTwoTrigger
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
  changeTopLinksClassStatus:boolean = false;
  changeLoginClassStatus:boolean = false;
  noRegisteredClient: boolean;
  changeSuccessContent:boolean;
  activePane: string;
  wheelDirection: string = '';
  time:number;
  prevPane: string;
  prevUrl: string;
  nextPane: string;
  nextUrl: string;
  previousUrl: string;

  constructor(private routerExtService: RouterExtService, private data: DataService, private router: Router) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngOnInit(): void {
    this.previousUrl = this.routerExtService.getPreviousUrl();
    //Animation sequence
    if(this.previousUrl = '/'){
      setTimeout(() => { this.displayToolbar = true }, 1600);
      setTimeout(() => { this.displaySideScroll = true }, 1600);
    }

    //Check active panel
    if (document.getElementById('vehicles')) { this.activePane = 'vehiclesView'; }
    if (document.getElementById('parts')) { this.activePane = 'partsView'; }
    if (document.getElementById('workshop')) { this.activePane = 'workshopView'; }
  }

  //Main methods
  goToMain(status:boolean){
    this.data.goToMainStatus(status);
    this.data.awaitAnimationOnScroll(status);
    setTimeout(() => { this.displayToolbar = false }, 1700);
    setTimeout(() => { this.displaySideScroll = false }, 1700);
    setTimeout(() => { this.displaySections = false }, 2600);
    setTimeout(() => { this.data.goToMainStatus(false); this.data.awaitAnimationOnScroll(false); }, 500);
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

  //Section methods
  onActivate(elementRef:any) {
    //Login methods
    if(elementRef.verifyClient){
      elementRef.verifyClient.subscribe($event => {
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
      });
    }

    //Vehicles methods
    if(elementRef.hideRegister){
      elementRef.hideRegister.subscribe((status:boolean) => {
        this.data.showRegisterStatus(status);
  
        if(document.getElementById('vehicles')){
          this.changeTopLinksClassStatus = status;
        }
      });
    }

    //More methods
    if(elementRef.displayMoreFromVehicle){
      elementRef.displayMoreFromVehicle.subscribe((status:boolean) => {
        this.displayMore = status;
      });
    }
  }

  //Vehicles methods
  showRegister(status:boolean){
    this.data.showRegisterStatus(status);
  }

  hideRegister(status:boolean){
    this.data.showRegisterStatus(status);

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
    this.data.showRegisterStatus(false);
    if(status == 'vehiclesView'){
      this.changeLoginClassStatus = false;
    } else {
      this.changeTopLinksClassStatus = false;
      this.changeLoginClassStatus = true;
    }
  }

  awaitAnimation(status:boolean){
    this.data.awaitAnimationOnScroll(status);
    setTimeout(() => { this.data.awaitAnimationOnScroll(!status); }, 500);
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(evento: WheelEvent) {
    setTimeout(() => { this.wheelDirection = ''; },1500);

    this.data.showRegisterStatus(false);

    if (document.getElementById('vehicles')) { this.prevPane = 'workshopView'; this.prevUrl = '/concesionario/taller'; this.nextPane='partsView'; this.nextUrl='/concesionario/repuestos'; this.time = 3100 }
    if (document.getElementById('parts')) { this.prevPane = 'vehiclesView'; this.prevUrl = '/concesionario/vehiculos'; this.nextPane='workshopView'; this.nextUrl='/concesionario/taller'; this.time = 800 }
    if (document.getElementById('workshop')) { this.prevPane = 'partsView'; this.prevUrl = '/concesionario/repuestos'; this.nextPane='vehiclesView'; this.nextUrl='/concesionario/vehiculos'; this.time = 2500 }

    if (evento.deltaY > 0) {
      if(this.wheelDirection !== 'down'){
        this.data.awaitAnimationOnScroll(true);
        setTimeout(() => {
          this.activePane = this.nextPane;
          this.router.navigateByUrl(this.nextUrl);
        }, this.time);
        setTimeout(() => { this.data.awaitAnimationOnScroll(false); }, 500);
        this.wheelDirection = 'down';
      }
    }

    if (evento.deltaY < 0) {
      if(this.wheelDirection !== 'up'){
        this.data.awaitAnimationOnScroll(true);
        setTimeout(() => {
          this.activePane = this.prevPane;
          this.router.navigateByUrl(this.prevUrl);
        }, this.time);
        setTimeout(() => { this.data.awaitAnimationOnScroll(false); }, 500);
        this.wheelDirection = 'up';
      }
    }

    if(this.activePane == 'vehiclesView'){
      this.changeLoginClassStatus = false;
    } else {
      this.changeTopLinksClassStatus = false;
      this.changeLoginClassStatus = true;
    }
  }
}
