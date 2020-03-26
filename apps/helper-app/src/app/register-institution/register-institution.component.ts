import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customErrorCodes, Institution } from '@wir-vs-virus/api-interfaces';
import { RecaptchaComponent } from 'ng-recaptcha';
import { first } from 'rxjs/operators';
import { InstitutionService } from '../../services/institution.service';
import { phoneRegExp, zipCodeRegExp } from '../common/utils';

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
    agreePrivacy: new FormControl(false, Validators.requiredTrue),
    recaptcha: new FormControl(null, [Validators.required]),
  });

  @ViewChild(RecaptchaComponent)
  captchaRef: RecaptchaComponent;

  sendingRequest = false;
  errorMessages: { target; value; property; children; constraints }[] = [];

  constructor(
    private institutionService: InstitutionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.institutionForm.get('recaptcha').markAllAsTouched();
    console.log(this.institutionForm.value);
    this.showPrivacyError = !!this.institutionForm.get('agreePrivacy').errors;
    if (!this.institutionForm.valid) {
      return;
    }
    console.log(this.institutionForm.value);
    const val = this.institutionForm.value;
    const institution: Institution = {
      contact: {
        name: val.contactName,
        email: val.contactMail,
        phone: val.contactPhone,
      },
      description: val.description,
      name: val.institutionName,
      zipcode: val.zipCode,
      recaptcha: val.recaptcha,
      privacyAccepted: val.agreePrivacy,
    };

    this.sendingRequest = true;
    this.institutionService
      .create(institution)
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/register-institution/success']);
        },
        err => {
          this.sendingRequest = false;
          console.error(err.error.message);
          this.errorMessages = err.error.message;
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
              break;
          }
        }
      );
  }
}
