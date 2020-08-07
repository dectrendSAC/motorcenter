import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { multipleAnimations } from '../../../animations';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
  animations: [
    multipleAnimations.fadeOneTrigger
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
