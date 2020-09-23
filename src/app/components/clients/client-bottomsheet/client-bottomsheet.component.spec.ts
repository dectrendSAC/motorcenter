import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBottomsheetComponent } from './client-bottomsheet.component';

describe('ClientBottomsheetComponent', () => {
  let component: ClientBottomsheetComponent;
  let fixture: ComponentFixture<ClientBottomsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBottomsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBottomsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
