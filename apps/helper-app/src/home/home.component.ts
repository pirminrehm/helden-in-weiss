import { Component, OnInit } from '@angular/core';
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
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() { }

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
