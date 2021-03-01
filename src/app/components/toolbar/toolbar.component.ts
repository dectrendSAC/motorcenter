import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
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
  itemIcon: string;
  itemName: string;
  time: number = 0;
  profileState: boolean;
  profileContent: string;
  callLoginForm: boolean = false;

  @Input() changeTopLinksClass: boolean;
  @Input() changeLoginClass: boolean;
  @Input() displayProfile: { display: boolean; profile: string; rol: string };
  @Input() changeItemDescriptionStatus: boolean;

  @Output() displayLoginFromToolbar = new EventEmitter<{status: boolean, extra: string}>();
  @Output() changeItemDescription = new EventEmitter<boolean>();
  @Output() awaitAnimation = new EventEmitter<boolean>();
  @Output() slideStatus = new EventEmitter<string>();
  @Output() homeBtn = new EventEmitter<boolean>();

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(document.getElementById('mainScreen')){
      this.callLoginForm = true;
      if (this.displayProfile == undefined){
        this.profileState = false;
        this.profileContent = '';
      } else {
        this.profileState = this.displayProfile.display;
        this.profileContent = this.displayProfile.profile;
      }

      if (this.router.url.indexOf('/concesionario') > -1) {
        this.displayForMainScreen = false;
      } else {
        this.displayForMainScreen = true;
      }
    } else {
      this.displayForMainScreen = false;

      if(document.getElementById('clientScreen') || document.getElementById('employeeScreen')){
        this.profileState = true;

        if(document.getElementById('employeeScreen')){
          this.profileContent = 'employee';
        } else {
          this.profileContent = 'client';
        }
        this.displayForUserScreen = true;

        setTimeout(() => {
          const item = document.getElementsByClassName('item')
          for(var i = 0 ; i < item.length ; i++){
            if(item[i].classList.contains('clicked')){
              this.itemIcon = item[i].firstChild.childNodes[0].textContent;
              this.itemName = item[i].firstChild.childNodes[1].textContent;
            }
          }
        }, 100);

      } else {
        this.displayForUserScreen = false;
      }
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
        if (this.displayProfile == undefined){
          this.router.navigate([url]);
        } else {
          this.router.navigate([url], {state: {rol: this.displayProfile.rol}});
        }
      }, this.time);
    }
  }

  //Login component
  showLogin(){
    var nologin = document.getElementById("noLogin");
    if(nologin){
      this.displayLoginFromToolbar.emit({status: true, extra: 'toolbar'});
      this.callLoginForm = true;
    }
  }

  //Menu methods
  openMenu(){
    if (this.menuTrigger != null){
      this.menuTrigger.openMenu();
    }
  }

  logOut(){
    if(document.getElementById('clientScreen')){
      this.homeBtn.emit(true);
    } else {
      this.displayLoginFromToolbar.emit({status: false, extra: 'toolbar'});
    }
  }

  //Change active item button
  toggleClass(itemString:string) {
    if(document.getElementById('clientScreen')){
      const item = document.getElementsByClassName('item');

      for(var i = 0 ; i < item.length ; i++){
        item[i].classList.remove('clicked');
        let itemText = item[i].childNodes[0].childNodes[1].textContent;
        let itemNormalized = itemText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
        if(itemNormalized.indexOf(itemString) !== -1){
          item[i].classList.add('clicked');
        }
      }
      this.changeItemDescription.emit(true);
    }
  }

  //Main methods
  goToMain(){
    this.homeBtn.emit(true);
  }

  //Client methods
  ngOnChanges(changes: SimpleChanges) {
    if(this.callLoginForm && this.displayProfile.profile != ''){
      this.profileState = this.displayProfile.display;
      if(this.displayProfile.rol == ''){
        this.profileContent = 'client';
      } else {
        this.profileContent = this.displayProfile.rol;
      }
    } else {
      if(document.getElementById('mainScreen')){
        this.profileState = false;
        this.profileContent = '';
      }
    }

    if(document.getElementById('clientScreen') || document.getElementById('employeeScreen')){
      if(changes.changeItemDescriptionStatus != undefined && changes.changeItemDescriptionStatus.currentValue){
        const item = document.getElementsByClassName('item')
          for(var i = 0 ; i < item.length ; i++){
            if(item[i].classList.contains('clicked')){
              this.itemIcon = item[i].firstChild.childNodes[0].textContent;
              this.itemName = item[i].firstChild.childNodes[1].textContent;
            }
          }
      }
    }
  }

  //Change profile image and save
  changeProfilePic(){
    if(this.displayForUserScreen){
      document.querySelector('input').click()
      this.menuTrigger.closeMenu();
    }
  }

  onSelectFile($event){
    console.log('cambiar');
  }
}
