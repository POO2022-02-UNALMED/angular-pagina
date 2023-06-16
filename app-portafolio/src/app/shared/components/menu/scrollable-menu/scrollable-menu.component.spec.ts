import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollableMenuComponent } from './scrollable-menu.component';

describe('ScrollableMenuComponent', () => {
  let component: ScrollableMenuComponent;
  let fixture: ComponentFixture<ScrollableMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollableMenuComponent]
    });
    fixture = TestBed.createComponent(ScrollableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
