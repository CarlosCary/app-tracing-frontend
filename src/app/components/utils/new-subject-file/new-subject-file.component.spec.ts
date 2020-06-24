import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubjectFileComponent } from './new-subject-file.component';

describe('NewSubjectFileComponent', () => {
  let component: NewSubjectFileComponent;
  let fixture: ComponentFixture<NewSubjectFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubjectFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubjectFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
