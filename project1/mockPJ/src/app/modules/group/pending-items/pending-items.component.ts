import { Component, OnInit } from '@angular/core';

import { MemberService } from '../../../core/services/member.service';

import { Member } from '../../../core/models/member';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html',
  styleUrls: ['./pending-items.component.styl']
})
export class PendingItemsComponent implements OnInit {
  pendingMembers: Member[];

  constructor(
    private memberService: MemberService,
    private service: CommonService
  ) { }

  ngOnInit() {
    this.memberService.refreshData.subscribe(() => {
      this.getPendingUsers();
    });
    this.getPendingUsers();
  }

  getPendingUsers() {
    this.memberService.getPendingUsers().subscribe((pendingUsers: Member[]) => this.pendingMembers = pendingUsers);
  }

  decline(memberId, member) {
    this.memberService.decline(memberId, member, `Declined ${member.email}`, 'Success!');
  }

  approve(memberId, member) {
    this.memberService.approve(member).subscribe(() => {
      this.decline(memberId, member);
      this.service.showSuccessNotify(`Approved ${member.email[0]} success !`, `Success`);
    });
  }

}
