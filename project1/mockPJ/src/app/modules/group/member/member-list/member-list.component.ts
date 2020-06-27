import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Member } from '../../../../core/models/member';

import { MemberService } from '../../../../core/services/member.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.styl']
})
export class MemberListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  members: Member[];
  @Input() groupID;

  constructor(
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.subscription = this.memberService.refreshData.subscribe(() => {
      this.getMembers();
    });
    this.getMembers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMembers() {
    this.memberService.getMembers().subscribe((members: Member[]) => {
      const captain = this.getCaptain(members);
      this.sortByName(members);
      this.members = captain.concat(members);
    });
  }

  deleteMember(memberID, member) {
    this.memberService.removeMember(memberID, `Deleted ${member.name}`, 'Success!');
  }

  sortByName(arr) {
    arr.sort(function(a, b) {
      const nameA = a.name;
      const nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    }

  getCaptain(arr) {
    let captain = [];
    arr.forEach((item, index) => {
      if (item.isCaptain) {
       captain = arr.splice(index, 1);
      }
    });
    return captain;
  }
}
