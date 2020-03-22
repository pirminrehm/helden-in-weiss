import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    ])
  });
  constructor(private institutionService: InstitutionService) {}

  ngOnInit(): void {
    // this.institutionForm.setValue({
    //   institutionName: 'tessdt',
    //   zipCode: 12345,
    //   description: 'test',
    //   contactName: 'test',
    //   contactPhone: '123213123',
    //   contactMail: 'test@sdafasdf'
    // });
  }

  onSubmit() {
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

    this.institutionService.create(institution).subscribe(
      res => {
        console.log(res);
        alert('success');
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
