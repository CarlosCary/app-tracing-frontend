import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormReviewEditComponent } from './my-form-review-edit.component';

describe('MyFormReviewEditComponent', () => {
  let component: MyFormReviewEditComponent;
  let fixture: ComponentFixture<MyFormReviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormReviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
