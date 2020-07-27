import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {

  @Output() displayMore = new EventEmitter<boolean>();
  @Output() verifyClientFromMore = new EventEmitter<{status: boolean, extra: string}>();

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
    this.verifyClientFromMore.emit({status: true, extra: 'vehicles'});
  }
  
}
