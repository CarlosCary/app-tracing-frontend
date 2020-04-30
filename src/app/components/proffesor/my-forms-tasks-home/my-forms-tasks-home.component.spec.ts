import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormsTasksHomeComponent } from './my-forms-tasks-home.component';

describe('MyFormsTasksHomeComponent', () => {
  let component: MyFormsTasksHomeComponent;
  let fixture: ComponentFixture<MyFormsTasksHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormsTasksHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormsTasksHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
