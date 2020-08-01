import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {
  displayServices:boolean = false;
  selectedItemsText:string;

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

}
