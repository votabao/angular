import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Member } from '../../../../core/models/member';
import { CONFIG } from '../../../../shared/config';

import { MemberService } from '../../../../core/services/member.service';
import { Subscription } from 'rxjs';
import { Group } from '../../../../core/models/group';
import { GroupService } from '../../../../core/services/group.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.styl']
})
export class MemberListComponent implements OnInit, OnDestroy {
  memberRole;
  dateFormat = CONFIG.dateFormat;
  subscription: Subscription;
  members: Member[];
  @Input() groupID;

  constructor(
    private memberService: MemberService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.subscription = this.memberService.refreshData.subscribe(() => {
      this.getMembers();
    });
    this.getMembers();
    this.getRole();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getMembers() {
    this.memberService.getMembers(this.groupID, this).subscribe((members: Member[]) => {
      const captain = this.getCaptain(members);
      const mentor = this.getMentor(members);
      this.sortByName(members);
      this.members = captain.concat(mentor).concat(members);
    });
  }

  deleteMember(memberID, member) {
    this.memberService.removeMember(memberID, this.groupID, `Deleted`, 'Success!');
  }

  sortByName(arr) {
    arr.sort(function (a, b) {
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
      if (item.caption) {
        captain = arr.splice(index, 1);
      }
    });
    return captain;
  }

  getMentor(arr) {
    let mentor = [];
    arr.forEach((item, index) => {
      if (item.mentor) {
        mentor = arr.splice(index, 1);
      }
    });
    return mentor;
  }

  removeMentor(memberID) {
    this.memberService.removeMentor(memberID, this.groupID);
  }

  setCaptain(memberID) {
    this.memberService.setCaptain(memberID, this.groupID);
  }

  setMentor(memberID) {
    this.memberService.setMentor(memberID, this.groupID);
  }

  getRole() {
    this.memberService.getRole(this.groupID).subscribe(memberRole => {
      this.memberRole = memberRole;
    });
  }

}
