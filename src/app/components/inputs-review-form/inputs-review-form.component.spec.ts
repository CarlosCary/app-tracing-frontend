import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsReviewFormComponent } from './inputs-review-form.component';

describe('InputsReviewFormComponent', () => {
  let component: InputsReviewFormComponent;
  let fixture: ComponentFixture<InputsReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
