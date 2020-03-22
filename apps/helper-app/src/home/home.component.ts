import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private router: Router, private route: ActivatedRoute) {}

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
        .setValue(this.route.snapshot.queryParams.radius);
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
}
