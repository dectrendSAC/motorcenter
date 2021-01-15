import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { multipleAnimations } from 'src/app/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    multipleAnimations.fadeOneTrigger
  ]
})
export class SidebarComponent implements OnInit {
  displaySidebar: boolean;
  displaySidebarState: boolean = false;
  currentUrl: string;
  clickedCount: boolean = true;
  clickedItem: boolean;
  time:number = 0;

  @Output() changeItemDescription = new EventEmitter<boolean>();
  @Output() homeBtn = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.clickedItem = true;
    this.displaySidebar = false;

    this.currentUrl = this.router.url;
    console.log(/[^/]*$/.exec(this.currentUrl)[0]);
  }

  //Change active item button
  toggleClass(e) {
    const item = document.getElementsByClassName('item')
    const classList = e.currentTarget.classList;
    for(var i = 0 ; i < item.length ; i++){
      item[i].classList.remove('clicked');
    }
    classList.add('clicked');
    this.changeItemDescription.emit(true);
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
