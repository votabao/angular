import { Component, OnInit } from '@angular/core';

import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-member-calendar',
  templateUrl: './member-calendar.component.html',
  styleUrls: ['./member-calendar.component.styl']
})
export class MemberCalendarComponent implements OnInit {

  constructor(
    private service: CommonService
  ) {
    this.service.disablePastDay();
  }

  ngOnInit() {
  }

}
