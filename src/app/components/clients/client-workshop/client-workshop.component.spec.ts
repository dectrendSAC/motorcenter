import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWorkshopComponent } from './client-workshop.component';

describe('ClientWorkshopComponent', () => {
  let component: ClientWorkshopComponent;
  let fixture: ComponentFixture<ClientWorkshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWorkshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
