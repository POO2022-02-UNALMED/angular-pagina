import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HideModalComponent } from './hide-modal.component';

describe('HideModalComponent', () => {
  let component: HideModalComponent;
  let fixture: ComponentFixture<HideModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HideModalComponent]
    });
    fixture = TestBed.createComponent(HideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
