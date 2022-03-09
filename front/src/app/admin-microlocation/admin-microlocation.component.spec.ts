import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMicrolocationComponent } from './admin-microlocation.component';

describe('AdminMicrolocationComponent', () => {
  let component: AdminMicrolocationComponent;
  let fixture: ComponentFixture<AdminMicrolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMicrolocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMicrolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
