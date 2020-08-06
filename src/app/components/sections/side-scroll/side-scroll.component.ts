import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-side-scroll',
  templateUrl: './side-scroll.component.html',
  styleUrls: ['./side-scroll.component.scss']
})
export class SideScrollComponent implements OnInit {
  time:number;

  @Input() activeSection: string;

  @Output() awaitAnimation = new EventEmitter<boolean>();
  @Output() slideStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  slide(element:any){
    this.awaitAnimation.emit(true);
    if (document.getElementById('vehicles')) { this.time = 3100 }
    if (document.getElementById('parts')) { this.time = 800 }
    if (document.getElementById('workshop')) { this.time = 2500 }
    setTimeout(() => {
      this.slideStatus.emit(element);
      document.getElementById(element).scrollIntoView({ behavior: "smooth", block: "start" });
    }, this.time);
  }

}
