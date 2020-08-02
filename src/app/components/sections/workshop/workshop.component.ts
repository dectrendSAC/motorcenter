import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  displayServices:boolean = false;
  selectedItemsText:string;

  @Input() displayRegisterFromSection: boolean;

  @Output() verifyClientFromWorkshop = new EventEmitter<{status: boolean, extra: string}>();
  @Output() hideRegisterFromWorkshop = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
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
