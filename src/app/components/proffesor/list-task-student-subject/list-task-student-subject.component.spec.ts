import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaskStudentSubjectComponent } from './list-task-student-subject.component';

describe('ListTaskStudentSubjectComponent', () => {
  let component: ListTaskStudentSubjectComponent;
  let fixture: ComponentFixture<ListTaskStudentSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTaskStudentSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaskStudentSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
