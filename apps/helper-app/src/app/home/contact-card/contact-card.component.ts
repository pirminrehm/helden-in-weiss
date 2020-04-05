import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'wir-vs-virus-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  expandedCard = false;
  successfullySendMessage = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input()
  data: any;

  ngOnInit(): void {}

  /**
   * Set the qualification name as search term in the filter.
   * @param qualification Name of the qualification
   */
  searchQualification(qualification: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchTerm: qualification },
      queryParamsHandling: 'merge'
    });
  }
}
