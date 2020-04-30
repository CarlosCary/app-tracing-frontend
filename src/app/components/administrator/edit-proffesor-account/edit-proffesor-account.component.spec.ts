import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProffesorAccountComponent } from './edit-proffesor-account.component';

describe('EditProffesorAccountComponent', () => {
  let component: EditProffesorAccountComponent;
  let fixture: ComponentFixture<EditProffesorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProffesorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProffesorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
