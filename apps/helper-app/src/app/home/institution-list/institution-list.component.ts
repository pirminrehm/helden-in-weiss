import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { customErrorCodes, GetInstitution } from '@wir-vs-virus/api-interfaces';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { InstitutionService } from '../../services/institution.service';

@Component({
  selector: 'wir-vs-virus-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent implements OnInit, OnDestroy {
  institutions: GetInstitution[];
  loading = true;
  destroyed$ = new Subject();
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private institutionsService: InstitutionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        tap(params => {
          this.getInstitutions(
            params.searchTerm,
            params.searchPLZ,
            params.radius
          );
        })
      )
      .subscribe();
  }

  getInstitutions(searchTerm = '', searchPLZ = '', searchRadius = 10) {
    this.loading = true;
    this.errorMessage = '';
    this.institutionsService
      .getAll(searchTerm, searchPLZ, searchRadius)
      .pipe(
        takeUntil(this.destroyed$),
        tap(res => console.log(res)),
        map(res => res.sort(this.sortByNewestDate)),
        tap(() => (this.loading = false))
      )
      .subscribe({
        next: data => (this.institutions = data),
        error: err => {
          if (err.error.message === customErrorCodes.ZIP_NOT_FOUND) {
            this.errorMessage = 'Unbekannte PLZ';
            this.institutions = [];
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
