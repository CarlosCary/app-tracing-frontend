import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssignClassroomComponent } from './new-assign-classroom.component';

describe('NewAssignClassroomComponent', () => {
  let component: NewAssignClassroomComponent;
  let fixture: ComponentFixture<NewAssignClassroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssignClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssignClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
