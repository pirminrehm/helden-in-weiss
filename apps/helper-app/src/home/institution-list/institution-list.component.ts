import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'wir-vs-virus-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit {
  institutions$: Observable<any>;

  constructor() {}

  ngOnInit(): void {
    this.institutions$ = of([
      {
        name: 'Institution',
        firstname: 'Institution',
        email: 'Institution',
        zipcode: 70569,
        city: 'Institution',
        age: 27,
        phone: '-',
        description: 'Wir benötigen Helfer.',
        title: 'EInstitutionInstitutionInstitution',
        created: '2020-03-21T15:36:50.756Z',
        qualification: 'Institution'
      }
    ]).pipe(delay(1000));
  }
}
