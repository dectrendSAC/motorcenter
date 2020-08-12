import { Component, OnInit } from '@angular/core';
import { multipleAnimations } from 'src/app/animations';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss'],
  animations: [
    multipleAnimations.scaleTrigger,
    multipleAnimations.fadeOneTrigger
  ]
})
export class UnderConstructionComponent implements OnInit {
  displayText:boolean;
  displayLine1:boolean;
  displayLine2:boolean;
  displayLine3:boolean;
  displayFloor1:boolean;
  displayFloor2:boolean;
  displayFloor3:boolean;
  displayFloor4:boolean;
  displayStation1:boolean;
  displayStation2:boolean;
  displayStation3:boolean;
  displayStation4:boolean;
  station:number = 1;

  constructor() { }

  ngOnInit(): void {
    //Animation sequence
    this.displayFloor1 = true;
    setTimeout(() => { this.displayStation1 = true; }, 500);
    setTimeout(() => { this.displayFloor2 = true; }, 700);
    setTimeout(() => { this.displayLine1 = true; }, 1200);
    setTimeout(() => { this.displayStation2 = true; }, 1600);
    setTimeout(() => { this.displayFloor3 = true; }, 1800);
    setTimeout(() => { this.displayLine2 = true; }, 2300);
    setTimeout(() => { this.displayStation3 = true; }, 2700);
    setTimeout(() => { this.displayFloor4 = true; }, 2900);
    setTimeout(() => { this.displayLine3 = true; }, 3400);
    setTimeout(() => { this.displayStation4 = true; }, 3900);
    setTimeout(() => { this.displayText = true; }, 4200);
  }

}
