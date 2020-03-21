import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { VolunteerService } from '../services/volunteer.service';

@Component({
  selector: 'wir-vs-virus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  volunteers$: Observable<Volunteer[]>;

  constructor(
    private http: HttpClient,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit() {
    this.getVolunteers();
  }

  postVolunteer() {
    console.log('Send Post Request');
    this.http
      .post<Volunteer>('/api/volunteer', {
        name: 'TestHelper_' + Math.round(Math.random() * 100),
        email: 'noMail',
        plz: 111111
      })
      .subscribe(
        val => {
          console.log('POST call successful value returned in body', val);
          this.getVolunteers();
        },
        response => {
          console.log('POST call in error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        }
      );
  }

  getVolunteers() {
    // this.volunteers$ = this.http.get<[Volunteer]>('/api/volunteer');
    this.volunteers$ = this.volunteerService.getAll();
  }
}
