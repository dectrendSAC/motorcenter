import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as _moment from 'moment';
import * as _ubigeo from 'ubigeo-peru';

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
  InfoFormGroup: FormGroup;
  ContactFormGroup: FormGroup;
  states: any[] = this.getUnique(_ubigeo['reniec'], 'departamento');
  countiesInitial: any[];
  counties: any[];
  districts: any[];
  selectReadonly:boolean;
  date:any;

  constructor(private _formBuilder: FormBuilder) {
    //Form validators
    this.InfoFormGroup = this._formBuilder.group({
      genderFormControl: [{value: 'default', disabled: true}, [Validators.required]]
    });

    this.ContactFormGroup = this._formBuilder.group({
      addressFormControl: ['Ingrese su dirección', [Validators.required]],
      stateFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      countyFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      districtFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      phoneFormControl: ['962785689', [Validators.required, Validators.min(100000000)]]
    });
  }

  ngOnInit(): void {
    this.selectReadonly = true;
    this.date = new FormControl(moment('1991-01-01'));
  }

  //Get unique items in the array
  getUnique(arr: any[], comp: string) {
    const unique =  arr.map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => arr[e]).map(e => arr[e]);

    return unique;
  }

  //Fill county select
  changeState(data:any){
    this.countiesInitial = _ubigeo['reniec'].filter(function( obj ) {
      return obj.departamento == data;
    });

    this.counties = this.getUnique(this.countiesInitial, 'provincia');
    this.counties.shift();
  }

  //Fill district select
  changeDistrict(data:any){
    this.districts = this.countiesInitial.filter(function( obj ) {
      return obj.provincia == data;
    });

    this.districts  = this.getUnique(this.districts, 'distrito');
    this.districts.shift();
  }

  //Input permit only numbers
  onlyNumber(evt){
    // Only ASCII charactar in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
  }

}
