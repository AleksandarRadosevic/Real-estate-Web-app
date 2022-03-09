import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEstatesComponent } from './seller-estates.component';

describe('SellerEstatesComponent', () => {
  let component: SellerEstatesComponent;
  let fixture: ComponentFixture<SellerEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
