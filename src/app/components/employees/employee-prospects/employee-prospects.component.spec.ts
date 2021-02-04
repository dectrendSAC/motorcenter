import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProspectsComponent } from './employee-prospects.component';

describe('EmployeeProspectsComponent', () => {
  let component: EmployeeProspectsComponent;
  let fixture: ComponentFixture<EmployeeProspectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProspectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProspectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
