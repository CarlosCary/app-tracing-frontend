import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudentTableComponent } from './home-student-table.component';

describe('HomeStudentTableComponent', () => {
  let component: HomeStudentTableComponent;
  let fixture: ComponentFixture<HomeStudentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeStudentTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStudentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
