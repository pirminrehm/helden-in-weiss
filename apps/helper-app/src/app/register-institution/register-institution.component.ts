import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wir-vs-virus-register-institution',
  templateUrl: './register-institution.component.html',
  styleUrls: ['./register-institution.component.scss']
})
export class RegisterInstitutionComponent implements OnInit {

  volunteerForm = new FormGroup({
    institutionName: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    zipCode: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    contactName: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    contactPhone: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    contactMail: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.volunteerForm.value);
  }
}
