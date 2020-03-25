import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customErrorCodes, Institution } from '@wir-vs-virus/api-interfaces';
import { InstitutionService } from '../../services/institution.service';
import { phoneRegExp, zipCodeRegExp } from '../common/utils';
import { first } from 'rxjs/operators';

@Component({
  selector: 'wir-vs-virus-register-institution',
  templateUrl: './register-institution.component.html',
  styleUrls: ['./register-institution.component.scss']
})
export class RegisterInstitutionComponent implements OnInit {
  showPrivacyError = false;
  institutionForm = new FormGroup({
    institutionName: new FormControl('', [
      Validators.required,
      Validators.maxLength(300)
    ]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern(zipCodeRegExp)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(300)
    ]),
    contactName: new FormControl('', [
      Validators.required,
      Validators.maxLength(70)
    ]),
    contactPhone: new FormControl('', [
      Validators.required,
      Validators.pattern(phoneRegExp)
    ]),
    contactMail: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(70)
    ]),
    agreePrivacy: new FormControl(false, Validators.requiredTrue)
  });
  constructor(
    private institutionService: InstitutionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.showPrivacyError = !!this.institutionForm.get('agreePrivacy').errors;
    if (!this.institutionForm.valid) {
      return;
    }
    console.log(this.institutionForm.value);
    const val = this.institutionForm.value;
    const institution: Institution = {
      city: '--',
      contact: {
        email: val.contactMail,
        firstname: '--',
        name: val.contactName,
        phone: val.contactPhone
      },
      description: val.description,
      name: val.institutionName,
      title: '--',
      zipcode: val.zipCode
    };

    this.institutionService
      .create(institution)
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/register-institution/success']);
        },
        err => {
          console.error(err);
          if (err.error.message === customErrorCodes.ZIP_NOT_FOUND) {
            // this.institutionForm.get('zipCode').setErrors({ incorrect: true });
            this.institutionForm.get('zipCode').setErrors({
              notExists: true
            });
          } else {
            alert('etwas ist scheif gelaufen');
          }
        }
      );
  }
}
