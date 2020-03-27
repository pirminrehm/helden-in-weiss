import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetInstitution, PostInstitution } from '@wir-vs-virus/api-interfaces';
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
  ): Observable<GetInstitution[]> {
    return this.http.get<GetInstitution[]>(
      `/api/institution?searchTerm=${searchTerm}&zipcode=${zipCode}&radius=${radius}`
    );
  }

  public create(institution: PostInstitution) {
    return this.http.post<PostInstitution[]>('/api/institution', institution);
  }
}
