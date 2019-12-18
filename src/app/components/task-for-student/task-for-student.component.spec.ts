import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForStudentComponent } from './task-for-student.component';

describe('TaskForStudentComponent', () => {
  let component: TaskForStudentComponent;
  let fixture: ComponentFixture<TaskForStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskForStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
