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
    return this.http.get<Institution[]>(
      `/api/institution?searchTerm=${searchTerm}&zipcode=${zipCode}&radius=${radius}`
    );
  }

  public create(institution: Institution) {
    return this.http.post<Institution[]>('/api/institution', institution);
  }
}
