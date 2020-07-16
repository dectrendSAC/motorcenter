import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  @Output()
  displayLogin = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  //Hide Login component
  hideLogin(){
    this.displayLogin.emit(false);
  }
  
}
