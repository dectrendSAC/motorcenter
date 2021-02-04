import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { multipleAnimations } from '../../animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    multipleAnimations.fadeOneTrigger
  ]
})
export class LoginComponent implements OnInit {
  displaySignin:boolean;
  loginForm: FormGroup;

  @Input() noRegisteredClient: boolean;

  @Output() displayLogin = new EventEmitter<boolean>();
  @Output() displayRegister = new EventEmitter<boolean>();
  @Output() changeToolbarClassFromLogin = new EventEmitter<boolean>();
  @Output() displayProfile = new EventEmitter<{display: boolean, profile: string, rol: string}>();
  @Output() displaySuccess = new EventEmitter<boolean>();

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('/iniciar-sesion') > -1) {
      this.router.navigate([''], {state: {data: true}});
    }

    this.loginForm = this.fb.group({
      username: [],
      password: []
    });
  }

  //Hide Login component
  hideLogin(){
    this.displayLogin.emit(false);
    if (this.noRegisteredClient){
      this.changeToolbarClassFromLogin.emit(true);
      this.displayRegister.emit(true);
    }
  }

  //Log in client
  logIn(){
    //Tempo sign in until db works
    this.displayLogin.emit(false);

    if (this.loginForm.controls['username'].value == 'cliente'){
      this.displayProfile.emit({display: true, profile: 'client', rol: ''});
    } else if (this.loginForm.controls['username'].value == 'vendedor_vehiculos') {
      this.displayProfile.emit({display: true, profile: 'employee', rol: 'car_sales'});
    } else if (this.loginForm.controls['username'].value == 'vendedor_repuestos') {
      this.displayProfile.emit({display: true, profile: 'employee', rol: 'part_sales'});
    } else if (this.loginForm.controls['username'].value == 'contador') {
      this.displayProfile.emit({display: true, profile: 'employee', rol: 'accountant'});
    } else if (this.loginForm.controls['username'].value == 'admin') {
      this.displayProfile.emit({display: true, profile: 'employee', rol: 'admin'});
    } else if (this.loginForm.controls['username'].value == 'overlord') {
      this.displayProfile.emit({display: true, profile: 'employee', rol: 'overlord'});
    }

    this.changeToolbarClassFromLogin.emit(false);
    this.displayRegister.emit(false);
    if(document.getElementsByClassName('register')[0]){
      this.displaySuccess.emit(true);
    }
  }

  onSubmit() {
  }



}
