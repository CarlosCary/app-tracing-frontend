import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsTasksComponent } from './list-students-tasks.component';

describe('ListStudentsTasksComponent', () => {
  let component: ListStudentsTasksComponent;
  let fixture: ComponentFixture<ListStudentsTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
