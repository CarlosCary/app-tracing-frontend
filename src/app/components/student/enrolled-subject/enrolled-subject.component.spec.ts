import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledSubjectComponent } from './enrolled-subject.component';

describe('EnrolledSubjectComponent', () => {
  let component: EnrolledSubjectComponent;
  let fixture: ComponentFixture<EnrolledSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolledSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
