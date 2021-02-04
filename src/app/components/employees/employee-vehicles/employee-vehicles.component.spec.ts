import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVehiclesComponent } from './employee-vehicles.component';

describe('EmployeeVehiclesComponent', () => {
  let component: EmployeeVehiclesComponent;
  let fixture: ComponentFixture<EmployeeVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
