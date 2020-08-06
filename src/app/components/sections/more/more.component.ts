import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  animations: [
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.7s .1s ease-in-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({}),
        animate('.5s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
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
