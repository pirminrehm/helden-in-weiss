import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetVolunteer, customErrorCodes } from '@wir-vs-virus/api-interfaces';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'wir-vs-virus-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss']
})
export class VolunteerListComponent implements OnInit, OnDestroy {
  volunteers$: Observable<GetVolunteer[]>;
  volunteers: GetVolunteer[];
  loading = true;
  destroyed$ = new Subject();
  errorMessage: string;

  constructor(
    private volunteerService: VolunteerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        tap(params => {
          this.getVolunteers(
            params.searchTerm,
            params.searchPLZ,
            params.radius
          );
        })
      )
      .subscribe();
  }

  getVolunteers(searchTerm = '', searchPLZ = '', searchRadius = 10) {
    this.loading = true;
    this.errorMessage = '';
    // this.volunteers$ =
    this.volunteerService
      .getAll(searchTerm, searchPLZ, searchRadius)
      .pipe(
        takeUntil(this.destroyed$),
        tap(res => console.log(res)),
        map(res => res.sort(this.sortByNewestDate)),
        tap(() => (this.loading = false))
      )
      .subscribe({
        next: data => (this.volunteers = data),
        error: err => {
          if (err.error.message === customErrorCodes.ZIP_NOT_FOUND) {
            this.errorMessage = 'Unbekannte PLZ';
            this.volunteers = [];
            this.loading = false;
          }
        }
      });
  }

  private sortByNewestDate(a, b) {
    return (
      new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime()
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
