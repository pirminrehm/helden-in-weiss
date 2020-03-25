import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Institution } from '@wir-vs-virus/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  constructor(private http: HttpClient) {}

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
