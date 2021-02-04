import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { multipleAnimations } from 'src/app/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    multipleAnimations.fadeOneTrigger,
    multipleAnimations.slideOneTrigger
  ]
})
export class SidebarComponent implements OnInit {
  displaySidebar: boolean;
  displaySidebarState: boolean = false;
  currentUrlText: string;
  clickedCount: boolean = true;
  clickedItem: boolean;
  time:number = 0;
  employeeView: boolean;
  urlByUser: string;

  @Output() changeItemDescription = new EventEmitter<boolean>();
  @Output() homeBtn = new EventEmitter<boolean>();

  @HostBinding('@slideInOut') public sidebar = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.clickedItem = true;
    this.displaySidebar = false;

    this.currentUrlText = /[^/]*$/.exec(this.router.url)[0];

    const item = document.getElementsByClassName('item');
    for(var i = 0 ; i < item.length ; i++){
      item[i].classList.remove('clicked');
      let itemText = item[i].childNodes[0].childNodes[1].textContent;
      let itemNormalized = itemText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
      if(itemNormalized.indexOf(this.currentUrlText) !== -1){
        item[i].classList.add('clicked');
      }
    }

    //Check if employee screen is visible
    if (this.router.url.indexOf('/empleados') > -1) {
      this.employeeView = true;
      this.urlByUser = '../empleados';
    } else {
      this.employeeView = false;
      this.urlByUser = '../clientes';
    }
  }

  //Change active item button
  toggleClass(e) {
    const item = document.getElementsByClassName('item');
    const classList = e.currentTarget.classList;

    if(e.currentTarget.childNodes[0].childNodes[1].textContent.indexOf('Cerrar') !== -1){
      this.homeBtn.emit(true);
    } else {
      for(var i = 0 ; i < item.length ; i++){
        item[i].classList.remove('clicked');
      }
      classList.add('clicked');
      this.changeItemDescription.emit(true);
    }
  }

  //Changesidebar display status
  toggleDisplay(clicked:boolean){
    if(clicked){
      if(!this.displaySidebar){
        if(this.clickedCount){
          setTimeout(() => { this.displaySidebarState = true }, 500);
          document.getElementById('sidebarComponent').classList.add('active');
          this.displaySidebar = true;
        } else {
          this.displaySidebarState = false;
          this.clickedCount = true;
        }
      }
      this.clickedItem = false;
    } else {
      if(this.displaySidebarState){
        if(this.displaySidebar){
          document.getElementById('sidebarComponent').classList.remove('active');
          this.displaySidebar = false;
          this.clickedCount = false;
        } else {
          document.getElementById('sidebarComponent').classList.add('active');
          this.displaySidebar = true;
        }
      }
    }
  }

  //Navigate to client section
  navigateTo(element:string, url:string){
    if (this.router.url.indexOf(url.replace('..','')) < 0) {
      /*this.awaitAnimation.emit(true);*/
      if (document.getElementById('vehicles')) { this.time = 2500 }
      if (document.getElementById('parts')) { this.time = 1000 }
      if (document.getElementById('workshop')) { this.time = 1000 }
      setTimeout(() => {
        /*this.slideStatus.emit(element);*/
        this.router.navigate([url]);
      }, this.time);
    }
  }

  //Main methods
  goToMain(){
    this.homeBtn.emit(true);
  }
}
