import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCaptchaComponent } from './picture-captcha.component';

describe('PictureCaptchaComponent', () => {
  let component: PictureCaptchaComponent;
  let fixture: ComponentFixture<PictureCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureCaptchaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
