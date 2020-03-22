import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { VolunteerCardComponent } from '../../home/volunteer-card/volunteer-card.component';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'wir-vs-virus-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.scss']
})
export class RegisterVolunteerComponent implements OnInit {
  volunteerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]{5}/)
    ]),
    knowledge: new FormControl('', [
      Validators.required,
      Validators.maxLength(300)
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\+?[0-9]{5,30}$/)
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)
    ])
  });

  constructor(private volunteerService: VolunteerService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.volunteerForm.updateValueAndValidity();
    if (!this.volunteerForm.valid) {
      return;
    }

    const val = this.volunteerForm.value;
    console.log(val);

    const volunteer: Volunteer = {
      age: -1,
      city: '--',
      description: val.knowledge,
      email: val.mail,
      firstname: '--',
      qualification: '--',
      name: val.name,
      phone: val.phone,
      title: '--',
      zipcode: val.zipCode,
      active: true,
      registeredAt: new Date().toISOString()
    };

    this.volunteerService.create(volunteer).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        alert('etwas ist scheif gelaufen');
      }
    );
  }
}
