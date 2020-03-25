import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecaptchaComponent } from 'ng-recaptcha';

import { InstitutionService } from '../../services/institution.service';
import { zipCodeRegExp, phoneRegExp } from '../common/utils';
import { customErrorCodes, Institution } from '@wir-vs-virus/api-interfaces';

@Component({
  selector: 'wir-vs-virus-register-institution',
  templateUrl: './register-institution.component.html',
  styleUrls: ['./register-institution.component.scss']
})
export class RegisterInstitutionComponent implements OnInit {
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
    recaptcha: new FormControl(null, [Validators.required])
  });

  @ViewChild(RecaptchaComponent)
  captchaRef: RecaptchaComponent;

  constructor(private institutionService: InstitutionService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.institutionForm.get('recaptcha').markAllAsTouched();
    console.log(this.institutionForm.value);
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
      zipcode: val.zipCode,
      recaptcha: val.recaptcha
    };

    this.institutionService.create(institution).subscribe(
      res => {
        console.log(res);
        alert('success');
      },
      err => {
        console.error(err.error.message);
        this.captchaRef.reset();

        switch (err.error.message) {
          case customErrorCodes.ZIP_NOT_FOUND:
            this.institutionForm.get('zipCode').setErrors({
              notExists: true
            });
            break;

          case customErrorCodes.CAPTCHA_NOT_FOUND:
            break;

          default:
            alert('Etwas ist scheif gelaufen, versuchs später nochmal.');
            break;
        }
      }
    );
  }
}
