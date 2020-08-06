import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('1s ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('1s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('slideUpDown', [ 
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        style({}),
        animate('.3s ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.7s ease-in-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({}),
        animate('.5s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class WorkshopComponent implements OnInit {
  displayBottom:boolean;
  displayServices:boolean = false;
  displayStack:boolean;
  displayTitle:boolean;
  displayBook:boolean;
  selectedItemsText:string;

  @Input() displayRegisterFromSection: boolean;
  @Input() awaitAnimation: boolean;

  @Output() verifyClientFromWorkshop = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegisterFromWorkshop = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    //Animation sequence
    setTimeout(() => { this.displayBottom = true }, 200);
    setTimeout(() => { this.displayStack = true }, 800);
    setTimeout(() => { this.displayTitle = true }, 1600);
    setTimeout(() => { this.displayBook = true }, 2300);
  }

  //Await animation sequence
  ngOnChanges(changes: SimpleChanges) {
    if(changes.awaitAnimation.currentValue){
      this.displayBook = false;
      setTimeout(() => { this.displayTitle = false }, 700);
      setTimeout(() => { this.displayStack = false }, 1400);
      setTimeout(() => { this.displayBottom = false }, 2100);
    }
}

  //Services methods
  showServices($event:any){
    this.displayServices = $event.status;
    this.selectedItemsText = $event.extra;
  }

  showSelectedServices(items:string){
    this.selectedItemsText = items;
  }

  hideServices(status:boolean){
    this.displayServices = status;
  }

  //Check if client is registered
  isClientRegistered(status:boolean){
    this.verifyClientFromWorkshop.emit({status: status, extra: 'workshop'});
  }

  //Show book component
  showBook(status:boolean){
    this.hideRegisterFromWorkshop.emit(!status);
  }

}
