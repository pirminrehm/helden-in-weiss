import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, tap, flatMap } from 'rxjs/operators';
import { ValidateService } from '../services/validate.service';
import { customErrorCodes } from '@wir-vs-virus/api-interfaces';

@Component({
  selector: 'wir-vs-virus-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit, OnDestroy {
  success = false;
  errorMessage = '';
  destroyed$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private validateService: ValidateService
  ) {}

  ngOnInit() {
    const unknownError =
      'Etwas ist schief gelaufen, versuchen Sie es später noch einmal';
    this.route.queryParams
      .pipe(
        takeUntil(this.destroyed$),
        flatMap(params => {
          if (!params.type || !params.uuid) {
            this.errorMessage = 'Link ist ungültig.';
          } else {
            return this.validateService.send(params.type, params.uuid);
          }
        })
      )
      .subscribe(
        res => {
          if (res.success) {
            this.success = true;
          } else {
            this.errorMessage = unknownError;
          }
        },
        err => {
          if (err.error.message === customErrorCodes.USER_NOT_FOUND) {
            this.errorMessage =
              'Dieser Account existiert nicht. Bitte registrieren Sie sich erneut.';
          } else {
            this.errorMessage = unknownError;
          }
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
