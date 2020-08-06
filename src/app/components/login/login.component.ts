import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [ 
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.7s .1s ease-in-out', style({ opacity: 1}))
      ]),
      transition(':leave', [
        style({}),
        animate('.5s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  displaySignin:boolean;

  @Input() noRegisteredClient: boolean;

  @Output() displayLogin = new EventEmitter<boolean>();
  @Output() displayRegister = new EventEmitter<boolean>();
  @Output() changeToolbarClassFromLogin = new EventEmitter<boolean>();
  @Output() displayProfile = new EventEmitter<boolean>();
  @Output() displaySuccess = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('/iniciar-sesion') > -1) {
      this.router.navigate([''], {state: {data: true}});
    }
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
    this.displayLogin.emit(false);
    this.displayProfile.emit(true);
    this.changeToolbarClassFromLogin.emit(false);
    this.displayRegister.emit(false);
    if(document.getElementsByClassName('register')[0]){
      this.displaySuccess.emit(true);
    }
  }



}
