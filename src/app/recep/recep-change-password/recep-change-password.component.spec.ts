import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepChangePasswordComponent } from './recep-change-password.component';

describe('RecepChangePasswordComponent', () => {
  let component: RecepChangePasswordComponent;
  let fixture: ComponentFixture<RecepChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
