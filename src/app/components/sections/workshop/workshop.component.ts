import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { multipleAnimations } from '../../../animations';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/pass-data.service';

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
  displayRegisterFromSection: boolean;

  @Output() verifyClient = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegister = new EventEmitter<boolean>();

  constructor(private data: DataService, private router: Router) { 
    this.data.showRegisteCurrentData.subscribe(data1 => this.displayRegisterFromSection = data1);

    //Await animation sequence
    this.data.awaitAnimationOnScrollCurrentData.subscribe(data2 => {
      if (data2){
        this.displayBook = false;
        setTimeout(() => { this.displayTitle = false }, 700);
        setTimeout(() => { this.displayStack = false }, 1400);
        this.data.goToMainStatusCurrentData.subscribe(data3 => {
          if(data3){
            setTimeout(() => { this.router.navigateByUrl('/'); }, 2800);
          } else {
            setTimeout(() => { this.displayBottom = false }, 2900);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    //Animation sequence
    this.displayBottom = true
    setTimeout(() => { this.displayStack = true }, 800);
    setTimeout(() => { this.displayOthers = true }, 1400);
    setTimeout(() => { this.displayOtherShadow = true }, 1600);
    setTimeout(() => { this.displayTitle = true }, 1600);
    setTimeout(() => { this.displayBook = true }, 2300);
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
