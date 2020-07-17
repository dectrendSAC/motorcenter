import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() noRegisteredClient: boolean;

  @Output() displayLogin = new EventEmitter<boolean>();
  @Output() displayRegister = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.indexOf('/iniciar-sesion') > -1) {
      this.router.navigate([''], {state: {data: true}});
    }
  }

  //Hide Login component
  hideLogin(){    
    console.log(this.noRegisteredClient);
    
    this.displayLogin.emit(false);
    if (this.noRegisteredClient){
      this.displayRegister.emit(true);
    }
  }

}
