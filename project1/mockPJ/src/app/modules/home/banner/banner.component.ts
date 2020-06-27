import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.styl']
})

export class BannerComponent implements OnInit {
  ngStyle = null;
  @Input('title') title: string;
  @Input('url') url: string;

  constructor() { }

  ngOnInit() {
  this.ngStyle = {'background-image': 'linear-gradient(45deg, rgba(75, 117, 160, 0.6) 55%, rgba(45,95,93,0.7)),' + 'url(' + this.url + ')'};
  }

}
