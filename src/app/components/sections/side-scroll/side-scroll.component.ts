import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

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
 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(element:string, url:string){
    if (this.router.url.indexOf(url) < 0) {
      this.awaitAnimation.emit(true);
      if (document.getElementById('vehicles')) { this.time = 2500 }
      if (document.getElementById('parts')) { this.time = 1000 }
      if (document.getElementById('workshop')) { this.time = 1000 }
      setTimeout(() => {
        this.slideStatus.emit(element);
        this.router.navigateByUrl(url);
      }, this.time);
    }
  }

}
