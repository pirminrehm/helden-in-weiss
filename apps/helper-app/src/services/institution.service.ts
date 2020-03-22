import { Injectable } from '@angular/core';
import { Volunteer, Institution } from '@wir-vs-virus/api-interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  constructor(private http: HttpClient) {}

  private useMockData = false;

  public getAll(
    searchTerm: string,
    zipCode: string,
    radius: number
  ): Observable<Institution[]> {
    if (this.useMockData) {
      return this.getMockData();
    }
    return this.http.get<Institution[]>(
      `/api/institution?searchTerm=${searchTerm}&zipcode=${zipCode}&radius=${radius}`
    );
  }

  // public getByZipCode(zipCode): Observable<Institution[]> {
  //   return this.http.get<Institution[]>(`/api/institution?zipcode=${zipCode}`);
  // }

  // public getByZipCodeAndRadius(
  //   zipCode: number,
  //   radius: number
  // ): Observable<Institution[]> {
  //   return this.http.get<Institution[]>(
  //     `/api/institution?zipcode=${zipCode}&radius=${radius}`
  //   );
  // }

  public create(institution: Institution) {
    return this.http.post<Institution[]>('/api/volunteer', institution);
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
          email: 'string'
        },
        description: 'Wir benötigen Helfer.',
        title: 'EInstitutionInstitutionInstitution',
        created: '2020-03-21T15:36:50.756Z',
        qualification: 'Institution'
      }
    ]).pipe(delay(1000));
  }
}
