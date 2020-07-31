import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  selectedOptionsArray: string[];

  @Output() selectedOptionsItems = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  addServices(items){
    this.selectedOptionsArray = items.selectedOptions.selected.map(item => item.value);
    if(this.selectedOptionsArray.length > 3){
      this.selectedOptionsArray[3] = '...';
      this.selectedOptionsArray.length = 4;
    }
    this.selectedOptionsItems.emit(this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", "));
  }

}
