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
      question: 'Ich habe keine medizinische Ausbildung, kann ich trotzdem helfen?',
      answer:
        'Wir konzentrieren uns auf die Vermittlung von geschultem Personal an Krankenhäuser. Um die ohnehin schon stark beanspruchten Abläufe dort nicht noch mehr zu belasten, müssen wir leider Wert darauf legen, dass Sie eine Ausbildung oder ein Studium in einem relevanten Bereich vorweisen können. '
    },
    {
      question: 'Was passiert, nachdem ich mein Angebot/meine Anfrage eingestellt habe? ',
      answer:
        'Wir schicken Ihnen zunächst eine E-Mail mit einer Bestätigung und einem Link, um Ihr Angebot zu löschen. Bitte bewahren Sie diese E-Mail auf. Ihr Eintrag läuft nach 30 Tagen automatisch ab. In dieser Zeit können andere ihn finden und Ihnen schreiben – geben dazu bitte Kontaktdaten an, über die Sie auch gut erreichbar sind. Krankenhäuser werden einen Nachweis Ihrer Kenntnisse brauchen. Das und alles weitere wird das Krankenhaus mit Ihnen klären, sobald Sie in Kontakt sind.'
    },
    {
      question: 'Wie kann ich mein Angebot wieder löschen?',
      answer:
        'Nach 30 Tagen löscht sich Dein Angebot selbst. Ein paar Tage vorher werden wir Sie warnen, damit Sie es bei Bedarf verlängern können. Ansonsten haben Sie hoffentlich die Bestätigungs-E-Mail aufbewahrt, die wir Ihnen geschickt haben, nachdem Sie Ihren Eintrag erstellt haben. Darin befindet sich nämlich ein Link, über den Sie Ihren Eintrag löschen können. Nachdem Ihr Eintrag gelöscht ist, löschen wir auch automatisch alle persönlichen Daten von Ihnen im Sinne der DSGVO.'
    },
    {
      question: 'Kann ich sicher sein, dass ein Helfer die angegebene Qualifikation auch hat?',
      answer:
        'Bitte prüfen Sie alle Formalien selbst, die Sie von einem Bewerber wissen müssen. Wir arbeiten an einer Verbesserung dieses Teils des Prozesses.'
    },
    {
      question: 'Wie ist der rechtliche Status eines Helfers im Krankenhaus?',
      answer:
        'Im Normalfall werden Helfer ganz regulär angestellt. Details können je nach Krankenhaus unterschiedlich sein.'
    },
    {
      question: 'What about foreign medics living in Germany?',
      answer:
        'As long as you have your (temporal) approbation, you can apply freely. This is a mandatory legal requirement.'
    },
    {
      question: 'Kann ich als Student helfen?',
      answer:
        'Aber klar! Je nach Ausbildungsstand hast Du schon bestimmte Dinge gelernt, mit denen Du das Personal im Krankenhaus entlasten kannst.'
    },
    {
      question: 'Ich habe eine medizinische Ausbildung, aber arbeite nicht mehr in dem Beruf. Kann ich trotzdem helfen?',
      answer:
        'Prinzipiell ja – es hängt natürlich von der Tiefe der Erfahrung ab und davon, wie lange sie zurück liegt. Beschreiben Sie den Umstand auf jeden Fall in Ihrem Eintrag, so dass ein interessiertes Krankenhaus direkt abwägen kann.'
    }
  ];

  ngOnInit(): void {}
}
