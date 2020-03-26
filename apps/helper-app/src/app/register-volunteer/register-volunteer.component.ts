import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { customErrorCodes, Volunteer } from '@wir-vs-virus/api-interfaces';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { first, map, startWith } from 'rxjs/operators';
import { VolunteerService } from '../../services/volunteer.service';
import { phoneRegExp, zipCodeRegExp } from '../common/utils';

@Component({
  selector: 'wir-vs-virus-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.scss']
})
export class RegisterVolunteerComponent implements OnInit {
  showPrivacyError = false;
  volunteerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(70)]),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.pattern(zipCodeRegExp)
    ]),
    knowledge: new FormControl('', [
      Validators.required,
      Validators.maxLength(300)
    ]),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(phoneRegExp)
    ]),
    mail: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(70)
    ]),
    qualifications: new FormControl(''),
    agreePrivacy: new FormControl(false, Validators.requiredTrue),
    recaptcha: new FormControl(null, [Validators.required])
  });

  @ViewChild(RecaptchaComponent)
  captchaRef: RecaptchaComponent;

  @ViewChild('qualificationInput') qualificationInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredQualifications: Observable<string[]>;
  qualifications: string[] = [];
  allQualifications: string[] = this.getQualifications();
  sendingRequest = false;
  errorMessages: { target; value; property; children; constraints }[] = [];

  constructor(
    private router: Router,
    private volunteerService: VolunteerService
  ) {}

  ngOnInit(): void {
    this.filteredQualifications = this.volunteerForm
      .get('qualifications')
      .valueChanges.pipe(
        // tslint:disable-next-line: deprecation
        startWith(null),
        map((qualification: string | null) =>
          qualification
            ? this._filter(qualification)
            : this.allQualifications.slice()
        )
      );
  }

  onSubmit() {
    this.volunteerForm.get('recaptcha').markAllAsTouched();
    this.showPrivacyError = !!this.volunteerForm.get('agreePrivacy').errors;
    if (!this.volunteerForm.valid || this.qualifications.length === 0) {
      return;
    }

    const val = this.volunteerForm.value;

    const volunteer: Volunteer = {
      city: '',
      description: val.knowledge,
      email: val.mail,
      qualification: this.qualifications,
      name: val.name,
      phone: val.phone,
      zipcode: Number(val.zipCode),
      active: true,
      registeredAt: new Date().toISOString(),
      recaptcha: val.recaptcha,
      privacyAccepted: val.agreePrivacy
    };
    console.log(volunteer);

    this.sendingRequest = true;
    this.volunteerService
      .create(volunteer)
      .pipe(first())
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/register-volunteer/success']);
        },
        err => {
          this.sendingRequest = false;
          console.error(err.error.message);
          this.errorMessages = err.error.message;
          this.captchaRef.reset();

          switch (err.error.message) {
            case customErrorCodes.ZIP_NOT_FOUND:
              this.volunteerForm.get('zipCode').setErrors({
                notExists: true
              });
              break;

            case customErrorCodes.CAPTCHA_NOT_FOUND:
              break;

            default:
              break;
          }
        }
      );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our qualification
    if ((value || '').trim()) {
      this.qualifications.push(value.trim());
      // this.volunteerForm.get('qualifications').setValue(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.volunteerForm.get('qualifications').setValue(null);
  }

  remove(qualification: string): void {
    const index = this.qualifications.indexOf(qualification);

    if (index >= 0) {
      this.qualifications.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.qualifications.push(event.option.viewValue);
    this.qualificationInput.nativeElement.value = '';
    this.volunteerForm.get('qualifications').setValue(null);
  }

  private _filter(value: string): string[] {
    console.log(value);
    if (value) {
      let filterValue = '';
      filterValue = value.toLowerCase();

      return this.allQualifications.filter(
        qualification => qualification.toLowerCase().indexOf(filterValue) === 0
      );
    }
    return this.allQualifications;
  }

  getQualifications() {
    return [
      'Akupunktur',
      'Allergologie',
      'Allgemeine Chirurgie',
      'Allgemeinmedizin',
      'Altenpflegehelfer/in ',
      'Altenpfleger/in ',
      'Anästhesiologie',
      'Anatomie',
      'Andrologie',
      'Apotheker/in ',
      'Arbeitsmedizin',
      'Arzthelfer in Ausbildung ',
      'Ärztliches Qualitätsmanagement',
      'Augenheilkunde',
      'Balneologie und Medizinische Klimatologie',
      'Betriebsmedizin',
      'Biochemie',
      'Dermatopathologie',
      'Diabetologie',
      'Ergotherapeut/in ',
      'Ernährungsmedizin',
      'Flugmedizin',
      'Forensische Psychiatrie',
      'Gefäßchirurgie',
      'Geriatrie',
      'Gesundheits- und Kinderkrankenpfleger/in',
      'Gesundheits- und Krankenpflegehelfer/in',
      'Gesundheits- und Krankenpfleger/in',
      'Gynäkologie und Geburtshilfe',
      'Gynäkologische Endokrinologie und Reproduktionsmedizin',
      'Gynäkologische Exfoliativ-Zytologie',
      'Gynäkologische Onkologie',
      'Hals-Nasen-Ohrenheilkunde',
      'Hämostaseologie',
      'Handchirurgie',
      'Haut- und Geschlechtskrankheiten',
      'Hebamme/Entbindungspfleger ',
      'Heilpraktiker/in ',
      'Herzchirurgie',
      'Homöopathie',
      'Humangenetik',
      'Hygiene und Umweltmedizin',
      'Immunologie',
      'Infektiologie',
      'Infektionsepidemiologie',
      'Innere Medizin',
      'Innere Medizin und Angiologie',
      'Innere Medizin und Endokrinologie und Diabetologie',
      'Innere Medizin und Gastroenterologie',
      'Innere Medizin und Hämatologie und Onkologie',
      'Innere Medizin und Kardiologie',
      'Innere Medizin und Nephrologie',
      'Innere Medizin und Pneumologie',
      'Innere Medizin und Rheumatologie',
      'Intensivmedizin',
      'Kardiale Magnetresonanztomographie',
      'Kinder- und Jugend-Endokrinologie und -Diabetologie',
      'Kinder- und Jugend-Nephrologie',
      'Kinder- und Jugend-Orthopädie',
      'Kinder- und Jugend-Pneumologie',
      'Kinder- und Jugend-Rheumatologie',
      'Kinder- und Jugendmedizin',
      'Kinder- und Jugendpsychiatrie und -psychotherapie',
      'Kinder-Hämatologie und -Onkologie',
      'Kinder-Kardiologie',
      'Kinderchirurgie',
      'Kinderradiologie',
      'Klinische Akut- und Notfallmedizin',
      'Klinische Pharmakologie',
      'Krankenhaushygiene',
      'Laboratoriumsmedizin',
      'Logopäde/in ',
      'Magnetresonanztomographie fachgebunden',
      'Manuelle Medizin (Chirotherapie)',
      'Masseur/in ',
      'Medikamentöse Tumortherapie',
      'Medizin-Ingenieur ',
      'Medizinisch-technische Assistentin (MTA) ',
      'Medizinisch-technische Laboratoriumsassistentin (MTLA) ',
      'Medizinisch-technische Radiologieassistentin (MTRA) ',
      'Medizinische Fachangestellte',
      'Medizinische Informatik',
      'Medizinstudent/in ',
      'Medizintechnicker in Ausbildung ',
      'Medizintechniker/in ',
      'Mikrobiologie',
      'Mund-Kiefer-Gesichtschirurgie',
      'Naturheilverfahren',
      'Neonatologie',
      'Neurochirurgie',
      'Neurologie',
      'Neuropädiatrie',
      'Neuropathologie',
      'Neuroradiologie',
      'Notarzt ',
      'Notfallmedizin',
      'Notfallsanitäter',
      'Nuklearmedizin',
      'Nuklearmedizinische Diagnostik für Radiologen',
      'Öffentliches Gesundheitswesen',
      'Operationstechnischer Assistent/in',
      'Orthopädie und Unfallchirurgie',
      'Orthopädische Rheumatologie',
      'Pädiatrische Gastroenterologie',
      'Palliativmedizin',
      'Pathologie',
      'Pfleger in Ausbildung ',
      'Pharmakant ',
      'Pharmakologie',
      'Pharmakologie und Toxikologie',
      'Pharmazeuten in Ausbildung ',
      'Pharmazeutisch-kaufmännischer Angestellte/r (PKA)',
      'Pharmazeutisch-technischer Assistent/in (PTA) ',
      'Phlebologie',
      'Phoniatrie und Pädaudiologie',
      'Physikalische Therapie',
      'Physikalische und Rehabilitative Medizin',
      'Physiologie',
      'Plastische und Ästhetische Operationen',
      'Plastische, Rekonstruktive und Ästhetische Chirurgie',
      'Proktologie',
      'Psychiatrie und Psychotherapie',
      'Psychoanalyse',
      'Psychologen in Ausbildung ',
      'Psychosomatische Medizin und Psychotherapie',
      'Psychotherapie fachgebunden',
      'Radiologie',
      'Rechtsmedizin',
      'Rehabilitationswesen',
      'Rettungsassistent/in ',
      'Rettungsdienst in Ausbildung ',
      'Rettungshelfer ',
      'Rettungssanitäter/in ',
      'Röntgendiagnostik für Nuklearmediziner',
      'Schlafmedizin',
      'Sexualmedizin',
      'Sozialmedizin',
      'Spezielle Geburtshilfe und Perinatalmedizin',
      'Spezielle Kardiologie für EMAH',
      'Spezielle Kinder- und Jugendurologie',
      'Spezielle Orthopädische Chirurgie',
      'Spezielle Schmerztherapie',
      'Spezielle Unfallchirurgie',
      'Spezielle Viszeralchirurgie',
      'Sportmedizin',
      'Strahlentherapie',
      'Suchtmedizinische Grundversorgung',
      'Thoraxchirurgie',
      'Transfusionsmedizin',
      'Transplantationsmedizin',
      'Tropenmedizin',
      'Urologie',
      'Virologie',
      'Viszeralchirurgie'
    ];
  }
}
