import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPromotionDialogComponent } from './client-promotion-dialog.component';

describe('ClientPromotionDialogComponent', () => {
  let component: ClientPromotionDialogComponent;
  let fixture: ComponentFixture<ClientPromotionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPromotionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPromotionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
