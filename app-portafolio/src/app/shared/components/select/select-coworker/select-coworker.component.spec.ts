import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoworkerComponent } from './select-coworker.component';

describe('SelectCoworkerComponent', () => {
  let component: SelectCoworkerComponent;
  let fixture: ComponentFixture<SelectCoworkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCoworkerComponent]
    });
    fixture = TestBed.createComponent(SelectCoworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
