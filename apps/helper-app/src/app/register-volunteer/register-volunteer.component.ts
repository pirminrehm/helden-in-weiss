import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Volunteer, customErrorCodes } from '@wir-vs-virus/api-interfaces';
import { VolunteerService } from '../../services/volunteer.service';

import { zipCodeRegExp, phoneRegExp } from '../common/utils';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent
} from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'wir-vs-virus-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.scss']
})
export class RegisterVolunteerComponent implements OnInit {
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
    qualifications: new FormControl('')
  });

  @ViewChild('qaulificationInput') qualificationInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredQualifications: Observable<string[]>;
  qualifications: string[] = [];
  allQualifications: string[] = this.getQulifications();

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
        map((qauli: string | null) =>
          qauli ? this._filter(qauli) : this.allQualifications.slice()
        )
      );

    // this.volunteerForm.setValue({
    //   name: 'test name',
    //   zipCode: 70569,
    //   knowledge: 'asdfsfadsdfdsaf',
    //   phone: 3231231213,
    //   mail: 'mail@mail',
    //   qualifications: ['Quali1', 'Qali2']
    // });
  }

  onSubmit() {
    // if () {
    //   this.volunteerForm.get('qualifications').setErrors({ required: true });
    // } else {
    //   this.volunteerForm.get('qualifications').();
    // }
    if (!this.volunteerForm.valid || this.qualifications.length === 0) {
      return;
    }

    const val = this.volunteerForm.value;
    console.log(val);

    const volunteer: Volunteer = {
      age: -1,
      city: '',
      description: val.knowledge,
      email: val.mail,
      firstname: '--',
      qualification: this.qualifications,
      name: val.name,
      phone: val.phone,
      title: '--',
      zipcode: val.zipCode,
      active: true,
      registeredAt: new Date().toISOString()
    };

    this.volunteerService.create(volunteer).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/home/volunteers']);
      },
      err => {
        console.error(err);
        if (err.error.message === customErrorCodes.ZIP_NOT_FOUND) {
          // this.institutionForm.get('zipCode').setErrors({ incorrect: true });
          this.volunteerForm.get('zipCode').setErrors({
            notExists: true
          });
        } else {
          alert('etwas ist scheif gelaufen');
        }
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our qaulification
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

  remove(qauli: string): void {
    const index = this.qualifications.indexOf(qauli);

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
        qauli => qauli.toLowerCase().indexOf(filterValue) === 0
      );
    }
    return this.allQualifications;
  }

  getQulifications() {
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
