import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  editable: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showRegister:boolean = false;
  showSelection:boolean = true;
  type:boolean;
  surname:string;
  doc: string;
  cellphone: string;
  email:string;
  changeinputClass:boolean = false;

  @Output() showList = new EventEmitter<boolean>();
  @Output() showBook = new EventEmitter<boolean>();

  constructor(private _formBuilder: FormBuilder) {
    //Form inputs validators
    this.firstFormGroup = this._formBuilder.group({
      nameFormControl: ['', [Validators.required]],
      surnameFormControl: ['', [Validators.required]]
    });

    this.firstFormGroup.controls['nameFormControl'].setValue('');

    this.secondFormGroup = this._formBuilder.group({
      docFormControl: ['', [Validators.required, Validators.min(10000000)]],
      phoneFormControl: ['', [Validators.required, Validators.min(100000000)]],
      emailFormControl: ['', [Validators.required, Validators.email]],
      politicsFormControl: ['', [Validators.required]]
    });
   }

  ngOnInit(): void {
    //Change class according to section component
    if(document.getElementById('workshop')){
      this.changeinputClass = true;
    }
  }

  //Start registration form
  startRegister(type:boolean){
    this.showSelection = false;
    this.type = type;
    if(type){
      this.surname=' ';
    }
    this.showRegister = true;
  }

  //Get email of client
  passEmail(email:string){
    this.editable = false;
    this.email = email;
    setTimeout(() => { 
      this.showList.emit(true); 
      this.showBook.emit(true);
    }, 10000);
  }

  //Choose type of person
  choosePersonType(){
    this.showRegister = false;
    this.showSelection = true;
  }

  //Close register form
  closeRegister(){
    this.showList.emit(true);
    this.showBook.emit(true);
  }

}
