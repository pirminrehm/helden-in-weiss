import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from '@wir-vs-virus/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Institution[]> {
    return this.http.get<Institution[]>('/api/institution');
  }

  public create(institution: Institution) {
    return this.http.post<Institution[]>('/api/institution', institution);
  }
}
