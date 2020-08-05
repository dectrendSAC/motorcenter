import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-side-scroll',
  templateUrl: './side-scroll.component.html',
  styleUrls: ['./side-scroll.component.scss']
})
export class SideScrollComponent implements OnInit {

  @Input() activeSection: string;

  @Output() slideStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  slide(element:any){
    this.slideStatus.emit(element);
    document.getElementById(element).scrollIntoView({ behavior: "smooth", block: "start" });
  }

}
