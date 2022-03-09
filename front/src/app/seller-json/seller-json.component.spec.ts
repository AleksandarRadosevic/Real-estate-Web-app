import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerJSONComponent } from './seller-json.component';

describe('SellerJSONComponent', () => {
  let component: SellerJSONComponent;
  let fixture: ComponentFixture<SellerJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerJSONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
