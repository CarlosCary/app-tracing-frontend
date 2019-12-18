import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProffesorComponent } from './home-proffesor.component';

describe('HomeProffesorComponent', () => {
  let component: HomeProffesorComponent;
  let fixture: ComponentFixture<HomeProffesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProffesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProffesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
