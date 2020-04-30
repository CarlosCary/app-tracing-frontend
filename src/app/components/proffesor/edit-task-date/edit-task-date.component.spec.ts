import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskDateComponent } from './edit-task-date.component';

describe('EditTaskDateComponent', () => {
  let component: EditTaskDateComponent;
  let fixture: ComponentFixture<EditTaskDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTaskDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
