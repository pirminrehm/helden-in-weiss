import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostContactMessage } from '@wir-vs-virus/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  send(
    contactMessage: PostContactMessage,
    isVolunteer: boolean
  ): Observable<any> {
    const url = `/api/contact/${isVolunteer ? 'volunteer' : 'institution'}`;
    return this.http.post<PostContactMessage>(url, contactMessage);
  }
}
