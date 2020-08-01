import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  selectedOptionsArray: string[];

  @Input() selectedItems: string;
  @Output() selectedOptionsItems = new EventEmitter<string>();
  @Output() displayServices = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    const str = this.selectedItems;
    const array = str.split(', ');
    array.forEach(item => this["select"+item] = true);
  }

  addServices(items:any){
    this.selectedOptionsArray = items.selectedOptions.selected.map(item => item.value);
    this.selectedOptionsItems.emit(this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", "));
    this.displayServices.emit(false);
  }

  hideServices(){
    this.displayServices.emit(false);
  }

}
