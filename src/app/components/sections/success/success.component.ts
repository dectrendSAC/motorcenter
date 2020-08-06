import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
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
export class SuccessComponent implements OnInit {

  @Input() changeSuccessContent: string;

  @Output() displaySuccess = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  //Hide Success component
  hideSuccess(){   
    this.displaySuccess.emit(false);
  }

}
