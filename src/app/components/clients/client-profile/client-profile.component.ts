import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';

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
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ClientProfileComponent implements OnInit {
  date:any;

  constructor() { }

  ngOnInit(): void {
    this.date = new FormControl(moment());
  }

}
