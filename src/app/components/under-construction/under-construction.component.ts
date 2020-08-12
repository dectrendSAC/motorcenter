import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {
  displayText:boolean = true;
  displayLine1:boolean = true;
  displayLine2:boolean = true;
  displayLine3:boolean = true;
  displayFloor1:boolean = true;
  displayFloor2:boolean = true;
  displayFloor3:boolean = true;
  displayFloor4:boolean = true;
  displayStation1:boolean = true;
  displayStation2:boolean = true;
  displayStation3:boolean = true;
  displayStation4:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
