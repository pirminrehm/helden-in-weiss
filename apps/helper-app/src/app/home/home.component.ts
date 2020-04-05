import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
  takeWhile,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'wir-vs-virus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm = new FormGroup({
    term: new FormControl(this.route.snapshot.queryParams.searchTerm || ''),
    plz: new FormControl(this.route.snapshot.queryParams.searchPLZ || ''),
    radius: new FormControl({
      value: this.route.snapshot.queryParams.radius || '50',
      disabled: !this.route.snapshot.queryParams.radius
    })
  });

  destroyed = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed))
      .subscribe(queryParams => {
        this.searchForm.get('term').setValue(queryParams.searchTerm);
        this.searchForm.get('plz').setValue(queryParams.searchPLZ);
        this.searchForm.get('radius').setValue(queryParams.radius || '50');
      });

    // trigger search if one of the form values has changed
    merge(
      this.searchForm.get('term').valueChanges,
      this.searchForm.get('plz').valueChanges
    )
      .pipe(
        takeUntil(this.destroyed),
        distinctUntilChanged(),
        debounceTime(500),
        tap(() => {
          // disable radius form control if plz form control is empty
          if (!this.searchForm.get('plz').value) {
            this.searchForm.get('radius').disable();
          } else {
            this.searchForm.get('radius').enable();
          }
        })
      )
      .subscribe(() => {
        this.startSearch();
      });
  }

  startSearch() {
    const queryParams: Params = {};

    queryParams.searchTerm = this.searchForm.value.term;
    queryParams.searchPLZ = this.searchForm.value.plz;
    queryParams.radius = this.searchForm.value.radius;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  openQualificationsDialog() {
    this.dialog.open(QualificationsDialogComponent, {
      panelClass: 'qualifications-dialog'
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

@Component({
  selector: 'wir-vs-virus-qualifications-dialog',
  template: `
    <h1 tabindex="0" mat-dialog-title>Welche Fähigkeiten werden benötigt?</h1>
    <div mat-dialog-content>
      <p>
        HELDEN IN WEISS konzentriert sich auf die Vermittlung von medizinisch
        qualifizierten Personal an Krankenhäuser. Daher erfassen wir ganz
        konkret, welche Fähigkeiten und Kenntnisse sie in verschiedenen Gebieten
        vorweisen können. Wenn eine Einrichtung mit ihnen in Kontakt tritt,
        können sie die Nachweise über den Erwerb der Fähigkeiten bringen.
      </p>
      <p>
        Als medizinisch qualifizierende Ausbildung gilt eine abgeschlossene
        Ausbildung in einem Gesundheitsfachberuf oder ein Medizinstudium (nach
        Famulatur).
      </p>
    </div>
    <div mat-dialog-actions>
      <button mat-button class="dialog-close-button" (click)="onClose()">
        Schließen
      </button>
    </div>
  `,
  styleUrls: ['home.component.scss']
})
export class QualificationsDialogComponent {
  constructor(public dialogRef: MatDialogRef<QualificationsDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
