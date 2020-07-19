import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  panelOpenBrandState = true;
  panelOpenTypeState = false;
  selectedOptionsBrands: string;
  selectedOptionsTypes: string;
  selectedOptionsArray: string[];

  @Input() disableFilter: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onChecked(items, selection){
    this.selectedOptionsArray = items.selectedOptions.selected.map(item => item.value);
    if(this.selectedOptionsArray.length > 3){
      this.selectedOptionsArray[3] = '...';
    }
    if(selection == 'brands'){
      this.selectedOptionsBrands = this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", ");
    } else {
      this.selectedOptionsTypes = this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", ");
    }
  }
}
