import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showRegister:boolean = false;
  showSelection:boolean = true;
  type:boolean;
  name:string;
  email:string;

  @Output() showList = new EventEmitter<boolean>();
  @Output() disableFilter = new EventEmitter<boolean>();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  //Start registration form
  startRegister(type:boolean){
    this.showSelection = false;
    this.type = type;
    this.showRegister = true;
  }

  //Get name of client
  passName(name:string){
    this.name = name;
  }

  //Get email of client
  passEmail(email){
    this.email = email;
  }

  //Choose type of person
  choosePersonType(){
    this.showRegister = false;
    this.showSelection = true;
  }

  //Close register form
  closeRegister(){
    this.showList.emit(true);
    this.disableFilter.emit(false);
  }

}
