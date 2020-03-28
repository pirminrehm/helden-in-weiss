import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVolunteerSuccessComponent } from './register-volunteer-success.component';

describe('RegisterVolunteerSuccessComponent', () => {
  let component: RegisterVolunteerSuccessComponent;
  let fixture: ComponentFixture<RegisterVolunteerSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVolunteerSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVolunteerSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
