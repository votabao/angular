import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Group } from '../../../core/models/group';
import { GroupService } from '../../../core/services/group.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.styl']
})
export class MemberComponent implements OnInit {
  group: Group;
  groupId;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.groupId = params.get('groupID');
    });

    this.groupService.getGroup(this.groupId).subscribe((group: Group) => {
      this.group = group;
    });
  }
}
