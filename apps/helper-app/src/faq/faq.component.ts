import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wir-vs-virus-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  constructor() {}

  public faqs = [
    {
      question: 'Was ist die Frage?',
      answer:
        'Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort?Ist das die Antwort? Ist das die Antwort?'
    },
    {
      question: 'Was ist die Frage?',
      answer:
        'Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort?Ist das die Antwort? Ist das die Antwort?'
    },
    {
      question: 'Was ist die Frage?',
      answer:
        'Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort?Ist das die Antwort? Ist das die Antwort?'
    },
    {
      question: 'Was ist die Frage?',
      answer:
        'Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort?Ist das die Antwort? Ist das die Antwort?'
    },
    {
      question: 'Was ist die Frage?',
      answer:
        'Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort? Ist das die Antwort?Ist das die Antwort? Ist das die Antwort?'
    }
  ];

  ngOnInit(): void {}
}
