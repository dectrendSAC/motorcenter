import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl } from '@angular/forms';

import * as _moment from 'moment';

const moment = _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BookComponent implements OnInit {
  date = new FormControl(moment());
  minDate: Date;
  maxDate: Date;
  plateValue:any;
  promotionValue:any;

  @Input() selectedItems: string;
  @Output() verifyClient = new EventEmitter<boolean>();
  @Output() displayServices = new EventEmitter<{status: boolean, extra: string}>();

  constructor() {
    const currentDate = new Date();
    const endDate = moment().add(1, 'months').calendar();
    this.minDate = currentDate;
    this.maxDate = new Date(endDate);
  }

  ngOnInit(): void {   
  }

  //Disable full dates
  dateFilter = (d: Date) => {
    /*var day = d.weekday();
    // Prevent Saturday and Sunday from being selected.
    return day !== 6;*/
  }

  //Services component methods
  showServices(){
    this.displayServices.emit({status: true, extra: this.selectedItems});
  }

  //Check if is a registered client
  isRegistered(){
    this.verifyClient.emit(true);
  }
}
