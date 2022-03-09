import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEstatesUpdateComponent } from './seller-estates-update.component';

describe('SellerEstatesUpdateComponent', () => {
  let component: SellerEstatesUpdateComponent;
  let fixture: ComponentFixture<SellerEstatesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerEstatesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEstatesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
