import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedbackDocumentReviewerComponent } from './list-feedback-document-reviewer.component';

describe('ListFeedbackDocumentReviewerComponent', () => {
  let component: ListFeedbackDocumentReviewerComponent;
  let fixture: ComponentFixture<ListFeedbackDocumentReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeedbackDocumentReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeedbackDocumentReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
