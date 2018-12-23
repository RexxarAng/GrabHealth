import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextPatientComponent } from './next-patient.component';

describe('NextPatientComponent', () => {
  let component: NextPatientComponent;
  let fixture: ComponentFixture<NextPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
