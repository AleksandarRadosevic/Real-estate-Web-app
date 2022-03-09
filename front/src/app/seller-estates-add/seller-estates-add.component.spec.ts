import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEstatesAddComponent } from './seller-estates-add.component';

describe('SellerEstatesAddComponent', () => {
  let component: SellerEstatesAddComponent;
  let fixture: ComponentFixture<SellerEstatesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerEstatesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEstatesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
