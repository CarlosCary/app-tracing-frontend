import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubjectFilesComponent } from './list-subject-files.component';

describe('ListSubjectFilesComponent', () => {
  let component: ListSubjectFilesComponent;
  let fixture: ComponentFixture<ListSubjectFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSubjectFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSubjectFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
