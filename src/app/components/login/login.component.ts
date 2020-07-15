import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output()
  displayLogin = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('/iniciar-sesion') > -1) {
      this.router.navigate([''], {state: {data: true}});
    }
  }

  //Hide Login component
  hideLogin(){
    this.displayLogin.emit(false);
  }

}
