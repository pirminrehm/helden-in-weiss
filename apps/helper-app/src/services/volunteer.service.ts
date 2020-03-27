import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetVolunteer, PostVolunteer } from '@wir-vs-virus/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) {}
  public getAll(
    searchTerm: string,
    zipCode: string,
    radius: number
  ): Observable<GetVolunteer[]> {
    return this.http.get<GetVolunteer[]>(
      `/api/volunteer?searchTerm=${searchTerm}&zipcode=${zipCode}&radius=${radius}`
    );
  }

  public create(volunteer: PostVolunteer) {
    return this.http.post<PostVolunteer[]>('/api/volunteer', volunteer);
  }
}
