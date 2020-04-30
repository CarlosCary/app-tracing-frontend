import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsAssignedRapporteurComponent } from './documents-assigned-rapporteur.component';

describe('DocumentsAssignedRapporteurComponent', () => {
  let component: DocumentsAssignedRapporteurComponent;
  let fixture: ComponentFixture<DocumentsAssignedRapporteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsAssignedRapporteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsAssignedRapporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
