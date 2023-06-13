import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTasksComponent } from './card-tasks.component';

describe('CardTasksComponent', () => {
  let component: CardTasksComponent;
  let fixture: ComponentFixture<CardTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTasksComponent]
    });
    fixture = TestBed.createComponent(CardTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
