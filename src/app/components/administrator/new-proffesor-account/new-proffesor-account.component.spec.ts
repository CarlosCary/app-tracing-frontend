import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProffesorAccountComponent } from './new-proffesor-account.component';

describe('NewProffesorAccountComponent', () => {
  let component: NewProffesorAccountComponent;
  let fixture: ComponentFixture<NewProffesorAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProffesorAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProffesorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
