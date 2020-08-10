import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { multipleAnimations } from '../../../animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  animations: [
    multipleAnimations.slideOneTrigger,
    multipleAnimations.slideThreeTrigger,
    multipleAnimations.fadeOneTrigger
  ]
})
export class WorkshopComponent implements OnInit {
  displayBottom:boolean;
  displayServices:boolean = false;
  displayStack:boolean;
  displayTitle:boolean;
  displayBook:boolean;
  displayOthers: boolean;
  displayOtherShadow: boolean;
  selectedItemsText:string;

  @Input() displayRegisterFromSection: boolean;
  @Input() awaitAnimation: boolean;
  @Input() goToMain:boolean;

  @Output() verifyClient = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegister = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    //Animation sequence
    setTimeout(() => { this.displayBottom = true }, 200);
    setTimeout(() => { this.displayStack = true }, 800);
    setTimeout(() => { this.displayOthers = true }, 1400);
    setTimeout(() => { this.displayOtherShadow = true }, 1600);
    setTimeout(() => { this.displayTitle = true }, 1600);
    setTimeout(() => { this.displayBook = true }, 2300);
  }

  //Await animation sequence
  ngOnChanges(changes: SimpleChanges) {
    if(changes.awaitAnimation.currentValue){
      this.displayBook = false;
      setTimeout(() => { this.displayTitle = false }, 700);
      setTimeout(() => { this.displayStack = false }, 1400);
      if(changes.goToMain){
        if(changes.goToMain.currentValue){
          setTimeout(() => { this.router.navigateByUrl('/') }, 2800);
        }
      } else {
        setTimeout(() => { this.displayBottom = false }, 2100);
      }
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
    this.verifyClient.emit({status: status, extra: 'workshop'});
  }

  //Show book component
  showBook(status:boolean){
    this.hideRegister.emit(!status);
  }

}