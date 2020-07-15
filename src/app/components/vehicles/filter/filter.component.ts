import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  panelOpenBrandState = true;
  panelOpenTypeState = false;
  selectedOptions: string;
  selectedOptionsArray: string[];

  constructor() { }

  ngOnInit(): void {
  }

  onChecked(brands){
    this.selectedOptionsArray = brands.selectedOptions.selected.map(item => item.value);
    this.selectedOptions = this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", ");
  }
}
