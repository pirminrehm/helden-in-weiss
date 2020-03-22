import { Component, OnInit, Input } from '@angular/core';
import { Volunteer } from '@wir-vs-virus/api-interfaces';

@Component({
  selector: 'wir-vs-virus-volunteer-card',
  templateUrl: './volunteer-card.component.html',
  styleUrls: ['./volunteer-card.component.scss']
})
export class VolunteerCardComponent implements OnInit {
  constructor() {}

  @Input()
  data: any; // toto type volunteer

  ngOnInit(): void {}
}
