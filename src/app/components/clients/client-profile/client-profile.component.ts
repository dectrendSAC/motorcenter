import { Component, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS, ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { pairwise, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.dirty);
    return (invalidCtrl);
  }
}

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
  contactFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  states: any[] = this.getUnique(_ubigeo['reniec'], 'departamento');
  countiesInitial: any[];
  counties: any[];
  districts: any[];
  hide1:boolean = true;
  hide2:boolean = true;
  hide3:boolean = true;
  selectInfoReadonly: boolean = true;
  formInfoButton: string = 'edit';
  displaySaveBtnForInfo: boolean = false;
  enableEditingForInfo: boolean = false;
  selectContactReadonly: boolean = true;
  formContactButton: string = 'edit';
  displaySaveBtnForContact: boolean = false;
  enableEditingForContact: boolean = false;
  matcher = new MyErrorStateMatcher();

  private _unsubscribeAll: Subject<any>;

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    //Form validators
    this.InfoFormGroup = this._formBuilder.group({
      genderFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      birthdayFormControl: [{value: moment('1991-01-01'), disabled: false}, [Validators.required]]
    });

    this.contactFormGroup = this._formBuilder.group({
      addressFormControl: ['', [Validators.required]],
      stateFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      countyFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      districtFormControl: [{value: 'default', disabled: true}, [Validators.required]],
      phoneFormControl: ['962785689', [Validators.required, Validators.min(100000000)]],
      emailFormControl: ['mail@mail.com', [Validators.required, Validators.email]]
    });

    this.passwordFormGroup = this._formBuilder.group({
      passwordFormControl: ['', [Validators.required]],
      newPasswordFormControl: ['', [Validators.required]],
      passwordConfirmFormControl: ['', [Validators.required, confirmPasswordValidator]]
    });

    //Detect form inputs changes
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

    this.contactFormGroup.valueChanges
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

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Update the validity of the 'passwordConfirm' field when the 'password' field changes
    this.passwordFormGroup.get('newPasswordFormControl').valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
          this.passwordFormGroup.get('passwordConfirmFormControl').updateValueAndValidity();
    });

    //Detect password form changes
    this.passwordFormGroup.valueChanges
    .subscribe(() =>
    {
      if(this.passwordFormGroup.controls['passwordFormControl'].value == '' && this.passwordFormGroup.controls['newPasswordFormControl'].value == '' && this.passwordFormGroup.controls['passwordConfirmFormControl'].value == ''){
        document.getElementById('updatePass').setAttribute("disabled","disabled");
        for (let control in this.passwordFormGroup.controls) {
          this.passwordFormGroup.controls[control].setErrors(null);
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
      var items = [{'address':this.contactFormGroup.controls['addressFormControl'].value, 'state':this.contactFormGroup.controls['stateFormControl'].value, 'county':this.contactFormGroup.controls['countyFormControl'].value, 'district':this.contactFormGroup.controls['districtFormControl'].value, 'phone':this.contactFormGroup.controls['phoneFormControl'].value, 'email':this.contactFormGroup.controls['emailFormControl'].value}];
      sessionStorage.setItem("ContactForm", JSON.stringify(items));
    }
    this.selectContactReadonly = false;
    this.contactFormGroup.controls['stateFormControl'].enable();
    this.contactFormGroup.controls['countyFormControl'].enable();
    this.contactFormGroup.controls['districtFormControl'].enable();
    this.enableEditingForContact = true;
    this.formContactButton = 'restore';
    count = count+1;

    if(document.getElementById('saveContactIconBtn')){
      const dialogRef = this.dialog.open(ClientDialogComponent, {
        data: {tittle: '¿Seguro que desea deshacer los cambios?', content: 'Todos los cambios se perderán'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.data){
          var formValues = JSON.parse(sessionStorage.getItem("ContactForm"));
          this.contactFormGroup.controls['addressFormControl'].setValue(formValues[0].address);
          this.contactFormGroup.controls['stateFormControl'].setValue(formValues[0].state);
          this.contactFormGroup.controls['countyFormControl'].setValue(formValues[0].county);
          this.contactFormGroup.controls['districtFormControl'].setValue(formValues[0].district);
          this.contactFormGroup.controls['phoneFormControl'].setValue(formValues[0].phone);
          this.contactFormGroup.controls['emailFormControl'].setValue(formValues[0].email);
          sessionStorage.removeItem("ContactForm");
          this.selectContactReadonly = true;
          this.contactFormGroup.controls['stateFormControl'].disable();
          this.contactFormGroup.controls['countyFormControl'].disable();
          this.contactFormGroup.controls['districtFormControl'].disable();
          this.enableEditingForContact = false;
          this.displaySaveBtnForContact = false;
          this.formContactButton = 'edit';
          count = 0;
        }
      });
    } else {
      if(count > 1){
        this.formContactButton = 'edit';
        sessionStorage.removeItem("ContactForm");
        this.selectContactReadonly = true;
        this.contactFormGroup.controls['stateFormControl'].disable();
        this.contactFormGroup.controls['countyFormControl'].disable();
        this.contactFormGroup.controls['districtFormControl'].disable();
        this.enableEditingForContact = false;
        this.displaySaveBtnForContact = false;
        count = 0;
      }
    }
  }

  //Save info edited form fields
  saveEditedInfoFields(){
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

  //Save contact edited form fields
  saveEditedContactFields(){
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      data: {tittle: '¿Seguro que desea guardar los cambios?', content: 'Esta decisión no se puede modificar luego'}
    });
    sessionStorage.removeItem("ContactForm");
    this.selectContactReadonly = true;
    this.contactFormGroup.controls['stateFormControl'].disable();
    this.contactFormGroup.controls['countyFormControl'].disable();
    this.contactFormGroup.controls['districtFormControl'].disable();
    this.enableEditingForContact = false;
    this.displaySaveBtnForContact = false;
    this.formContactButton = 'edit';
    count = 0;
  }
}

/**
* Confirm password validation
*
* @param {AbstractControl} control
* @returns {ValidationErrors | null}
*/
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('newPasswordFormControl');
  const passwordConfirm = control.parent.get('passwordConfirmFormControl');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};
