import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Helper } from '@wir-vs-virus/api-interfaces';

@Component({
  selector: 'wir-vs-virus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<[Helper]>('/api/helpers');
  constructor(private http: HttpClient) {}

  postHelper() {
    console.log('helper1')
    this.http.post<Helper>('/api/helper', JSON.stringify({
        name: 'TestHelper_' + Math.round(Math.random()*100),
        email: 'noMail' + console.log('helper2'),
        plz: 111111
      })
    ).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }
}
