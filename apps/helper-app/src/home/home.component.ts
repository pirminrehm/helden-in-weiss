import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wir-vs-virus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public router: Router) { }
}
