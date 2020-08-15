import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  clickedItem: boolean;

  @Output() changeItemDescription = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.clickedItem = true;
  }

  toggleClass(e) {
    const item = document.getElementsByClassName('item')
    const classList = e.currentTarget.classList;
    for(var i = 0 ; i < item.length ; i++){
      item[i].classList.remove('clicked') 
    }
    classList.add('clicked');
    this.changeItemDescription.emit(true); 
  }

}
