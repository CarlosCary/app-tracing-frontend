import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormReviewComponent } from './my-form-review.component';

describe('MyFormReviewComponent', () => {
  let component: MyFormReviewComponent;
  let fixture: ComponentFixture<MyFormReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
