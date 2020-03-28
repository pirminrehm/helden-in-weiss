import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostContactMessage } from '@wir-vs-virus/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  constructor(private http: HttpClient) {}

  send(type: string, privateUuid: string): Observable<any> {
    const url = `/api/email-validation`;
    return this.http.post<PostContactMessage>(url, {
      type,
      privateUuid
    });
  }
}
