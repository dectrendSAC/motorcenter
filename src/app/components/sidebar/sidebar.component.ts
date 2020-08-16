import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  clickedCount: boolean = true;
  clickedItem: boolean;

  @Output() changeItemDescription = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.clickedItem = true;
    this.displaySidebar = false;
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
}
