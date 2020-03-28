import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wir-vs-virus-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() type: InfoBoxType;

  constructor() {}

  ngOnInit(): void {}
}

enum InfoBoxType {
  success = 'success',
  warn = 'warn',
}
