import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyPersonalDataComponent } from './edit-my-personal-data.component';

describe('EditMyPersonalDataComponent', () => {
  let component: EditMyPersonalDataComponent;
  let fixture: ComponentFixture<EditMyPersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyPersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
