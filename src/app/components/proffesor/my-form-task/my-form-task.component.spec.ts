import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormTaskComponent } from './my-form-task.component';

describe('MyFormTaskComponent', () => {
  let component: MyFormTaskComponent;
  let fixture: ComponentFixture<MyFormTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFormTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
