import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
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
