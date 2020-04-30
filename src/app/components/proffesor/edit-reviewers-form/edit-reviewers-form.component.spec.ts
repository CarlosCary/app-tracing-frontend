import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewersFormComponent } from './edit-reviewers-form.component';

describe('EditReviewersFormComponent', () => {
  let component: EditReviewersFormComponent;
  let fixture: ComponentFixture<EditReviewersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReviewersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
