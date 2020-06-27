import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-group',
  templateUrl: './info-group.component.html',
  styleUrls: ['./info-group.component.styl']
})
export class InfoGroupComponent implements OnInit {
  @Input() group;

  constructor() { }

  ngOnInit() {
  }

}
