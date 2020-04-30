import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedbackDocumentReviewerComponent } from './new-feedback-document-reviewer.component';

describe('NewFeedbackDocumentReviewerComponent', () => {
  let component: NewFeedbackDocumentReviewerComponent;
  let fixture: ComponentFixture<NewFeedbackDocumentReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFeedbackDocumentReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedbackDocumentReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
