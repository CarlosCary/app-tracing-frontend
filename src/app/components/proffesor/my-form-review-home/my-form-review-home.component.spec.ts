import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormReviewHomeComponent } from './my-form-review-home.component';

describe('MyFormReviewHomeComponent', () => {
  let component: MyFormReviewHomeComponent;
  let fixture: ComponentFixture<MyFormReviewHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormReviewHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormReviewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
