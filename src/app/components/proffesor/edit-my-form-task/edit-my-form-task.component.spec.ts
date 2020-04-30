import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyFormTaskComponent } from './edit-my-form-task.component';

describe('EditMyFormTaskComponent', () => {
  let component: EditMyFormTaskComponent;
  let fixture: ComponentFixture<EditMyFormTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyFormTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyFormTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
