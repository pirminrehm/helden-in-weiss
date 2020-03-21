import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wir-vs-virus-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.scss']
})
export class RegisterVolunteerComponent implements OnInit {

  volunteerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    zipCode: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    knowledge: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    mail: new FormControl('', [Validators.required, Validators.maxLength(300)]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.volunteerForm.value);
  }

}
