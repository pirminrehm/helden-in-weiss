import { Injectable } from '@angular/core';
import { Volunteer } from '@wir-vs-virus/api-interfaces';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private http: HttpClient) {}

  private useMockData = false;

  // todo Volunteer rückgabe wert
  public getAll(): Observable<Volunteer[]> {
    if (this.useMockData) {
      return this.getMockData();
    }
    return this.http.get<[Volunteer]>('/api/volunteer');
  }

  private getMockData() {
    return of([
      {
        name: 'Lang',
        firstname: 'Petra',
        email: 'petra.moll@aol.com',
        zipcode: 70569,
        city: 'Stuttgart',
        age: 27,
        phone: '01524685475',
        description:
          'Hallo, mein Name ist Petra und ich bin ausgebildete Krankenschwester. Ich würde gerne meine Arbeiten im Umkreis Stuttgart anbieten. Zeitlich bin ich aktuell uneingeschärnkt.',
        title:
          'Ehemalige Krankenschwester mit Sepzialausbildung im Bereich Physiotherapie',
        created: '2020-03-21T15:36:50.756Z',
        qualification: 'Krankenschwester'
      },
      {
        name: 'Kurz',
        firstname: 'Peter',
        email: 'p.kurz@aol.com',
        zipcode: 70569,
        city: 'Stuttgart',
        age: 27,
        phone: '-',
        description: 'Kann gerne helfen.',
        title: 'Ehemaliger Zivi Kankenwagenfahrer',
        created: '2020-03-21T15:36:50.756Z',
        qualification: 'Rettungshelfer'
      }
    ]).pipe(delay(1000));
  }
}
