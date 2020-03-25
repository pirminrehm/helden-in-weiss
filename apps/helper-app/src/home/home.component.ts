import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'wir-vs-virus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm = new FormGroup({
    term: new FormControl(this.route.snapshot.queryParams.searchTerm || ''),
    plz: new FormControl(this.route.snapshot.queryParams.searchPLZ || ''),
    radius: new FormControl(this.route.snapshot.queryParams.radius || '50')
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.router.events.subscribe(val => {
      this.searchForm
        .get('term')
        .setValue(this.route.snapshot.queryParams.searchTerm);

      this.searchForm
        .get('plz')
        .setValue(this.route.snapshot.queryParams.searchPLZ);

      this.searchForm
        .get('radius')
        .setValue(this.route.snapshot.queryParams.radius || '50');
    });
  }

  //todo on destroy

  onChangeSearch() {
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
}

@Component({
  selector: 'wir-vs-virus-qualifications-dialog',
  template: `
    <h1 mat-dialog-title>Welche Fähigkeiten werden benötigt?</h1>
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
      <button mat-button class="dialog-close-button" (click)="onClose()">Schließen</button>
    </div>
  `,
  styleUrls: ['home.component.scss'],
})
export class QualificationsDialogComponent {
  constructor(public dialogRef: MatDialogRef<QualificationsDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
