import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstitutionSuccessComponent } from './register-institution-success.component';

describe('RegisterInstitutionSuccessComponent', () => {
  let component: RegisterInstitutionSuccessComponent;
  let fixture: ComponentFixture<RegisterInstitutionSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInstitutionSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInstitutionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
