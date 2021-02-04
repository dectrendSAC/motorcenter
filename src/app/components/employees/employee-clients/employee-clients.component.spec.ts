import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClientsComponent } from './employee-clients.component';

describe('EmployeeClientsComponent', () => {
  let component: EmployeeClientsComponent;
  let fixture: ComponentFixture<EmployeeClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
