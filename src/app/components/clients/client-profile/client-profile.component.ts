import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pairwise } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

import * as _moment from 'moment';
import * as _ubigeo from 'ubigeo-peru';

const moment = _moment;
let count = 0;

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
  selectInfoReadonly: boolean = true;
  formInfoButton: string = 'edit';
  displaySaveBtnForInfo: boolean = false;
  enableEditingForInfo: boolean = false;
  selectContactReadonly: boolean = true;
  formContactButton: string = 'edit';
  displaySaveBtnForContact: boolean = false;
  enableEditingForContact: boolean = false;

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    //Form validators
    this.InfoFormGroup = this._formBuilder.group({
      genderFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      birthdayFormControl: [{value: moment('1991-01-01'), disabled: false}, [Validators.required]]
    });

    this.ContactFormGroup = this._formBuilder.group({
      addressFormControl: ['Ingrese su dirección', [Validators.required]],
      stateFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      countyFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      districtFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      phoneFormControl: ['962785689', [Validators.required, Validators.min(100000000)]],
      emailFormControl: ['mail@mail.com', [Validators.required, Validators.email]]
    });

    //Change form inputs changes
    this.InfoFormGroup.valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) =>
    {
      for(var propertyName in prev) {
          if(prev[propertyName] !== next[propertyName]) {
            this.displaySaveBtnForInfo = true;
            break;
          }
      }
    });

    this.ContactFormGroup.valueChanges
    .pipe(pairwise())
    .subscribe(([prev, next]: [any, any]) =>
    {
      for(var propertyName in prev) {
          if(prev[propertyName] !== next[propertyName]) {
            this.displaySaveBtnForContact = true;
            break;
          }
      }
    });
  }

  ngOnInit(): void {
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

  //Enable info form fields editing
  enableInfoEditing(){
    if (count == 0){
      var items = [{'gender':this.InfoFormGroup.controls['genderFormControl'].value, 'date':this.InfoFormGroup.controls['birthdayFormControl'].value}];
      sessionStorage.setItem("InfoForm", JSON.stringify(items));
    }
    this.selectInfoReadonly = false;
    this.InfoFormGroup.controls['genderFormControl'].enable();
    this.enableEditingForInfo = true;
    this.formInfoButton = 'restore';
    count = count+1;

    if(document.getElementById('saveInfoIconBtn')){
      const dialogRef = this.dialog.open(ClientDialogComponent, {
        data: {tittle: '¿Seguro que desea deshacer los cambios?', content: 'Todos los cambios se perderán'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.data){
          var formValues = JSON.parse(sessionStorage.getItem("InfoForm"));
          this.InfoFormGroup.controls['genderFormControl'].setValue(formValues[0].gender);
          this.InfoFormGroup.controls['birthdayFormControl'].setValue(formValues[0].date);
          sessionStorage.removeItem("InfoForm");
          this.selectInfoReadonly = true;
          this.InfoFormGroup.controls['genderFormControl'].disable();
          this.enableEditingForInfo = false;
          this.displaySaveBtnForInfo = false;
          this.formInfoButton = 'edit';
          count = 0;
        }
      });
    } else {
      if(count > 1){
        this.formInfoButton = 'edit';
        sessionStorage.removeItem("InfoForm");
        this.selectInfoReadonly = true;
        this.InfoFormGroup.controls['genderFormControl'].disable();
        this.enableEditingForInfo = false;
        this.displaySaveBtnForInfo = false;
        count = 0;
      }
    }
  }

  //Enable contact form fields editing
  enableContactEditing(){
    if (count == 0){
      var items = [{'address':this.ContactFormGroup.controls['addressFormControl'].value, 'state':this.ContactFormGroup.controls['stateFormControl'].value, 'county':this.ContactFormGroup.controls['countyFormControl'].value, 'district':this.ContactFormGroup.controls['districtFormControl'].value, 'phone':this.ContactFormGroup.controls['phoneFormControl'].value, 'email':this.ContactFormGroup.controls['emailFormControl'].value}];
      sessionStorage.setItem("ContactForm", JSON.stringify(items));
    }
    this.selectContactReadonly = false;
    this.ContactFormGroup.controls['stateFormControl'].enable();
    this.ContactFormGroup.controls['countyFormControl'].enable();
    this.ContactFormGroup.controls['districtFormControl'].enable();
    this.enableEditingForContact = true;
    this.formContactButton = 'restore';
    count = count+1;

    if(document.getElementById('saveContactIconBtn')){
      const dialogRef = this.dialog.open(ClientDialogComponent, {
        data: {tittle: '¿Seguro que desea deshacer los cambios?', content: 'Todos los cambios se perderán'}
      });
    } else {
      if(count > 1){
        this.formContactButton = 'edit';
        sessionStorage.removeItem("ContactForm");
        this.selectContactReadonly = true;
        this.ContactFormGroup.controls['stateFormControl'].disable();
        this.ContactFormGroup.controls['countyFormControl'].disable();
        this.ContactFormGroup.controls['districtFormControl'].disable();
        this.enableEditingForContact = false;
        this.displaySaveBtnForContact = false;
        count = 0;
      }
    }
  }

  //Save edited form fields
  saveEditedFields(){
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: '¿Seguro que desea guardar los cambios?', content: 'Esta decisión no se puede modificar luego'}
    });
    sessionStorage.removeItem("InfoForm");
    this.selectInfoReadonly = true;
    this.InfoFormGroup.controls['genderFormControl'].disable();
    this.enableEditingForInfo = false;
    this.displaySaveBtnForInfo = false;
    this.formInfoButton = 'edit';
    count = 0;
  }
}
