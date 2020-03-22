import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInstitutionComponent } from './register-institution.component';

describe('RegisterInstitutionComponent', () => {
  let component: RegisterInstitutionComponent;
  let fixture: ComponentFixture<RegisterInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
