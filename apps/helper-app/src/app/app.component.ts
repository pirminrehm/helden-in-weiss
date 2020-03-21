import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Helper } from '@wir-vs-virus/api-interfaces';

@Component({
  selector: 'wir-vs-virus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  helpers$ = this.http.get<[Helper]>('/api/helpers');
  constructor(private http: HttpClient) {}

  postHelper() {
    console.log('Send Post Request')
    this.http.post<Helper>('/api/helper', JSON.stringify({
        name: 'TestHelper_' + Math.round(Math.random()*100),
        email: 'noMail',
        plz: 111111
      })
    ).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
          location.reload();
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }
}
