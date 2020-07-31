import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  panelOpenBrandState = true;
  panelOpenTypeState = false;
  panelOpenPriceState = false;
  selectedOptionsBrands: string;
  selectedOptionsTypes: string;
  selectedOptionsArray: string[];
  priceValue:number = 1000;
  priceSoles:number = this.priceValue * 3.5;

  @Input() enableFilter: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onChecked(items:any, selection:string){
    this.selectedOptionsArray = items.selectedOptions.selected.map(item => item.value);

    if(selection == 'brands'){
      this.selectedOptionsBrands = this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", ");
    } else {
      this.selectedOptionsTypes = this.selectedOptionsArray.join(',').replace(/,(?=[^\s])/g, ", ");
    }
  }

  //change price to Soles
  exchangeRate(value:number){
    this.priceSoles = value * 3.5;
  }
}
