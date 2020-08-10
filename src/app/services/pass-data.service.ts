import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private showRegisterDataSource = new BehaviorSubject(undefined);
  showRegisteCurrentData = this.showRegisterDataSource.asObservable();

  private awaitAnimationOnScrollDataSource = new BehaviorSubject(undefined);
  awaitAnimationOnScrollCurrentData = this.awaitAnimationOnScrollDataSource.asObservable();

  private goToMainStatusDataSource = new BehaviorSubject(undefined);
  goToMainStatusCurrentData = this.goToMainStatusDataSource.asObservable();

  constructor() { }

  showRegisterStatus(data: boolean) {
    this.showRegisterDataSource.next(data)
  }

  awaitAnimationOnScroll(data:boolean) {
    this.awaitAnimationOnScrollDataSource.next(data)
  }

  goToMainStatus(data:boolean) {
    this.goToMainStatusDataSource.next(data)
  }

}
