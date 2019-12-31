import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormRequestedComponent } from './task-form-requested.component';

describe('TaskFormRequestedComponent', () => {
  let component: TaskFormRequestedComponent;
  let fixture: ComponentFixture<TaskFormRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskFormRequestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
