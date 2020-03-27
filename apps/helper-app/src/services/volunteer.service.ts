import { Injectable } from '@angular/core';
import { PostVolunteer } from '@wir-vs-virus/api-interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) {}
  public getAll(
    searchTerm: string,
    zipCode: string,
    radius: number
  ): Observable<PostVolunteer[]> {
    return this.http.get<PostVolunteer[]>(
      `/api/volunteer?searchTerm=${searchTerm}&zipcode=${zipCode}&radius=${radius}`
    );
  }

  public create(volunteer: PostVolunteer) {
    return this.http.post<PostVolunteer[]>('/api/volunteer', volunteer);
  }
}
