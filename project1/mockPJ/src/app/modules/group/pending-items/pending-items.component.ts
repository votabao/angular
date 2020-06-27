import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MemberService } from '../../../core/services/member.service';
import { CommonService } from '../../../core/services/common.service';
import { CONFIG } from '../../../shared/config';
import { ModalService } from 'src/app/core/services/modal.service';
import { UserService } from 'src/app/core/services/user.service';
import { ModalViewAllComponent } from '../modal-view-all/modal-view-all.component';
import { ModalPendingContentComponent } from '../modal-pending-content/modal-pending-content.component';
import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html',
  styleUrls: ['./pending-items.component.styl']
})
export class PendingItemsComponent implements OnInit {
  memberRole;
  dateFormat = CONFIG.dateFormat;
  pendingUsers;
  pendingContents;
  groupId;
  coverUrl;

  constructor(
    private memberService: MemberService,
    private service: CommonService,
    private router: Router,
    private modalService: ModalService,
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
    this.memberService.refreshData.subscribe(() => {
      this.getPendingItems();
    });
    this.getCover();
    this.getPendingItems();
    this.memberService.getRole(this.groupId).subscribe(memberRole => {
      this.memberRole = memberRole;
    });
  }

  getPendingItems() {
    this.memberService.getPendingUsers(this.groupId).subscribe((pendingItems: any) => {
      this.pendingUsers = pendingItems.pendingMembers;
      this.pendingContents = pendingItems.pendingContents;
      this.pendingContents.forEach(eachContent => {
        if (eachContent.content.length > 300) {
          const shortedContent = eachContent.content.substring(0, 300) + '...';
          eachContent.content = shortedContent;
        }
      })
    });
  }

  declineUser(memberId, member) {
    this.memberService.declineUser(memberId, this.groupId, `Declined ${member.user.fullName}`, 'Success!');
  }

  approveUser(memberId, member) {
    this.memberService.approveUser(memberId, this.groupId).subscribe(() => {
      this.service.showSuccessNotify(`Approved ${member.email[0]} success !`, `Success!`);
    });
  }

  declineContent(contentId, content) {
    this.memberService.declineContent(contentId, this.groupId, `Declined ${content.title}`, 'Success!');
  }

  approveContent(contentId, content) {
    this.memberService.approveContent(contentId, this.groupId).subscribe(() => {
      this.service.showSuccessNotify(`Approved ${content.title}`, 'Success!');
    });
  }

  getCover() {
    this.memberService.getCover(this.groupId).subscribe(coverUrl => this.coverUrl = coverUrl)
  }

  openView(contentId) {
    this.contentService.getContentById(contentId).subscribe(content => {
      this.modalService.openContent(ModalPendingContentComponent as Component, content);
    })
  }
}
