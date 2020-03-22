import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'wir-vs-virus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  searchForm = new FormGroup({
    term: new FormControl(''),
    plz: new FormControl(''),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  onChangeSearch() {
    const queryParams: Params = {};

    queryParams.searchTerm = this.searchForm.value.term;
    queryParams.searchPLZ = this.searchForm.value.plz;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
  }
}
