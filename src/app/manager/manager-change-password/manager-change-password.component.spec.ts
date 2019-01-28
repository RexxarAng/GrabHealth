import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChangePasswordComponent } from './manager-change-password.component';

describe('ManagerChangePasswordComponent', () => {
  let component: ManagerChangePasswordComponent;
  let fixture: ComponentFixture<ManagerChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
