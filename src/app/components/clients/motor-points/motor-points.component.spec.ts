import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorPointsComponent } from './motor-points.component';

describe('MotorPointsComponent', () => {
  let component: MotorPointsComponent;
  let fixture: ComponentFixture<MotorPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
