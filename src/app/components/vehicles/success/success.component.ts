import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  @Output() displaySuccess = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  //Hide More component
  hideMore(){   
    this.displaySuccess.emit(false);
  }

}
