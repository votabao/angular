import { Component, Input, OnInit } from '@angular/core';

import { GroupService } from '../../../../core/services/group.service';

import { Group } from '../../../../core/models/group';
import { CONFIG } from '../../../../shared/config';
import { MemberService } from '../../../../core/services/member.service';

@Component({
  selector: 'app-info-group',
  templateUrl: './info-group.component.html',
  styleUrls: ['./info-group.component.styl']
})
export class InfoGroupComponent implements OnInit {
  @Input() groupId;
  group: Group;
  dateFormat = CONFIG.dateFormat;

  constructor(
    private groupService: GroupService,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.memberService.refreshData.subscribe(() => {
      this.getGroup();
    });
    this.getGroup();
  }

  getGroup() {
    this.groupService.getGroup(this.groupId).subscribe((group: Group) => {
      this.group = group;
    });
  }

}
