import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  displayLogin:boolean = false;
  displayMore:boolean = false;
  displaySuccess:boolean = false;
  showProfileStatus:boolean = false;
  showRegisterStatus:boolean = false;
  changeTopLinksClassStatus:boolean = false;
  changeLoginClassStatus:boolean = false;
  noRegisteredClient: boolean;
  changeSuccessContent:boolean;
  activePane: string = 'vehiclesView';
  wheelDirection: string = '';

  constructor() { }

  ngOnInit(): void {
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
    this.showRegisterStatus = status;
  }

  hideRegister(status:boolean){
    this.showRegisterStatus = status;
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
      this.changeLoginClassStatus = false;
    } else {
      this.changeLoginClassStatus = true;
    }
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(evento: WheelEvent) {
    setTimeout(() => { this.wheelDirection = ''; },1500);

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
        this.activePane = next.id;
        next.scrollIntoView({ behavior: "smooth" });
        this.wheelDirection = 'down';
      }
    }

    if (evento.deltaY < 0 && previous) {
      if(this.wheelDirection !== 'up'){
        this.activePane = previous.id;
        previous.scrollIntoView({ behavior: "smooth" });
        this.wheelDirection = 'up';
      }
    }

    if(this.activePane == 'vehiclesView'){
      this.changeLoginClassStatus = false;
    } else {
      this.changeLoginClassStatus = true;
    }
  }
}
