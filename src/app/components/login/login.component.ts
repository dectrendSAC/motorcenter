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
  @Output() displayProfile = new EventEmitter<boolean>();
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
    if (this.loginForm.controls['username'].value == 'cliente'){
      console.log('cliente');
    } else {
      console.log('empleado');
    }

    this.displayLogin.emit(false);
    this.displayProfile.emit(true);
    this.changeToolbarClassFromLogin.emit(false);
    this.displayRegister.emit(false);
    if(document.getElementsByClassName('register')[0]){
      this.displaySuccess.emit(true);
    }
  }

  onSubmit() {
  }



}
