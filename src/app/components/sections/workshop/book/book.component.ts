import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
  today: Date;
  minDate: Date;
  maxDate: Date;
  plateValue:any;
  promotionValue:any;
  bookingFormGroup: FormGroup;

  @Input() selectedItems: string;
  @Output() verifyClient = new EventEmitter<boolean>();
  @Output() displayServices = new EventEmitter<{status: boolean, extra: string}>();

  constructor(private _formBuilder: FormBuilder) {
    //Form inputs validators
    this.bookingFormGroup = this._formBuilder.group({
      dateFormControl: new FormControl({value: '', disabled: true}),
      servicesFormControl: new FormControl({value: '', disabled: true}),
    });

    //Calendar date validation
    const currentDate = new Date();
    const endDate = moment().add(1, 'months').calendar();
    this.minDate = currentDate;
    this.maxDate = new Date(endDate);
  }

  ngOnInit(): void { 
    this.today = moment().toDate();
  }

  //Disable full dates
  dateFilter = (d: Date): boolean => {
    // Prevent Sunday from being selected
    const date_week = moment(d).weekday();
    // Prevent specific dates from being selected
    const date_month = moment(d).format('MM/DD/YYYY').toString();
    
    const noAvailableDates:string[] = ['08/04/2020', '08/10/2020', '08/21/2020', '09/02/2020'];
    
    return noAvailableDates.indexOf(date_month) == -1 && date_week  !== 6;
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
