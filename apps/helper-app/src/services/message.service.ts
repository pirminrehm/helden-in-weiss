import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMessage } from '@wir-vs-virus/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  send(contactMessage: ContactMessage, isVolunteer: boolean): Observable<any> {
    const url = `/api/contact/${isVolunteer ? 'volunteer' : 'institution'}`;
    return this.http.post<ContactMessage>(url, contactMessage);
  }
}
