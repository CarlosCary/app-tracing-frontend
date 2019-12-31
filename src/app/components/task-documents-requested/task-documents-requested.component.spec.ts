import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDocumentsRequestedComponent } from './task-documents-requested.component';

describe('TaskDocumentsRequestedComponent', () => {
  let component: TaskDocumentsRequestedComponent;
  let fixture: ComponentFixture<TaskDocumentsRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDocumentsRequestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDocumentsRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
