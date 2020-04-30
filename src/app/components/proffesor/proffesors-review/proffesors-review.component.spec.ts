import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffesorsReviewComponent } from './proffesors-review.component';

describe('ProffesorsReviewComponent', () => {
  let component: ProffesorsReviewComponent;
  let fixture: ComponentFixture<ProffesorsReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProffesorsReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProffesorsReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
