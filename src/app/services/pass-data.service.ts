import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private dataSource = new BehaviorSubject(undefined);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: boolean) {
    this.dataSource.next(data)
  }

}
