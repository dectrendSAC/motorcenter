import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPromotionsComponent } from './client-promotions.component';

describe('ClientPromotionsComponent', () => {
  let component: ClientPromotionsComponent;
  let fixture: ComponentFixture<ClientPromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPromotionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
