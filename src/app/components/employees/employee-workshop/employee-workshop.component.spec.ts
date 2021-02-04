import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkshopComponent } from './employee-workshop.component';

describe('EmployeeWorkshopComponent', () => {
  let component: EmployeeWorkshopComponent;
  let fixture: ComponentFixture<EmployeeWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
