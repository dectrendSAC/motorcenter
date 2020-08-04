import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-scroll',
  templateUrl: './side-scroll.component.html',
  styleUrls: ['./side-scroll.component.scss']
})
export class SideScrollComponent implements OnInit {

  @Output() slideStatus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  slide(status:string){
    if(status == 'down'){
      this.slideStatus.emit(true);
    } else {
      this.slideStatus.emit(false);
    }
  }

}
