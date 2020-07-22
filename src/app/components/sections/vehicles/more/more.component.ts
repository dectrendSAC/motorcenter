import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  @Output() displayMore = new EventEmitter<boolean>();
  @Output() verifyClient = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  //Hide More component
  hideMore(){   
    this.displayMore.emit(false);
  }

  //Check if is a registered client
  isRegistered(){
    this.displayMore.emit(false);
    this.verifyClient.emit(true);
  }
  
}
