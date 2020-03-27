import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'wir-vs-virus-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  expandedCard = false;
  constructor() {}

  @Input()
  data: any;

  ngOnInit(): void {}
}
