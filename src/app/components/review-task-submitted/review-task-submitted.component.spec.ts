import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTaskSubmittedComponent } from './review-task-submitted.component';

describe('ReviewTaskSubmittedComponent', () => {
  let component: ReviewTaskSubmittedComponent;
  let fixture: ComponentFixture<ReviewTaskSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTaskSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTaskSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
