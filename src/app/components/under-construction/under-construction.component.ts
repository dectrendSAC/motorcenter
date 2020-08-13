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
  station1:string = 'item1';
  station2:string = 'item2';
  station3:string = 'item3';
  station4:string = 'item4';
  counter = [1,2,3,4];

  constructor() { }

  ngOnInit(): void {
    //Initial animation sequence
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

    //Afterload animation
    setTimeout(() => { 
      setInterval(() => {
        this.counter.push(this.counter.shift());
        this.displayText = false; this.displayLine1 = false; this.displayLine2 = false; this.displayLine3 = false;
        setTimeout(() => { this.station1 = 'item'+this.counter[0]; this.station2 = 'item'+this.counter[1]; this.station3 = 'item'+this.counter[2]; this.station4 = 'item'+this.counter[3]; }, 400);
        setTimeout(() => { this.displayLine1 = true; }, 800); 
        setTimeout(() => { this.displayLine2 = true; }, 1200); 
        setTimeout(() => { this.displayLine3 = true; }, 1600); 
        setTimeout(() => { this.displayText = true; }, 2000); 
      }, 5000);
    }, 5200);
  }
}
