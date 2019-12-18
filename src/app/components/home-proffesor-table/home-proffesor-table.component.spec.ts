import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProffesorTableComponent } from './home-proffesor-table.component';

describe('HomeProffesorTableComponent', () => {
  let component: HomeProffesorTableComponent;
  let fixture: ComponentFixture<HomeProffesorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProffesorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProffesorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
