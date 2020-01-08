import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsEnrolledComponent } from './list-students-enrolled.component';

describe('ListStudentsEnrolledComponent', () => {
  let component: ListStudentsEnrolledComponent;
  let fixture: ComponentFixture<ListStudentsEnrolledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsEnrolledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsEnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
