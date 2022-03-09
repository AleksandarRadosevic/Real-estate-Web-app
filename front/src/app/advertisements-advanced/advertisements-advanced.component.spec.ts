import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsAdvancedComponent } from './advertisements-advanced.component';

describe('AdvertisementsAdvancedComponent', () => {
  let component: AdvertisementsAdvancedComponent;
  let fixture: ComponentFixture<AdvertisementsAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
