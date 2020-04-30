import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsAssignedTutorComponent } from './documents-assigned-tutor.component';

describe('DocumentsAssignedTutorComponent', () => {
  let component: DocumentsAssignedTutorComponent;
  let fixture: ComponentFixture<DocumentsAssignedTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsAssignedTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsAssignedTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
