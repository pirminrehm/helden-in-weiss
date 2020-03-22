import { Injectable } from '@angular/core';
import { Volunteer, Institution } from '@wir-vs-virus/api-interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  constructor(private http: HttpClient) { }

  private useMockData = false;

  public getAll(searchTerm: string, searchPLZ: string, searchRadius: number): Observable<Institution[]> {
    if (this.useMockData) {
      return this.getMockData();
    }
    return this.http.get<Institution[]>(`/api/institution?searchTerm=${searchTerm}&searchPLZ=${searchPLZ}`);
  }

  public create(volunteer: Volunteer) {
    return this.http.post<Volunteer[]>('/api/volunteer', volunteer);
  }

  private getMockData() {
    return of([
      {
        name: 'Institution',
        firstname: 'Institution',
        email: 'Institution',
        zipcode: 70569,
        city: 'Institution',
        age: 27,
        phone: '-',
        contact: {
          name: 'string',
          firstname: 'string',
          phone: 'string',
          email: 'string',
        },
        description: 'Wir benötigen Helfer.',
        title: 'EInstitutionInstitutionInstitution',
        created: '2020-03-21T15:36:50.756Z',
        qualification: 'Institution'
      }
    ]).pipe(delay(1000));
  }
}
