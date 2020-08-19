import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  minDate: Date;
  maxDate: Date;
  bookingFormGroup: FormGroup;

  @Input() selectedItems: string;
  @Output() verifyClient = new EventEmitter<boolean>();
  @Output() displayServices = new EventEmitter<{status: boolean, extra: string}>();

  constructor(private _formBuilder: FormBuilder) {
    //Form inputs validators
    this.bookingFormGroup = this._formBuilder.group({
      dateFormControl: ['', [Validators.required]],
      timeFormControl: ['', [Validators.required]],
      plateFormControl: ['', [Validators.required, Validators.minLength(6)]],
      servicesFormControl: ['', [Validators.required]]
    });

    //Calendar date validation
    const currentDate = new Date();
    const endDate = moment().add(1, 'months').calendar();
    this.minDate = currentDate;
    this.maxDate = new Date(endDate);
  }

  ngOnInit(): void {
    this.bookingFormGroup.reset();
    this.bookingFormGroup.controls['dateFormControl'].setValue(moment().toDate());
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
    this.displayServices.emit({status: true, extra: this.bookingFormGroup.controls['servicesFormControl'].value});
  }

  //change services value on @input
  ngOnChanges(changes: SimpleChanges) {
    this.bookingFormGroup.controls['servicesFormControl'].setValue(changes.selectedItems.currentValue);
  }

  //Check if is a registered client
  isRegistered(){
    this.bookingFormGroup.reset();
    this.bookingFormGroup.controls['dateFormControl'].setValue(moment().toDate());
    this.verifyClient.emit(true);
  }
}
